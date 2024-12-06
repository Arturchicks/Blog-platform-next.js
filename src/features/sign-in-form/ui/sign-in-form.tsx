import React, { useState } from "react"
import { ISignIn } from "../types/types"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../utils/schema"
import { Box } from "@mui/material"
import { ColorButton } from "shared/ui/signButton"
import { useGetCurrentUserQuery, useLoginUserMutation } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import { FormField } from "shared/ui/form-field/form-field"
import { Link } from "react-router-dom"

export const SignInForm: React.FC = (): JSX.Element => {
  const [login] = useLoginUserMutation({ fixedCacheKey: "login" })
  const [skip, setSkip] = useState<boolean>(true)
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery(null, { skip })
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
        setError("email", { message: "Invalid email or password" })
        setError("password", { message: "" })
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
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <Box className="flex flex-col gap-4">
          <FormField
            register={register}
            name="email"
            id="email"
            placeholder="email"
            error={!!errors.email}
            errors={errors.email}
          />
          <FormField
            register={register}
            name="password"
            id="password-input"
            placeholder="password"
            error={!!errors.password}
            errors={errors.password}
          />
        </Box>
        <ColorButton variant="contained" className="h-11" type="submit" onClick={() => setSkip(false)}>
          Login
        </ColorButton>
      </form>
      <Box className="text-[12px] flex gap-2 justify-center text-[#8C8C8C]">
        Do not have an account?
        <Link to={"/sign-up"} className="text-[#1890FF] underline hover:opacity-50">
          Sign Up
        </Link>
      </Box>
    </Box>
  )
}
