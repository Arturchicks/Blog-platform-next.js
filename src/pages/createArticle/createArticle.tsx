import React, { useEffect, useState } from "react"
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

const CreateArticle: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const theme = useTheme() as Theme
  const isMobile = useMediaQuery("(max-width: 480px)")
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm<Fields>({ resolver: yupResolver(schema) })

  const { append, remove, fields } = useFieldArray({
    name: "tagList",
    control,
    shouldUnregister: true,
  })

  const onSubmit = handleSubmit(async (data) => {
    const tags = data.tagList?.map(({ tag }) => tag)
    const { error } = await create({ article: { ...data, tagList: tags } })
    if (!error) navigate("/articles")
  })
  const handleDelete = (index: number) => {
    remove(index)
    setFirstRender(false)
  }
  useEffect(() => {
    isMobile
      ? document.documentElement.style.setProperty("--width", "77.83px")
      : document.documentElement.style.setProperty("--width", "86px")
  }, [isMobile])

  return (
    <Box
      className="xs:w-[80vw] sm:w-[60vw] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
      sx={{
        bgcolor: "primary.main",
        color: "secondary.main",
      }}
    >
      <h3 className="text-center font-Roboto">Create new article</h3>
      <form className="flex flex-col gap-5 relative" id="create-article-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-12">
          <fieldset>
            <div className="flex flex-col gap-5 text-[12px]">
              <FormField
                rows={1}
                placeholder="Title"
                id="title"
                error={!!errors.title}
                errors={errors.title}
                register={register("title")}
                name="title"
              />
              <FormField
                rows={1}
                placeholder="Description"
                id="description"
                error={!!errors.description}
                errors={errors.description}
                register={register("description")}
                name="description"
              />
              <FormField
                multiline={true}
                rows={isMobile ? 5 : 7}
                placeholder="Text"
                id="body"
                error={!!errors.body}
                errors={errors.body}
                register={register("body")}
                name="body"
              />
              <div className="w-[100%] relative">
                <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                  {fields?.map((e, index) => (
                    <li key={e.id} className="animate-display relative">
                      <label className="inline-block relative">
                        <Tag
                          remove={handleDelete}
                          key={e.id}
                          id={e.id}
                          error={!!errors.tagList?.[index]}
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
          sx={{
            position: "absolute",
            bottom: "15%",
            maxWidth: "86px",
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
