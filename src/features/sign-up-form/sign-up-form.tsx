import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { ISignUp } from "./types/types"
import { ColorButton } from "shared/ui/signButton"
import { Policy } from "./ui/policy"
import { useCreateAccountMutation, useLoginUserMutation, useGetCurrentUserQuery } from "shared/redux/api"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { FormField } from "shared/ui/form-field/form-field"

export const SignUpForm: React.FC = () => {
  const [createAccount] = useCreateAccountMutation({
    fixedCacheKey: "test",
  })
  const [login, { data: userData, isSuccess: isLoginSuccess, error }] = useLoginUserMutation({ fixedCacheKey: "login" })
  const { data: user, refetch: refetchCurrentUser, isSuccess: isUserSuccess } = useGetCurrentUserQuery(null)
  const navigate = useNavigate()
  const [terms, setTerms] = useState<boolean | string>("first")
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ISignUp>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data
    if (typeof terms !== "string" && terms) {
      try {
        await createAccount({ user: { username, email, password } })
        await login({ user: { email, password } })
      } catch (e) {
        console.log(e)
      }
    } else {
      setTerms(false)
    }
  })

  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.setItem("token", userData?.user.token)
      refetchCurrentUser()
      navigate("/")
    }
  }, [isLoginSuccess])

  return (
    <Box
      className="animate-display flex flex-col xs:w-[90vw] sx:w-[385px]  rounded-[5px] p-8 pb-16 gap-6 self-center"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <span className="text-center">Create new account</span>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <FormField
            register={register("username")}
            name="username"
            placeholder="Username"
            id="username"
            error={!!errors.username}
            errors={errors.username}
          />
          <label htmlFor="email-input" className="flex flex-col relative">
            <FormField
              register={register("email")}
              placeholder="Email"
              name="email"
              id="email-input"
              error={!!errors.email}
              errors={errors.email}
            />
          </label>
          <label htmlFor="password-input" className="flex flex-col relative">
            <FormField
              register={register("password")}
              placeholder="Password"
              trigger={trigger}
              id="password-input"
              name="password"
              error={!!errors.password}
              errors={errors.password}
            />
          </label>
          <label htmlFor="repeat-input" className="flex flex-col relative">
            <FormField
              register={register("repeat")}
              placeholder="Repeat password"
              id="repeat-input"
              type="password"
              name="repeat"
              error={!!errors.repeat}
              errors={errors.repeat}
            />
          </label>
        </div>
        <Policy agreeTerms={setTerms} terms={terms} />
        <ColorButton variant="contained" className="h-11" type="submit">
          Create
        </ColorButton>
      </form>
    </Box>
  )
}
