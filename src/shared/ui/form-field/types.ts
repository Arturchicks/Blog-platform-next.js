import { ISignUp } from "features/sign-up-form/types/types"
import { TFieldValues } from "pages/createArticle/types/types"
import { FieldError, FieldErrors, UseFormRegister, UseFormRegisterReturn, UseFormTrigger } from "react-hook-form"

export interface IField {
  rows?: number
  placeholder: string
  id: string
  type?: string
  trigger?: UseFormTrigger<ISignUp>
  error: boolean
  name: keyof TFieldValues | keyof ISignUp
  errors: FieldError | undefined
  multiline?: boolean
  register: UseFormRegisterReturn
}
