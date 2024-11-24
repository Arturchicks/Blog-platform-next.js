import React, { useState } from "react"
import { ISignIn } from "../types/sign-in-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../utils/schema"
import { Box, TextField } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { useGetCurrentUserQuery, useLoginUserMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "shared/ui/error"

export const SignInForm: React.FC = (): JSX.Element => {
  const [login] = useLoginUserMutation({ fixedCacheKey: "login" })
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
      const { data: userData, error } = await login({ user: { email, password } })
      if (userData) {
        localStorage.setItem("token", userData.user.token)
        try {
          refetchCurrentUser()
        } catch (e) {
          console.log(e)
        }
        navigate("/")
      } else if (error) {
        setServerError(true)
      }
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <Box
      className="animate-display flex flex-col xs:w-[286px] sm:w-[385px] rounded-lg p-8 gap-4 self-center"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <span className="text-center text-[20px]">Sign In</span>
      <form className="flex flex-col gap-7" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col relative">
            Email adress
            <TextField
              {...register("email")}
              placeholder="email"
              name="email"
              id="email"
              size="small"
              error={!!errors.email || !!serverError}
            />
            {errors.email || serverError ? (
              <ErrorMessage
                message={errors.email ? errors.email?.message : serverError ? "Invalid email or password" : null}
                fontsize={12}
              />
            ) : null}
          </label>
          <label htmlFor="password-input" className="flex flex-col relative">
            Password
            <TextField
              {...register("password")}
              placeholder="password"
              size="small"
              name="password"
              id="password-input"
              error={!!errors.password || !!serverError}
            />
            {errors.password && <ErrorMessage message={errors.password.message} fontsize={12} />}
          </label>
        </div>
        <ColorButton variant="contained" className="h-11" type="submit">
          Login
        </ColorButton>
      </form>
    </Box>
  )
}
