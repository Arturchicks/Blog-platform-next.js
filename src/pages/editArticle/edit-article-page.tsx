import { useTheme } from "@emotion/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, CircularProgress, Theme, useMediaQuery } from "@mui/material"
import clsx from "clsx"
import { Fields } from "pages/createArticle/types/types"
import { Tag } from "pages/createArticle/ui/tag"
import { schema } from "pages/createArticle/utils/schema"
import React, { useEffect, useState } from "react"
import { useFieldArray, useForm, UseFormRegisterReturn } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useGetArticleQuery, useUpdateArticleMutation } from "shared/redux/api"
import { FormField } from "shared/ui/form-field/form-field"
import { ColorButton } from "shared/ui/signButton"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"

const EditArticle: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(String(slug))
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const theme = useTheme() as Theme
  const [update] = useUpdateArticleMutation()
  const isMobile = useMediaQuery("(max-width: 480px)")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Fields>({ resolver: yupResolver(schema) })
  const { append, remove, fields } = useFieldArray({
    name: "tagList",
    control,
    shouldUnregister: true,
  })
  const handleDelete = (index: number) => {
    remove(index)
    setFirstRender(false)
  }
  const onSubmit = handleSubmit(async (data) => {
    const tags = data.tagList?.map(({ tag }) => tag)
    const { error } = await update({ slug, data: { ...data, tagList: tags } })
    if (!error) navigate("/articles")
  })
  useEffect(() => {
    if (data?.article.tagList) data.article.tagList.map((e) => append({ tag: e }))
  }, [data])

  return (
    <>
      {!data ? (
        <CircularProgress className="mx-auto" />
      ) : (
        <Box
          className="xs:w-[80vw] sm:w-[60vw] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
          sx={{
            bgcolor: "primary.main",
            color: "secondary.main",
            boxShadow: `0px 0px 3px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
          }}
        >
          <h3 className="text-center font-Roboto">Edit article</h3>
          <form className="flex flex-col gap-5 relative" id="create-article-form" onSubmit={onSubmit}>
            <div className="flex flex-col gap-12">
              <fieldset>
                <div className="flex flex-col gap-5 text-[12px]">
                  <FormField
                    rows={1}
                    defaultValue={data?.article.title}
                    placeholder="Title"
                    id="title"
                    type="edit"
                    error={!!errors.title}
                    errors={errors.title}
                    register={register}
                    name="title"
                  />
                  <FormField
                    rows={1}
                    placeholder="Description"
                    defaultValue={data?.article.description}
                    id="description"
                    type="edit"
                    error={!!errors.description}
                    errors={errors.description}
                    register={register}
                    name="description"
                  />
                  <FormField
                    multiline={true}
                    rows={isMobile ? 5 : 7}
                    placeholder="Text"
                    defaultValue={data?.article.body}
                    id="body"
                    type="edit"
                    error={!!errors.body}
                    errors={errors.body}
                    register={register}
                    name="body"
                  />
                  <div className="w-[100%] relative">
                    <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                      {fields?.map((e, index) => (
                        <li key={e.id} className="animate-display relative">
                          <label className="inline-block relative">
                            <Tag
                              message={errors.tagList?.[index]?.message}
                              remove={handleDelete}
                              key={e.id}
                              error={!!errors.tagList?.[index]}
                              id={e.id}
                              index={index}
                              register={register(`tagList.${index}.tag`)}
                            />
                          </label>
                        </li>
                      ))}
                    </ul>
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
                fields?.length ? "animate-transform" : firstRender ? "animate-none" : "animate-transform-back"
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
      )}
    </>
  )
}
export default EditArticle
