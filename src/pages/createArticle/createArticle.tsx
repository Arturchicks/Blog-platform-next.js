import React, { useCallback, useState, useRef, useEffect } from "react"
import { useForm, useFormState } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button, TextField, Theme } from "@mui/material"
import { Tag } from "./ui/tag"
import { nanoid } from "nanoid"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateArticleMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { useTheme } from "@emotion/react"

const CreateArticle: React.FC = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([])
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const theme = useTheme() as Theme
  const {
    register,
    unregister,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleDelete = useCallback(
    (key: string, index: number) => {
      resetField(`tagList.${index}`)
      if (tags.length === 1) {
        unregister("tagList")
        console.log("length")
      }
      setTags((prev) => prev.filter((e) => e !== key))
    },
    [resetField, tags]
  )

  const getRandomId = (index: number) => {
    return Math.random() * 10 * index
  }

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const res = await create({ article: data })
    if (res.data) navigate("/articles")
  })

  return (
    <Box
      className="w-[60vw] h-[80vh] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <h3 className="text-center font-Roboto">Create new article</h3>
      <form className="flex flex-col gap-5" id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="relative h-20">
                Title
                <TextField
                  rows={1}
                  placeholder="Title"
                  id="title"
                  size="small"
                  sx={{ width: "100%" }}
                  error={!!errors.title}
                  autoComplete="off"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="animate-display text-red-500 font-Roboto text-xs">{errors.title.message}</p>
                )}
              </label>
              <label htmlFor="description" className="relative  h-20">
                Description
                <TextField
                  rows={1}
                  placeholder="Description"
                  id="description"
                  size="small"
                  sx={{ width: "100%" }}
                  error={!!errors.description}
                  autoComplete="off"
                  {...register("description")}
                />
                {errors.description ? (
                  <p className="animate-display  text-red-500 font-Roboto text-xs">{errors.description.message}</p>
                ) : null}
              </label>
              <label htmlFor="text" className="relative h-48">
                Text
                <TextField
                  rows={5}
                  multiline={true}
                  placeholder="Text"
                  id="body"
                  sx={{ width: "100%" }}
                  error={!!errors.body}
                  autoComplete="off"
                  {...register("body")}
                />
                {errors.body ? (
                  <p className="animate-display text-red-500 font-Roboto text-xs">{errors.body.message}</p>
                ) : null}
              </label>
              {(tags?.length && (
                <div className="relative w-[44%]">
                  <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit">
                    {tags?.map((e, index) => (
                      <li key={e} className="animate-display relative">
                        <label className="inline-block h-14">
                          <Tag
                            delete={handleDelete}
                            key={e}
                            id={e}
                            unregister={unregister}
                            register={register}
                            index={index}
                            error={!!errors.tagList?.[index]}
                          />
                          {errors?.tagList?.[index] ? (
                            <p className="animate-display absolute bottom-0 text-red-500 font-Roboto text-xs">
                              {errors?.tagList?.[index]?.message}
                            </p>
                          ) : null}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <Box
                    className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
                    sx={{ backgroundImage: `linear-gradient(to top, ${theme.palette.primary.main}, transparent)` }}
                  />
                </div>
              )) ||
                null}
            </div>
          </fieldset>
        </div>
        <ColorButton
          type="submit"
          className="w-[200px]"
          sx={{ position: "absolute", bottom: "20px" }}
          onClick={() => console.log(tags)}
        >
          Send
        </ColorButton>
      </form>
      <Button
        variant="contained"
        className={!firstRender ? (tags?.length ? "animate-transform" : "animate-transform-back") : "animate-none"}
        sx={{ position: "absolute", bottom: "21%" }}
        onClick={() => {
          setTags((prev) => [...prev, nanoid()])
          console.log(tags)
          setFirstRender(false)
        }}
      >
        Add tag
      </Button>
    </Box>
  )
}

export default CreateArticle
