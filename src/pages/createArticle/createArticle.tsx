import React, { useCallback, useEffect, useState } from "react"
import { FieldValues, useFieldArray, useForm } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button, TextField, Theme, useMediaQuery } from "@mui/material"
import { Tag } from "./ui/tag"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateArticleMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { useTheme } from "@emotion/react"
import { TFieldValues } from "./types/types"
import clsx from "clsx"

const CreateArticle: React.FC = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([])
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const theme = useTheme() as Theme
  const isMobile = useMediaQuery("(max-width: 480px)")
  const randomId = () => {
    return (Math.random() * 10 * new Date().getTime()).toFixed(0)
  }
  const {
    register,
    unregister,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<TFieldValues>({ resolver: yupResolver(schema) })
  const { control } = useForm<Tags>()
  type Tags = {
    tags: { tag: string }[]
  }
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<Tags>({ name: "tags", control })
  const handleDelete = useCallback(
    (key: string, index: number) => {
      // resetField(`tags.${+key}`)
      // unregister(`tagList.${+key}`)
      console.log(fields)
      setTags((prev) => prev.filter((e) => e !== key))
    },
    [resetField, tags]
  )

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(errors)
    const res = await create({ article: data })
    if (res.data) navigate("/articles")
  })
  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.setProperty("--width", "70px")
    } else {
      document.documentElement.style.setProperty("--width", "86px")
    }
  }, [isMobile])
  return (
    <Box
      className="xs:w-[80vw] sm:w-[60vw] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <h3 className="text-center font-Roboto">Create new article</h3>
      <form className="flex flex-col gap-5 relative" id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-1 text-[12px]">
              <label htmlFor="title" className="h-20">
                <Box sx={{ marginBottom: "4px", fontSize: "14px" }}>Title</Box>
                <TextField
                  rows={1}
                  placeholder="Title"
                  id="title"
                  size="small"
                  className="w-[100%]"
                  error={!!errors.title}
                  autoComplete="off"
                  {...register("title")}
                />
                {errors.title && <p className="animate-display text-red-500 font-Roboto">{errors.title.message}</p>}
              </label>
              <label htmlFor="description" className="relative  h-20">
                <Box sx={{ marginBottom: "4px", fontSize: "14px" }}>Description</Box>
                <TextField
                  rows={1}
                  placeholder="Description"
                  id="description"
                  size="small"
                  className="w-[100%]"
                  error={!!errors.description}
                  autoComplete="off"
                  {...register("description")}
                />
                {errors.description ? (
                  <p className="animate-display  text-red-500 font-Roboto">{errors.description.message}</p>
                ) : null}
              </label>
              <label htmlFor="text" className="relative ">
                <Box sx={{ marginBottom: "4px", fontSize: "14px" }}>Text</Box>
                <TextField
                  rows={isMobile ? 5 : 7}
                  multiline={true}
                  placeholder="Text"
                  id="body"
                  className="w-[100%]"
                  error={!!errors.body}
                  autoComplete="off"
                  {...register("body")}
                />
                {errors.body ? <p className="animate-display text-red-500 font-Roboto">{errors.body.message}</p> : null}
              </label>
              <div className="w-[100%]">
                <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                  {tags?.map((e, index) => (
                    <li key={e} className="animate-display relative">
                      <label className="inline-block h-[3.75rem]">
                        <Tag
                          delete={handleDelete}
                          key={e}
                          id={e}
                          unregister={unregister}
                          register={register}
                          index={index}
                          error={false}
                        />
                        {/* {errors?.tagList?.[index] ? (
                          <p className="animate-display absolute bottom-0 text-red-500 font-Roboto">
                            {errors?.tagList?.[+e]?.message}
                          </p>
                        ) : null} */}
                      </label>
                    </li>
                  ))}
                </ul>
                <Box
                  className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
                  sx={{ backgroundImage: `linear-gradient(to top, ${theme.palette.primary.main}, transparent)` }}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <ColorButton
          type="submit"
          className="w-[200px] xs:self-center sm:self-start"
          onClick={() => console.log(errors)}
        >
          Send
        </ColorButton>
        <Button
          variant="outlined"
          color="info"
          sx={{
            position: "absolute",
            bottom: "15%",
            maxWidth: "86px",
            whiteSpace: "nowrap",
            textTransform: "capitalize",
            fontSize: isMobile ? "10px" : null,
          }}
          className={clsx(
            !firstRender ? (tags?.length ? "animate-transform" : "animate-transform-back") : "animate-none"
          )}
          onClick={() => {
            setTags((prev) => [...prev, randomId()])
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
