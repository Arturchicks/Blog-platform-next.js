import React, { useCallback, useState, useRef, useEffect } from "react"
import { LabeledTextarea } from "./ui/textArea"
import { useForm } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button } from "@mui/material"
import { Tag } from "./ui/tag"
import { nanoid } from "nanoid"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
const CreateArticle: React.FC = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([])
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const tagList = useRef<string[]>([])
  const ref = React.createRef<HTMLTextAreaElement>()
  const [state, setState] = useState<boolean>(false)
  const handleDelete = useCallback((key: string) => {
    tagList.current = tagList.current.filter((e) => e !== key)
    setTags([...tagList.current])
    console.log(tags)
  }, [])
  console.log(tags, tagList)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className="w-[60vw] h-[80vh] bg-white rounded-lg mx-auto p-8 animate-display relative">
      <h3 className="text-center font-Roboto">Create new article</h3>
      <form className="flex flex-col gap-5 " id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-3">
              <label htmlFor="title">
                Title
                <LabeledTextarea
                  rows={1}
                  placeholder="Title"
                  id="title"
                  labelText="Title"
                  width={100}
                  {...register("title")}
                  ref={ref}
                />
              </label>
              <label htmlFor="description">
                Description
                <LabeledTextarea
                  rows={1}
                  placeholder="Description"
                  id="description"
                  labelText="Description"
                  width={100}
                  {...register("description")}
                />
              </label>
              <label htmlFor="text">
                Text
                <LabeledTextarea
                  rows={7}
                  placeholder="Text"
                  id="text"
                  labelText="Text"
                  width={100}
                  {...register("text")}
                />
              </label>
              {(tags?.length && (
                <div className="relative w-[50%]">
                  <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter">
                    {tags?.map((e) => (
                      <li key={e} className="animate-display">
                        <Tag key={e} delete={handleDelete} id={e} {...register("tag")} ref={ref} />
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
              )) ||
                null}
              <Button
                variant="outlined"
                className={
                  !firstRender ? (tags?.length ? "animate-transform" : "animate-transform-back") : "animate-none"
                }
                sx={{ position: "absolute", bottom: "21%", left: "6%" }}
                onClick={(e) => {
                  tagList.current.push(nanoid())
                  setTags([...tagList.current])
                  setState((prev) => !prev)
                  setFirstRender(false)
                }}
              >
                Add tag
              </Button>
            </div>
          </fieldset>
        </div>
        <ColorButton type="submit" className="w-[200px]" sx={{ position: "absolute", bottom: 20, left: 20 }}>
          Send
        </ColorButton>
      </form>
    </div>
  )
}
export default CreateArticle
