import React, { useCallback, useState, useRef, useEffect } from "react"
import { LabeledTextarea } from "./ui/textArea"
import { useForm } from "react-hook-form"
import { ColorButton } from "shared/ui/signButton"
import { Button } from "@mui/material"
import { Tag } from "./ui/tag"
import { nanoid } from "nanoid"
const CreateArticle: React.FC = (): JSX.Element => {
  const tags = useRef<string[]>([])
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [state, setState] = useState<boolean>(false)
  const handleDelete = useCallback((key: string) => {
    tags.current = tags.current.filter((e) => e !== key)
    setState((prev) => !prev)
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
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
                <LabeledTextarea rows={1} placeholder="Title" id="title" labelText="Title" width={100} />
              </label>
              <label htmlFor="description">
                Description
                <LabeledTextarea
                  rows={1}
                  placeholder="Description"
                  id="description"
                  labelText="Description"
                  width={100}
                />
              </label>
              <label htmlFor="text">
                Text
                <LabeledTextarea rows={7} placeholder="Text" id="text" labelText="Text" width={100} />
              </label>
              {(tags.current.length && (
                <div className="relative w-[50%]">
                  <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter">
                    {tags.current.map((e) => (
                      <li key={e} className="animate-display">
                        <Tag key={e} delete={handleDelete} id={e} />
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
                  !firstRender ? (tags.current.length ? "animate-transform" : "animate-transform-back") : "animate-none"
                }
                sx={{ position: "absolute", bottom: "21%", left: "6%" }}
                onClick={(e) => {
                  tags.current.push(nanoid())
                  setState((prev) => !prev)
                  setFirstRender(false)
                }}
              >
                Add tag
              </Button>
            </div>
          </fieldset>
        </div>
      </form>
      <ColorButton type="submit" className="w-[200px]" sx={{ position: "absolute", bottom: 20, left: 20 }}>
        Send
      </ColorButton>
    </div>
  )
}
export default CreateArticle
