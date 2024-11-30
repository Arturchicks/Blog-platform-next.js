import { yupResolver } from "@hookform/resolvers/yup"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { schema } from "../utils/schema"
import { useCreateCommentMutation, useGetCommentsQuery } from "shared/redux/api"
import { FormField } from "shared/ui/form-field/form-field"
import Button from "@mui/material/Button"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { VisuallyHiddenInput } from "pages/EditUser/ui/visibilityHiddenInput"
import DeleteIcon from "@mui/icons-material/Delete"

const Comments: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data: comments } = useGetCommentsQuery(`${slug}`)
  const [comment] = useCreateCommentMutation()
  const [imageName, setImageName] = useState<string | null>(null)
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const {
    handleSubmit,
    register: registerComment,
    formState: { errors, isSubmitted },
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
    resetField,
  } = useForm({ resolver: yupResolver(schema) })
  const handleDeleteImg = () => {
    resetField("imageHash")
    resetField("image")
    setImage(null)
    setImageName(null)
  }
  const body = watch("body")
  const imageHash = watch("imageHash")
  const onSubmit = handleSubmit(async (data) => {
    if (!Object.values(data).filter((e) => e).length) setError("body", { message: "can't be blank" })
    else {
      await comment({ slug, data: { comment: { body: `${data.body?.trim()} ${data.imageHash || ""}` } } })
      reset()
      handleDeleteImg()
    }
  })
  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if (files?.[0]) {
      setImageName(files?.[0].name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        setValue("imageHash", `![img](${reader.result as string})`)
      }
      reader.onerror = () => console.log("aborted")
      reader.readAsDataURL(files[0])
      clearErrors("body")
    }
  }

  return (
    <section className="mb-5 mt-5">
      <form onSubmit={onSubmit}>
        <FormField
          error={!!errors.body}
          errors={errors.body}
          id="comment"
          name="body"
          type="comment"
          rows={4}
          isSubmitted={isSubmitted}
          multiline={true}
          placeholder="Add comment..."
          register={registerComment}
        />
        <div className="flex items-center mt-2 gap-1 justify-between min-h-[37px]">
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
              {...registerComment("image", {
                onChange: (e) => handleImg(e),
              })}
            />
          </Button>
          {errors.image && (
            <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.image?.message}</p>
          )}
          {imageName && (
            <div className="flex gap-1 items-center animate-display">
              <span className="inline-block max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {imageName}
              </span>
              <img src={image as string} className="w-9 h-9 rounded-[50%]" alt="avatar" />
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteImg}
                sx={{
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                  "&.MuiButton-root": {
                    padding: 0,
                    minWidth: "auto",
                  },
                }}
              />
            </div>
          )}
          {(body?.trim() || image) && (
            <Button variant="text" color="info" type="submit" className="animate-display">
              Submit
            </Button>
          )}
        </div>
      </form>
      <Box className="w-[100%] h-[1px] mt-7" sx={{ borderTop: "1px solid", borderColor: "text.secondary" }} />
      <Box className="text-[20px] font-extralight flex items-center gap-2 mt-3">
        <span>Comments</span>
        <span className="inline-block min-w-6 h-5 rounded-xl bg-[#1890ff] text-[12px] text-center p-[2px]">
          {comments?.comments.length}
        </span>
      </Box>
    </section>
  )
}
export default Comments
