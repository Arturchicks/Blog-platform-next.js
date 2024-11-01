import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { ISignUp } from "./types/types"
import { TextField } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { Policy } from "./ui/policy"
import { useCreateAccountMutation, useLoginUserMutation, useGetCurrentUserQuery } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
export const SignUpForm: React.FC = () => {
  const [createAccount] = useCreateAccountMutation({
    fixedCacheKey: "test",
  })
  const [login, { data: userData, isSuccess: isLoginSuccess, error }] = useLoginUserMutation({ fixedCacheKey: "login" })
  const { data: user, refetch: refetchCurrentUser, isSuccess: isUserSuccess } = useGetCurrentUserQuery("")
  const navigate = useNavigate()
  console.log(error)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data
    try {
      await createAccount({ user: { username, email, password } })
      await login({ user: { email, password } })
    } catch (e) {
      console.log(e)
    }
  })

  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.setItem("token", userData?.user.token)
      refetchCurrentUser().then((value) => value)
      navigate("/")
    }
  }, [isLoginSuccess])
  return (
    <div className="animate-display flex flex-col w-[385px]  rounded-lg bg-white p-8 pb-16 gap-6 self-center">
      <span className="text-center">Create new account</span>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username-input" className="flex flex-col relative h-[85px]">
            Username
            <TextField
              {...register("username")}
              placeholder="username"
              name="username"
              id="username-input"
              autoComplete="true"
              size="small"
              error={!!errors.username}
            />
            {errors.username ? (
              <p className="animate-display absolute bottom-1  text-red-500 font-Roboto text-xs">
                {errors.username.message}
              </p>
            ) : null}
          </label>
          <label htmlFor="email-input" className="flex flex-col relative h-[85px]">
            Email adress
            <TextField
              {...register("email")}
              placeholder="email"
              name="email"
              size="small"
              autoComplete="true"
              id="email-input"
              error={!!errors.email}
            />
            {errors.email ? (
              <p className="animate-display absolute bottom-1  text-red-500 font-Roboto  text-xs">
                {errors.email.message}
              </p>
            ) : null}
          </label>
          <label htmlFor="password-input" className="flex flex-col relative h-[85px]">
            Password
            <TextField
              {...register("password")}
              placeholder="password"
              size="small"
              id="password-input"
              autoComplete="true"
              name="password"
              error={!!errors.password}
            />
            {errors.password ? (
              <p className="animate-display absolute bottom-1 text-red-500 font-Roboto  text-xs">
                {errors.password.message}
              </p>
            ) : null}
          </label>
          <label htmlFor="repeat-input" className="flex flex-col relative h-[85px]">
            Repeat password
            <TextField
              {...register("repeat")}
              placeholder="repeat password"
              size="small"
              id="repeat-input"
              type="password"
              autoComplete="true"
              name="repeat"
              error={!!errors.repeat}
            />
            {errors.password ? (
              <p className="animate-display absolute bottom-1 text-red-500 font-Roboto  text-xs">
                {errors.repeat?.message}
              </p>
            ) : null}
          </label>
          <Policy />
        </div>
        <ColorButton variant="contained" className="h-11" type="submit">
          Create
        </ColorButton>
      </form>
    </div>
  )
}
