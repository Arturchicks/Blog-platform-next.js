import React, { useEffect, useState } from "react"
import { ISignIn } from "../types/sign-in-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../utils/schema"
import { Box, TextField } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { useGetCurrentUserQuery, useLoginUserMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"

export const SignInForm: React.FC = (): JSX.Element => {
  const [login, { data: userData, isSuccess: isLoginSuccess, error }] = useLoginUserMutation({ fixedCacheKey: "login" })
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery(null)
  const [serverError, setServerError] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email, password } = data
      await login({ user: { email, password } })
    } catch (e) {
      console.log(e)
    }
  })
  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.setItem("token", userData.user.token)
      try {
        refetchCurrentUser()
      } catch (e) {
        console.log(e)
      }
      navigate("/")
    } else if (error) setServerError(true)
  }, [refetchCurrentUser, navigate, isLoginSuccess, error])
  return (
    <Box
      className="animate-display flex flex-col xs:w-[286px] sm:w-[385px] rounded-lg p-8 gap-6 self-center"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <span className="text-center">Sign In</span>
      <form className="flex flex-col gap-7" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="flex flex-col relative h-[85px]">
            Email adress
            <TextField
              {...register("email")}
              placeholder="email"
              name="email"
              id="email"
              size="small"
              error={!!errors.email || !!serverError}
            />
            {errors.email || error ? (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">
                {errors.email ? errors.email?.message : serverError ? "Invalid email or password" : null}
              </p>
            ) : null}
          </label>
          <label htmlFor="password-input" className="flex flex-col relative h-[85px]">
            Password
            <TextField
              {...register("password")}
              placeholder="password"
              size="small"
              name="password"
              id="password-input"
              error={!!errors.password || !!serverError}
            />
            {errors.password ? (
              <p className="animate-display text-red-500 font-Roboto text-[12px]">{errors.password.message}</p>
            ) : null}
          </label>
        </div>
        <ColorButton variant="contained" className="h-11" type="submit">
          Login
        </ColorButton>
      </form>
    </Box>
  )
}
