import React, { useEffect, useState } from "react"
import { ISignIn } from "../types/sign-in-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../utils/schema"
import { Box, TextField } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { useGetCurrentUserQuery, useLoginUserMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import { FormField } from "shared/ui/form-field/form-field"

export const SignInForm: React.FC = (): JSX.Element => {
  const [login] = useLoginUserMutation({ fixedCacheKey: "login" })
  const [skip, setSkip] = useState<boolean>(true)
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery(null, { skip })
  const [serverError, setServerError] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
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
          navigate("/")
        } catch (e) {
          console.log(e)
        }
      } else if (error) {
        setServerError(true)
      }
    } catch (e) {
      console.log(e)
    }
  })
  useEffect(() => {
    if (serverError) {
      setError("email", { message: "Invalid email or password" })
    }
  }, [serverError])
  return (
    <Box
      className="animate-display flex flex-col xs:w-[286px] sm:w-[385px] rounded-lg p-8 gap-4 self-center"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <span className="text-center text-[20px]">Sign In</span>
      <form className="flex flex-col gap-7" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col relative">
            <FormField
              register={register}
              name="email"
              id="email"
              placeholder="email"
              error={!!errors.email || !!serverError}
              errors={errors.email}
            />
          </label>
          <label htmlFor="password-input" className="flex flex-col relative">
            <FormField
              register={register}
              name="password"
              id="password-input"
              placeholder="password"
              error={!!errors.password || !!serverError}
              errors={errors.password}
            />
          </label>
        </div>
        <ColorButton variant="contained" className="h-11" type="submit" onClick={() => setSkip(false)}>
          Login
        </ColorButton>
      </form>
    </Box>
  )
}
