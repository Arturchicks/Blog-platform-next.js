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
import ClearIcon from "@mui/icons-material/Clear"
import { CommentForm } from "../types/types"
import * as imageConversion from "image-conversion"

const Comments: React.FC<{ data: boolean }> = ({ data: userData }): JSX.Element => {
  const { slug } = useParams()
  const { data: comments } = useGetCommentsQuery(`${slug}`)
  const [comment] = useCreateCommentMutation()
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const handleImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if (files?.[0]) {
      const compressedImg = await imageConversion.compressAccurately(files[0], 50)
      const dataUrl = await imageConversion.filetoDataURL(compressedImg)
      setImage(dataUrl)
      setValue("imageHash", `![img](${dataUrl})`)
      clearErrors("body")
    }
  }
  const {
    handleSubmit,
    register: registerComment,
    formState: { errors, isSubmitted },
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm<CommentForm>({ resolver: yupResolver(schema) })
  const handleDeleteImg = () => {
    setValue("image", undefined)
    setValue("imageHash", undefined)
    setImage(null)
  }
  const body = watch("body")
  const onSubmit = handleSubmit(async (data) => {
    if (!Object.values(data).filter((e) => e).length) setError("body", { message: "can't be blank" })
    else {
      await comment({ slug, data: { comment: { body: `${data.body?.trim()} ${data.imageHash || ""}` } } })
      reset()
      handleDeleteImg()
    }
  })

  return (
    <section className="mb-5 mt-5">
      {userData && (
        <form onSubmit={onSubmit} className="relative">
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
            {(body?.trim() || image) && (
              <Button variant="text" color="info" type="submit" className="animate-display">
                Submit
              </Button>
            )}
          </div>
          {image && (
            <div className="flex gap-1 items-center animate-display absolute">
              <img src={image as string} className="min-w-[60px] max-h-[127px] rounded-[3px] relative" alt="avatar" />
              <Button
                variant="contained"
                startIcon={<ClearIcon className="text-gray-600" />}
                onClick={handleDeleteImg}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
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
        </form>
      )}
      <Box className="w-[100%] h-[1px] mt-36" sx={{ borderTop: "1px solid", borderColor: "text.secondary" }} />
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
