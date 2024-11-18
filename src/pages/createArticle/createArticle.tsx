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
import { Tags, TFieldValues } from "./types/types"
import clsx from "clsx"
import { FormField } from "shared/ui/form-field/form-field"
import { ErrorMessage } from "shared/ui/error"
import { Tag } from "./ui/tag"

const CreateArticle: React.FC = (): JSX.Element => {
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [create] = useCreateArticleMutation()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const theme = useTheme() as Theme
  const isMobile = useMediaQuery("(max-width: 480px)")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFieldValues>({ resolver: yupResolver(schema) })

  const {
    control,
    formState: { errors: tagErrors },
    handleSubmit: handleTagSubmit,
    watch,
    register: tagRegister,
    unregister: tagUnregister,
  } = useForm<Tags>()
  const { fields, append, remove } = useFieldArray<Tags>({
    name: "tags",
    control,
  })
  const watchField = watch("tags")

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const res = await create({ article: data })
    if (res.data) navigate("/articles")
  })

  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.setProperty("--width", "77.83px")
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
            <div className="flex flex-col gap-3 text-[12px]">
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
              <div className="w-[100%]">
                <ul className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                  {fields?.map((e, index) => (
                    <li key={e.id} className="animate-display relative">
                      <label className="inline-block relative">
                        <Tag delete={remove} key={e.id} id={e.id} index={index} error={!!tagErrors?.tags?.[index]} />
                        {!watchField?.[index].tag.length && submitted && (
                          <ErrorMessage message="Add tag" fontsize={12} />
                        )}
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
          onClick={() => setSubmitted(true)}
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
