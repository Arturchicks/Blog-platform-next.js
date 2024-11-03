import React, { useCallback, useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button, TextField } from "@mui/material"
import { Tag } from "./ui/tag"
import { nanoid } from "nanoid"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateArticleMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"

const CreateArticle: React.FC = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([])
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const tagList = useRef<string[]>([])
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
      tagList.current = tagList.current.filter((e) => e !== key)
      setTags([...tagList.current])
    },
    [resetField]
  )
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    const { title, description, body, tagList } = data
    const res = await create({ article: { title, description, body, tagList } })
    if (res.data) navigate("/articles")
  })
  useEffect(() => {
    console.log(tags, tagList.current)
  })
  return (
    <div className="w-[60vw] h-[80vh] bg-white rounded-lg mx-auto p-[28px] animate-display relative">
      <h3 className="text-center font-Roboto">Create new article</h3>
      <form className="flex flex-col gap-5 " id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="relative h-20">
                Title
                <TextField
                  rows={1}
                  placeholder="Title"
                  id="title"
                  {...register("title")}
                  size="small"
                  sx={{ width: "100%" }}
                  error={!!errors.title}
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
                  {...register("description")}
                  size="small"
                  sx={{ width: "100%" }}
                  error={!!errors.description}
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
                  {...register("body")}
                  sx={{ width: "100%" }}
                  error={!!errors.body}
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
                            register={register(`tagList.${index}`)}
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
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
              )) ||
                null}
            </div>
          </fieldset>
        </div>
        <ColorButton
          type="submit"
          title="Submit"
          className="w-[200px]"
          sx={{ position: "absolute", bottom: "20px" }}
          onClick={() => console.log(tags)}
        >
          Send
        </ColorButton>
      </form>
      <Button
        variant="outlined"
        className={!firstRender ? (tags?.length ? "animate-transform" : "animate-transform-back") : "animate-none"}
        sx={{ position: "absolute", bottom: "21%" }}
        onClick={() => {
          tagList.current.push(nanoid())
          setTags([...tagList.current])
          setFirstRender(false)
          console.log(tagList)
        }}
      >
        Add tag
      </Button>
    </div>
  )
}

export default CreateArticle
