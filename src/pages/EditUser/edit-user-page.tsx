import React, { ChangeEvent, useState } from "react"
import { Box, Input, Theme } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { schema } from "./utils/schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEditProfileMutation, useGetCurrentUserQuery } from "shared/redux/api"
import { VisuallyHiddenInput } from "./ui/visibilityHiddenInput"
import { useNavigate } from "react-router-dom"
import { IEditUser } from "./types/types"
import clsx from "clsx"
import * as imageConversion from "image-conversion"
import { useTheme } from "@emotion/react"
import { FormField } from "shared/ui/form-field/form-field"
import { ErrorKey } from "features/sign-up-form/types/types"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import { FaRegEyeSlash } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"

export const EditUser: React.FC = (): JSX.Element => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const [type, setType] = useState<boolean>(true)
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
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const theme = useTheme() as Theme
  const [edit, { isError }] = useEditProfileMutation()
  const { data: userData } = useGetCurrentUserQuery(null, { skip: isError })
  const navigate = useNavigate()
  const watchPassord = watch("password")
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
      if (dataList > 1 || image) {
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
        " xs:w-[75vw] s:w-[330px] rounded pt-7 pb-7 pl-14 pr-14 flex flex-col self-center animate-display relative",
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
      <div className="flex items-center gap-10 self-center">
        <label htmlFor="img" className="relative cursor-pointer hover:opacity-50 transition-opacity duration-200">
          <div>
            <img
              src={(image as string) || userData?.user.image}
              alt="avatar"
              className="rounded-[50%] w-[100px] h-[100px] border-[2px] border-solid border-[#1890FF]"
            />
            <VisuallyHiddenInput
              type="file"
              id="img"
              {...register("image", {
                onChange: (e) => {
                  handleImg(e)
                },
              })}
            />
            <AddAPhotoIcon
              sx={{
                position: "absolute",
                bottom: 10,
                color: "#1890FF",
              }}
            />
          </div>
        </label>
        {errors.image && (
          <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.image?.message}</p>
        )}
      </div>
      <form className="flex flex-col justify-center gap-10" onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            id="username"
            name="username"
            placeholder={userData?.user.username as string}
            rows={1}
            type="edit"
            error={!!errors.username}
            errors={errors.username}
            register={register}
          />

          <FormField
            id="email"
            name="email"
            placeholder={userData?.user.email as string}
            rows={1}
            type="edit"
            error={!!errors.email}
            errors={errors.email}
            register={register}
          />
          <FormField
            id="password"
            name="password"
            placeholder="password"
            rows={1}
            type={type ? "password" : "text"}
            error={!!errors.password}
            errors={errors.password}
            register={register}
          />
          {(watchPassord && type && (
            <FaRegEyeSlash
              className="text-[24px] hover:opacity-50 cursor-pointer absolute bottom-28 right-[16px] animate-display"
              onClick={() => setType((prev) => !prev)}
            />
          )) ||
            (watchPassord && (
              <FaRegEye
                className="text-[24px] hover:opacity-50 cursor-pointer absolute bottom-28 right-[16px] animate-display"
                onClick={() => setType((prev) => !prev)}
              />
            ))}
        </fieldset>
        <ColorButton type="submit">Save</ColorButton>
      </form>
    </Box>
  )
}
