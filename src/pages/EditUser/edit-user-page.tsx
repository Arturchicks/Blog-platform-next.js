import React, { ChangeEvent, useState } from "react"
import { Box, Button, Theme } from "@mui/material"
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
import * as imageConversion from "image-conversion"
import { useTheme } from "@emotion/react"
import { FormField } from "shared/ui/form-field/form-field"
import { ErrorKey } from "features/sign-up-form/types/types"

export const EditUser: React.FC = (): JSX.Element => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
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
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleDeleteImg = () => {
    setValue("image", undefined)
    setImage(null)
  }
  const theme = useTheme() as Theme
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
        if (error) {
          for (const key in error.data.errors) {
            setError(key as Exclude<ErrorKey, "repeat">, { message: `${key} is already taken` })
          }
        } else navigate("/articles")
      }
    }
  })

  return (
    <Box
      className={clsx(
        " xs:w-[75vw] s:w-[330px] rounded p-7 flex flex-col self-center animate-display relative",
        errors.manual ? "outline outline-1 outline-red-600" : "outline-none"
      )}
      sx={{
        bgcolor: "primary.main",
        color: "secondary.main",
        boxShadow: `0px 0px 4px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
      }}
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
        <FormField
          id="username"
          name="username"
          placeholder="Username"
          rows={1}
          type="edit"
          error={!!errors.username}
          errors={errors.username}
          register={register}
        />

        <FormField
          id="email"
          name="email"
          placeholder="Email"
          rows={1}
          type="edit"
          error={!!errors.email}
          errors={errors.email}
          register={register}
        />

        <FormField
          id="password"
          name="password"
          placeholder="Password"
          rows={1}
          type="edit"
          error={!!errors.password}
          errors={errors.password}
          register={register}
        />
        <FormField
          id="image"
          name="imageUrl"
          placeholder="URL"
          rows={1}
          type="edit"
          error={!!errors.imageUrl}
          errors={errors.imageUrl}
          register={register}
        />
        <div className="h-[72px] flex items-center gap-2 justify-between">
          <Button
            component="label"
            role={undefined}
            color="info"
            variant="contained"
            tabIndex={-1}
            sx={{ bgcolor: "#1890FF", color: "white" }}
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
        <ColorButton type="submit">Save</ColorButton>
      </form>
    </Box>
  )
}
