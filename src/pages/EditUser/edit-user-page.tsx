import React, { ReactEventHandler, useEffect, useState } from "react"
import { Box, TextField, useMediaQuery, InputLabel, Button } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { schema } from "./utils/schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEditProfileMutation, useGetCurrentUserQuery } from "shared/redux/api"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { VisuallyHiddenInput } from "./ui/visibilityHiddenInput"
import { useNavigate } from "react-router-dom"
import { User } from "./types/types"
import DeleteIcon from "@mui/icons-material/Delete"
import clsx from "clsx"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "file-input": React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    }
  }
}
export const EditUser: React.FC = (): JSX.Element => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const handleImg = (e: Event) => {
    const { files } = e.target as HTMLInputElement
    if (files?.[0]) {
      setImageName(files?.[0].name)
      console.log(files?.[0])
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.onerror = () => console.log("aborted")
      reader.readAsDataURL(files[0])
    }
  }
  const handleDeleteImg = () => {
    setImage(null)
    setImageName(null)
  }
  const isPointer = useMediaQuery("(pointer: fine)")
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const [edit] = useEditProfileMutation()
  const { data: userData } = useGetCurrentUserQuery(null)
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    const dataList = Object.values(data).filter((e) => e).length
    console.log(data)
    if (dataList <= 1 && !image) {
      setError("manual", {
        type: "required",
        message: "Change at least one parameter",
      })
    }
    if (userData) {
      const { email, username } = userData.user
      const user: User = {
        email: data.email || email,
        username: data.username || username,
        image: image || userData?.user.image,
      }
      if (data.password) {
        user.password = data.password
      }
      const res = await edit({ user: user })
      if (dataList > 1 || image) {
        navigate("/articles")
      }
    }
  })
  useEffect(() => {
    console.log(image, imageName)
  }, [image, imageName])
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
              error={!!errors.username}
              {...register("username", {
                onChange: () => clearErrors("manual"),
              })}
            />
            {errors.username && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.username?.message}</p>
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
              error={!!errors.email}
              {...register("email", {
                onChange: () => clearErrors("manual"),
              })}
            />
            {errors.email && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.email?.message}</p>
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
          <div className="h-[72px] flex items-start gap-2 flex-wrap">
            {/* <InputLabel
              htmlFor="file_input"
              className={clsx(
                "relative whitespace-nowrap max-w-[120px] flex justify-center",
                isPointer ? "hover:opacity-50" : null,
                "items-center border-none h-[36px] bg-[#1890FF] rounded-md text-xs text-white font-medium p-1 cursor-pointer"
              )}
            >
              New image
              <input
                className="invisible absolute top-0 left-0"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                {...register("image", {
                  onChange: (e) => handleImg(e),
                })}
              />
            </InputLabel> */}
            <Button
              component="label"
              role={undefined}
              color="info"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload img
              <VisuallyHiddenInput
                type="file"
                {...register("image", {
                  onChange: (e) => {
                    console.log(e)
                    handleImg(e)
                  },
                })}
              />
            </Button>
            {errors.image && (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.image?.message}</p>
            )}
            {imageName && (
              <div className="flex gap-1 items-center animate-display mx-auto">
                <span className="inline-block max-w-[150px]">{imageName}</span>
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
          </div>
        </fieldset>
        <ColorButton type="submit">Save</ColorButton>
      </form>
    </Box>
  )
}