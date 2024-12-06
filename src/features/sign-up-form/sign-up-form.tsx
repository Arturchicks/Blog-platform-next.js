import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorData, ErrorKey, ISignUp, ServerError } from "./types/types"
import { ColorButton } from "shared/ui/signButton"
import { Policy } from "./ui/policy"
import { useCreateAccountMutation, useLoginUserMutation, useGetCurrentUserQuery } from "shared/redux/api"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { FormField } from "shared/ui/form-field/form-field"
import { MutationAccount } from "shared/redux/types"

export const SignUpForm: React.FC = () => {
  const [createAccount] = useCreateAccountMutation({
    fixedCacheKey: "test",
  })
  const [login, { data: userData, isSuccess: isLoginSuccess }] = useLoginUserMutation({ fixedCacheKey: "login" })
  const [skip, setSkip] = useState<boolean>(true)
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery(null, { skip })
  const navigate = useNavigate()
  const [terms, setTerms] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
  } = useForm<ISignUp>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data
    if (terms) {
      try {
        const { error: createAccountError } = (await createAccount({
          user: { username, email, password },
        })) as ServerError

        if (createAccountError) {
          for (const key in createAccountError.data.errors) {
            console.log(key)
            setError(key as ErrorKey, { message: `${key} is already taken` })
          }
        } else await login({ user: { email, password } })
      } catch (e) {
        console.log(e)
      }
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
      className="animate-display flex flex-col xs:w-[90vw] sx:w-[385px]  rounded-[5px] p-8  gap-6 self-center"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <span className="text-center text-[20px]">Create new account</span>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <Box className="flex flex-col gap-5">
          <FormField
            register={register}
            name="username"
            placeholder="Username"
            id="username"
            error={!!errors.username}
            errors={errors.username}
          />
          <FormField
            register={register}
            placeholder="Email"
            name="email"
            id="email-input"
            error={!!errors.email}
            errors={errors.email}
          />
          <FormField
            register={register}
            placeholder="Password"
            id="password-input"
            name="password"
            error={!!errors.password}
            errors={errors.password}
          />
          <FormField
            register={register}
            placeholder="Repeat password"
            id="repeat-input"
            type="password"
            name="repeat"
            error={!!errors.repeat}
            errors={errors.repeat}
          />
        </Box>
        <Policy agreeTerms={setTerms} terms={terms} submitted={isSubmitted} />
        <ColorButton variant="contained" className="h-11" type="submit" onClick={() => setSkip(false)}>
          Create
        </ColorButton>
      </form>
      <Box className="text-[12px] flex gap-2 justify-center text-[#8C8C8C]">
        Already have an account?
        <Link to={"/sign-in"} className="text-[#1890FF] underline hover:opacity-50">
          Sign In
        </Link>
      </Box>
    </Box>
  )
}
