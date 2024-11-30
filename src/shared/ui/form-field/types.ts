import { ISignUp } from "features/sign-up-form/types/types"
import { Fields } from "pages/createArticle/types/types"
import { FieldError, UseFormRegister, UseFormRegisterReturn } from "react-hook-form"

export interface IField {
  rows?: number
  placeholder: string
  id: string
  defaultValue?: string
  type?: string
  error: boolean
  name: string
  isSubmitted?: boolean
  errors: FieldError | undefined
  multiline?: boolean
  register: UseFormRegister<any>
}
