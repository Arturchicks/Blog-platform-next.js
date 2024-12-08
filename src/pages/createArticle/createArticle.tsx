import React, { ChangeEvent, createRef, LegacyRef, Ref, useEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button, Theme, useMediaQuery } from "@mui/material"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateArticleMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { useTheme } from "@emotion/react"
import { Fields } from "./types/types"
import clsx from "clsx"
import { FormField } from "shared/ui/form-field/form-field"
import { Tag } from "./ui/tag"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import { VisuallyHiddenInput } from "pages/EditUser/ui/visibilityHiddenInput"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import ClearIcon from "@mui/icons-material/Clear"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { nanoid } from "nanoid"
import { handleImg } from "shared/lib/handleImage"

const CreateArticle: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const [image, setImage] = useState<string | undefined>()
  const [showImg, setShowImg] = useState<boolean>(false)
  const theme = useTheme() as Theme
  const imgRef = useRef() as Ref<any>
  const isMobile = useMediaQuery("(max-width: 480px)")
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Fields>({ resolver: yupResolver(schema) })
  const { append, remove, fields } = useFieldArray({
    name: "tagList",
    control,
    shouldUnregister: true,
  })

  const onSubmit = handleSubmit(async (data) => {
    const tags = data.tagList?.map(({ tag }) => tag)
    const { body, ...restData } = data
    const { error } = await create({ article: { body: `${body} ![img](${image})`, ...restData, tagList: tags } })
    if (!error) navigate("/articles")
  })
  const handleDelete = (index: number) => {
    remove(index)
    setFirstRender(false)
  }

  return (
    <Box
      className="xs:w-[80vw] sm:w-[60vw] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
      sx={{
        bgcolor: "primary.main",
        color: "secondary.main",
        boxShadow: `0px 0px 3px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
      }}
    >
      <h3 className="text-center font-Roboto text-clamp-xl">Create new article</h3>
      <form className="flex flex-col gap-5 relative" id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-4">
              <FormField
                rows={1}
                placeholder="Title"
                id="title"
                error={!!errors.title}
                errors={errors.title}
                register={register}
                name="title"
              />
              <FormField
                rows={1}
                placeholder="Description"
                id="description"
                error={!!errors.description}
                errors={errors.description}
                register={register}
                name="description"
              />
              <FormField
                multiline={true}
                rows={isMobile ? 5 : 7}
                placeholder="Text"
                id="body"
                error={!!errors.body}
                errors={errors.body}
                register={register}
                name="body"
              >
                <div className="flex items-center gap-3 min-h-[56px]">
                  <Button
                    component="label"
                    role={undefined}
                    color="info"
                    variant="text"
                    tabIndex={-1}
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
                      {...register("image", {
                        onChange: (e) =>
                          handleImg(e).then((dataUrl) => {
                            setImage(dataUrl)
                            setValue("image", nanoid())
                            setShowImg(true)
                          }),
                      })}
                    />
                  </Button>
                  <CSSTransition
                    nodeRef={imgRef}
                    in={showImg}
                    onExited={() => setImage(undefined)}
                    timeout={300}
                    classNames="alert"
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
                        onClick={() => setShowImg(false)}
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
                <TransitionGroup className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                  {fields?.map((e, index) => {
                    const ref = createRef() as Ref<any>
                    return (
                      <CSSTransition
                        nodeRef={ref}
                        classNames="alert"
                        timeout={300}
                        key={e.id}
                        in={!!e.id}
                        unmountOnExit
                      >
                        <li key={e.id} className="relative list-none" ref={ref}>
                          <label className="inline-block relative">
                            <Tag
                              remove={handleDelete}
                              key={e.id}
                              message={errors.tagList?.[index]?.message}
                              id={e.id}
                              error={!!errors.tagList?.[index]}
                              index={index}
                              register={register(`tagList.${index}.tag`)}
                            />
                          </label>
                        </li>
                      </CSSTransition>
                    )
                  })}
                </TransitionGroup>
                <Box
                  className="left-0 w-full min-h-10 pointer-events-none absolute bottom-0"
                  sx={{ backgroundImage: `linear-gradient(to top, ${theme.palette.primary.main}, transparent)` }}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <ColorButton type="submit" className="w-[200px] xs:self-center sm:self-start">
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
          }}
          className={clsx(
            !firstRender ? (fields?.length ? "animate-transform" : "animate-transform-back") : "animate-none"
          )}
          onClick={() => {
            append({ tag: "" })
            setFirstRender(false)
          }}
        >
          Add tag
        </Button>
      </form>
    </Box>
  )
}

export default CreateArticle
