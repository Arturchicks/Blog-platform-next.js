import React, { useEffect, useState } from "react"
import { IsAny, useForm } from "react-hook-form"
import { schema } from "./utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorData, ErrorKey, ISignUp, ServerError } from "./types/types"
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
  const [skip, setSkip] = useState<boolean>(true)
  const [serverError, setServerError] = useState<ErrorData["data"]["errors"] | null>(null)
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
          setServerError(createAccountError.data.errors)
        } else await login({ user: { email, password } })
      } catch (e) {
        console.log(e)
      }
    } else {
      setTerms(false)
    }
  })
  useEffect(() => {
    for (const key in serverError) {
      setError(key as ErrorKey, { message: `${key} is already taken` })
    }
  }, [serverError])

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
      <span className="text-center text-[20px]">Create new account</span>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            register={register}
            name="username"
            placeholder="Username"
            id="username"
            error={!!errors.username || !!serverError?.username}
            errors={errors.username}
          />
          <label htmlFor="email-input" className="flex flex-col relative">
            <FormField
              register={register}
              placeholder="Email"
              name="email"
              id="email-input"
              error={!!errors.email || !!serverError?.email}
              errors={errors.email}
            />
          </label>
          <label htmlFor="password-input" className="flex flex-col relative">
            <FormField
              register={register}
              placeholder="Password"
              id="password-input"
              name="password"
              error={!!errors.password || !!serverError?.password}
              errors={errors.password}
            />
          </label>
          <label htmlFor="repeat-input" className="flex flex-col relative">
            <FormField
              register={register}
              placeholder="Repeat password"
              id="repeat-input"
              type="password"
              name="repeat"
              error={!!errors.repeat}
              errors={errors.repeat}
            />
          </label>
        </div>
        <Policy agreeTerms={setTerms} terms={terms} submitted={isSubmitted} />
        <ColorButton variant="contained" className="h-11" type="submit" onClick={() => setSkip(false)}>
          Create
        </ColorButton>
      </form>
    </Box>
  )
}
