"use client"

import React, { JSX, useState } from "react"
import { Box, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import { useEditProfileMutation, useGetCurrentUserQuery } from "@/store/api"
import { ColorButton } from "@/components/UI/color-button"
import FormField from "@/components/modules/form-field/form-field"
import { SwitchEye } from "@/components/UI/eye"
import { VisuallyHiddenInput } from "@/components/UI/visibility-hidden-input"
import { schema } from "./utils/schema"
import Image from "next/image"
import avatar from "@/utils/images/avatar.svg"
import { useRouter } from "next/navigation"
import { handleImg } from "@/utils/helpers/image-compress"
import { EditProfileForm, EditProfileType, PasswordType } from "./types"
import { setErrors } from "@/utils/helpers/set-error"

const EditProfile = (): JSX.Element => {
  const [image, setImage] = useState<string | undefined | ArrayBuffer>()
  const [type, setType] = useState<PasswordType>("password")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<EditProfileForm>(schema),
  })
  const isPass = Boolean(watch("password"))
  const [edit, { isError }] = useEditProfileMutation()
  const { data: userData } = useGetCurrentUserQuery(null, { skip: isError })
  const onSubmit = handleSubmit(async ({ password, ...data }) => {
    const formData = Object.values(data).filter((e) => e)
    if (formData.length || image) {
      if (userData) {
        const email = data.email || userData.user.email
        const username = data.username || userData.user.username
        const user: EditProfileType = { email, username, image }
        if (password) user.password = password
        const { error } = await edit({ user })
        error
          ? setErrors<EditProfileType>(error, "is already taken", setError)
          : router.push("/")
      }
    }
  })
  return userData ? (
    <Box
      className="w-80 rounded p-12 pt-7 flex flex-col mx-auto animate-display relative gap-5 mt-12"
      sx={{
        bgcolor: "primary.main",
        boxShadow: `0px 0px 4px`,
        color: "primary.200",
      }}
    >
      <div className="flex self-center">
        <label
          htmlFor="img"
          className="relative cursor-pointer hover:opacity-50 transition-opacity duration-200"
        >
          <div>
            <Image
              src={image || userData.user.image || avatar}
              alt="avatar"
              width={150}
              height={150}
              className="opacity-60 rounded-[50%] border-[2px] border-solid border-[#1890FF] w-[150px] h-[150px]"
            />
            <VisuallyHiddenInput
              type="file"
              id="img"
              onChange={(e) => handleImg(e).then((url) => setImage(url))}
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
      </div>
      <form className="flex flex-col justify-center gap-10" onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            id="username"
            errors={errors.username}
            register={register}
          />
          <FormField id="email" errors={errors.email} register={register} />
          <FormField
            id="password"
            errors={errors.password}
            register={register}
            type={type}
          />
          <SwitchEye password={isPass} setType={setType} type={type} />
        </fieldset>
        <ColorButton type="submit">Save</ColorButton>
      </form>
    </Box>
  ) : (
    <CircularProgress />
  )
}
export default EditProfile
