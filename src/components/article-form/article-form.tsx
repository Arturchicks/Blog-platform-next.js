"use client"
import React, { JSX, useEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Button, Typography, useMediaQuery } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import Box from "@mui/material/Box"
import clsx from "clsx"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import ClearIcon from "@mui/icons-material/Clear"
import { CSSTransition } from "react-transition-group"
import { ColorButton } from "@/components/UI/color-button"
import FormField from "@/components/modules/form-field/form-field"
import { VisuallyHiddenInput } from "@/components/UI/visibility-hidden-input"
import { useCreateArticleMutation, useGetArticleQuery } from "@/store/api"
import { handleImg } from "@/utils/helpers/image-compress"
import { useParams, useRouter } from "next/navigation"
import { fileReset } from "@/utils/helpers/file-reset"
import TagList from "@/components/modules/added-tag-list/added-tag-list"
import { ArticleFormType } from "@/app/create-article/types"
import { schema } from "./utils/schema"
import { Params } from "next/dist/server/request/params"
import { BaseQueryFn, TypedMutationTrigger } from "@reduxjs/toolkit/query/react"
import { ArticleType } from "../modules/article/types"
import { MutationArticle } from "@/store/types"

const ArticleForm: React.FC<{
  type: string
  action: TypedMutationTrigger<ArticleType, MutationArticle, BaseQueryFn>
}> = ({ type, action }): JSX.Element => {
  const { slug } = useParams<Params>()
  const { data } = useGetArticleQuery(slug, {
    skip: type === "Create new",
  })
  const [image, setImage] = useState<string | undefined>()
  const [showImg, setShowImg] = useState<boolean>(false)
  const imgRef = useRef(null)
  const regex = /!\[img\]\((.*?)\)/
  const isMobile = useMediaQuery("(max-width: 480px)")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ArticleFormType>({ resolver: yupResolver(schema) })
  const { append, remove, fields } = useFieldArray({
    name: "tags",
    control,
    shouldUnregister: true,
  })

  const onSubmit = handleSubmit(async ({ tags, body, image = "", ...data }) => {
    const tagList = tags?.map(({ tag }) => tag)
    const article = { tagList, body: body.concat(image), ...data }
    const { error } = await action({ slug, article })
    if (!error) router.push("/")
  })

  useEffect(() => {
    if (data) {
      const { tagList, body, title, description } = data.article
      if (tagList) tagList.map((tag) => append({ tag }))
      if (body) {
        const url = body.match(regex)
        setValue("title", title)
        setValue("description", description)
        if (url) {
          setImage(String(url[1]))
          setValue("image", url[0])
          setShowImg(true)
          setValue("body", body.replace(String(url[0]), ""))
        } else setValue("body", body)
      }
    }
  }, [data])

  return (
    <Box
      className="xs:w-[80vw] sm:w-[60vw] rounded-lg p-[28px] animate-display relative mx-auto mt-6"
      sx={{
        bgcolor: "primary.main",
        boxShadow: "0px 0px 3px",
        color: "primary.200",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "text.primary",
          fontSize: "20px",
          fontFamily: "inherit",
          textAlign: "center",
        }}
      >
        {`${type} article`}
      </Typography>
      <form
        className="flex flex-col gap-5 relative"
        id="create-article-form"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-3">
              <FormField id="title" errors={errors.title} register={register} />
              <FormField
                id="description"
                errors={errors.description}
                register={register}
              />
              <FormField
                multiline={true}
                rows={isMobile ? 5 : 7}
                id="body"
                errors={errors.body}
                register={register}
              >
                <div className="flex items-center min-h-[56px]">
                  <Button
                    component="label"
                    role={undefined}
                    color="info"
                    variant="text"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{
                      "& .MuiButton-startIcon": {
                        margin: 0,
                      },
                      justifyContent: "center",
                    }}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onFocus={fileReset}
                      onChange={(e) =>
                        handleImg(e)
                          .then((url) => {
                            setValue("image", ` ![img](${url}) `)
                            setImage(url)
                          })
                          .then(() => setShowImg(true))
                      }
                    />
                  </Button>
                  <CSSTransition
                    nodeRef={imgRef}
                    in={showImg}
                    onExited={() => setImage(undefined)}
                    timeout={300}
                    classNames="display"
                    unmountOnExit
                  >
                    <Box className="relative" ref={imgRef}>
                      <img
                        src={image}
                        alt="img"
                        className="w-14 h-14 rounded-[3px] opacity-60 hover:opacity-40 transition-opacity duration-200"
                      />

                      <Button
                        className="w-4 h-4 top-1 right-1 hover:opacity-50 flex justify-center items-center"
                        variant="contained"
                        onClick={() => {
                          setShowImg(false)
                          setValue("image", "")
                        }}
                        startIcon={<ClearIcon className="text-gray-600" />}
                        sx={{
                          position: "absolute",
                          bgcolor: "white",
                          transitionProperty: "opacity",
                          transitionDuration: 300,
                          padding: 0,
                          minWidth: 0,
                          "& .MuiButton-startIcon": {
                            margin: 0,
                          },
                        }}
                      />
                    </Box>
                  </CSSTransition>
                </div>
              </FormField>

              <div className="w-[100%] relative">
                <TagList
                  remove={remove}
                  register={register}
                  errors={errors.tags}
                  fields={fields}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <ColorButton
          type="submit"
          className="w-[200px] xs:self-center sm:self-start"
        >
          Send
        </ColorButton>
        <Button
          variant="outlined"
          color="info"
          startIcon={<LocalOfferIcon />}
          sx={{
            position: "absolute",
            bottom: "15%",
            maxWidth: "95px",
            whiteSpace: "nowrap",
            textTransform: "capitalize",
            fontSize: isMobile ? "12px" : null,
            zIndex: 2,
          }}
          className={clsx(
            fields.length
              ? "animate-transform"
              : dirtyFields.tags
              ? "animate-transform-back"
              : "animate-none"
          )}
          onClick={() => append({ tag: "" })}
        >
          Add tag
        </Button>
      </form>
    </Box>
  )
}

export default ArticleForm
