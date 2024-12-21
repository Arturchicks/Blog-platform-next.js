"use client"
import React, { useEffect, useRef, useState } from "react"
import { ColorButton } from "@/components/UI/color-button"
import { Policy } from "@/components/modules/policy/policy"
import Box from "@mui/material/Box"
import FormField from "@/components/modules/form-field/form-field"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./utils/shema"
import { useForm } from "react-hook-form"
import { SignUpType } from "./types"
import { useCreateAccountMutation, useLoginUserMutation } from "@/store/api"
import { setLogIn } from "@/store/slice"
import { useDispatch } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { setErrors } from "@/utils/helpers/set-error"

const SignUpForm: React.FC = () => {
  const [mount, setMount] = useState<boolean>(false)
  const [terms, setTerms] = useState<boolean>(false)
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [createAccount] = useCreateAccountMutation({
    fixedCacheKey: "create",
  })
  const [login] = useLoginUserMutation({ fixedCacheKey: "login" })
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<SignUpType>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(async (data) => {
    const { repeat, ...user } = data
    if (terms) {
      try {
        const { error } = await createAccount({ user })
        if (error) setErrors<SignUpType>(error, "is already taken", setError)
        else {
          const { data } = await login({ user })
          dispatch(setLogIn(data?.user.token))
        }
      } catch (e) {
        console.log(e)
      }
    }
  })

  useEffect(() => {
    setMount(true)
    return () => setMount(false)
  }, [])

  return (
    <CSSTransition
      in={mount}
      nodeRef={ref}
      timeout={400}
      classNames="display"
      unmountOnExit
    >
      <Box
        ref={ref}
        className="flex flex-col xs:w-[90vw] sx:w-[385px] rounded p-8 gap-6 mx-auto mt-5"
        sx={{ bgcolor: "primary.main", color: "secondary.main" }}
      >
        <span className="text-center text-[20px]">Create new account</span>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <Box className="flex flex-col gap-5">
            <FormField
              register={register}
              id="username"
              errors={errors.username}
            />
            <FormField register={register} id="email" errors={errors.email} />
            <FormField
              register={register}
              id="password"
              errors={errors.password}
            />
            <FormField
              register={register}
              id="repeat"
              type="password"
              errors={errors.repeat}
            />
          </Box>
          <Policy agreeTerms={setTerms} terms={terms} submitted={isSubmitted} />
          <ColorButton variant="contained" className="h-11" type="submit">
            Create
          </ColorButton>
        </form>
        <Box className="text-[12px] flex gap-2 justify-center text-[#8C8C8C]">
          Already have an account?
          <Link
            href="/sign-in"
            className="text-[#1890FF] underline hover:opacity-50"
          >
            Sign In
          </Link>
        </Box>
      </Box>
    </CSSTransition>
  )
}
export default SignUpForm
