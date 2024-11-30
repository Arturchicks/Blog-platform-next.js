import React, { ChangeEvent, useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { schema } from "./utils/schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEditProfileMutation, useGetCurrentUserQuery } from "shared/redux/api"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { VisuallyHiddenInput } from "./ui/visibilityHiddenInput"
import { useNavigate } from "react-router-dom"
import { IEditUser } from "./types/types"
import DeleteIcon from "@mui/icons-material/Delete"
import clsx from "clsx"
import { Error } from "./types/types"
import * as imageConversion from "image-conversion"

export const EditUser: React.FC = (): JSX.Element => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const [serverError, setServerError] = useState<Error | null>(null)

  const handleImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if (files?.[0]) {
      const compressedImg = await imageConversion.compressAccurately(files[0], 50)
      const dataUrl = await imageConversion.filetoDataURL(compressedImg)
      setImage(dataUrl)
    }
  }
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleDeleteImg = () => {
    setValue("image", undefined)
    setImage(null)
  }

  const [edit, { isError }] = useEditProfileMutation()
  const { data: userData } = useGetCurrentUserQuery(null, { skip: isError })
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    const dataList = Object.values(data).filter((e) => e).length
    if (dataList <= 1 && !image) {
      setError("manual", {
        type: "required",
        message: "Change at least one parameter",
      })
    }
    if (userData) {
      const { email, username } = userData.user
      const user: IEditUser = {
        email: data.email || email,
        username: data.username || username,
        image: image || userData?.user.image,
      }
      if (data.password) {
        user.password = data.password
      }
      if (image || dataList > 1) {
        const { error } = (await edit({ user: user })) as IEditUser
        if (!error) navigate("/articles")
        else setServerError(error.data.errors)
      }
    }
  })

  return (
    <Box
      className={clsx(
        " xs:w-[75vw] s:w-[330px] rounded p-7 flex flex-col self-center animate-display relative",
        errors.manual ? "outline outline-1 outline-red-600" : "outline-none"
      )}
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <Box className="text-center relative h-[45px] flex justify-center">
        {errors.manual && (
          <p className="animate-display absolute bottom-2 text-red-500 font-Roboto text-[12px] text-center inline-block">
            {errors?.manual?.message}
          </p>
        )}
        Edit Profile
      </Box>
      <form className="flex flex-col justify-center gap-4" onSubmit={onSubmit}>
        <fieldset className="flex flex-col text-[14px]">
          <label htmlFor="username" className="inline-block h-20">
            <span>Username</span>
            <TextField
              id="username"
              placeholder="Username"
              sx={{ width: "100%" }}
              rows={1}
              size="small"
              error={!!errors.username || !!serverError?.username}
              {...register("username", {
                onChange: () => {
                  clearErrors("manual")
                  setServerError((prev) => ({ ...prev, username: "" }))
                },
              })}
            />
            {(errors.username || serverError?.username) && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">
                {`Username ${serverError?.username}` || errors.username?.message}
              </p>
            )}
          </label>
          <label htmlFor="email" className="inline-block h-20">
            Email
            <TextField
              id="email"
              placeholder="Email"
              sx={{ width: "100%" }}
              rows={1}
              size="small"
              error={!!errors.email || !!serverError?.email}
              {...register("email", {
                onChange: () => {
                  clearErrors("manual")
                  setServerError((prev) => ({ ...prev, email: "" }))
                },
              })}
            />
            {(errors.email || serverError?.email) && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">
                {errors.email?.message || `Email ${serverError?.email}`}
              </p>
            )}
          </label>
          <label htmlFor="password" className="inline-block h-20">
            Password
            <TextField
              id="password"
              placeholder="Password"
              sx={{ width: "100%" }}
              rows={1}
              size="small"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.password?.message}</p>
            )}
          </label>
          <label htmlFor="imageUrl" className="inline-block h-20">
            Paste image URL
            <TextField
              id="image"
              placeholder="URL"
              sx={{ width: "100%" }}
              rows={1}
              size="small"
              error={!!errors.imageUrl}
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.imageUrl?.message}</p>
            )}
          </label>
          <div className="h-[72px] flex items-center gap-2">
            <Button
              component="label"
              role={undefined}
              color="info"
              variant="contained"
              tabIndex={-1}
              sx={{ bgcolor: "#1890FF" }}
              startIcon={<CloudUploadIcon />}
            >
              Upload img
              <VisuallyHiddenInput
                type="file"
                {...register("image", {
                  onChange: (e) => {
                    handleImg(e)
                  },
                })}
              />
            </Button>
            {errors.image && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.image?.message}</p>
            )}
            {image && (
              <div className="flex gap-1 items-center animate-display">
                <img src={image as string} className="w-12 h-12 rounded-[50%]" alt="avatar" />
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
          </div>
        </fieldset>
        <ColorButton type="submit">Save</ColorButton>
      </form>
    </Box>
  )
}
