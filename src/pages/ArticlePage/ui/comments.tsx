import { yupResolver } from "@hookform/resolvers/yup"
import React, { ChangeEvent, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { schema } from "../utils/schema"
import { useCreateCommentMutation, useGetCommentsQuery } from "shared/redux/api"
import { FormField } from "shared/ui/form-field/form-field"
import Button from "@mui/material/Button"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { useParams } from "react-router-dom"
import { VisuallyHiddenInput } from "pages/EditUser/ui/visibilityHiddenInput"
import ClearIcon from "@mui/icons-material/Clear"
import { CommentForm } from "../types/types"
import * as imageConversion from "image-conversion"
import { CSSTransition } from "react-transition-group"

const Comments: React.FC<{ data: boolean }> = ({ data: userData }): JSX.Element => {
  const { slug } = useParams()
  const [comment] = useCreateCommentMutation()
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const [showImg, setShowImg] = useState<boolean>(false)
  const imgRef = useRef<any>()
  const buttonRef = useRef<any>()
  const handleImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if (files?.[0]) {
      const compressedImg = await imageConversion.compressAccurately(files[0], 50)
      const dataUrl = await imageConversion.filetoDataURL(compressedImg)
      setImage(dataUrl)
      setShowImg(true)
      setValue("imageHash", `![img](${dataUrl})`)
      clearErrors("body")
    }
  }
  const {
    handleSubmit,
    register: registerComment,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm<CommentForm>({ resolver: yupResolver(schema) })
  const handleDeleteImg = () => {
    setValue("image", undefined)
    setValue("imageHash", undefined)
    setShowImg(false)
  }
  const onSubmit = handleSubmit(async (data) => {
    await comment({ slug, data: { comment: { body: `${data.body?.trim()} ${data.imageHash || ""}` } } })
    handleDeleteImg()
    reset()
  })
  const body = Boolean(watch("body"))
  return (
    <>
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
              isEmpty={body || showImg}
              multiline={true}
              placeholder="Add comment..."
              register={registerComment}
            >
              <Button
                variant="text"
                color="info"
                type="submit"
                className="animate-display"
                sx={{ position: "absolute", right: 0, bottom: "-130px" }}
              >
                Submit
              </Button>
            </FormField>
            <div className="flex items-center mt-2 gap-1 justify-between min-h-[37px]">
              <Button
                component="label"
                role={undefined}
                color="info"
                variant="text"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
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
            </div>
            <CSSTransition
              nodeRef={imgRef}
              in={showImg}
              timeout={300}
              classNames="alert"
              onExited={() => setImage(null)}
              unmountOnExit
            >
              <div className="flex gap-1 w-fit items-center animate-display relative" ref={imgRef}>
                <img src={image as string} className="min-w-[60px] max-h-[127px] rounded-[3px]" alt="avatar" />
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
            </CSSTransition>
          </form>
        )}
      </section>
    </>
  )
}
export default Comments
