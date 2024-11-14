import { TFieldValues } from "pages/createArticle/types/types"
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form"
import { FieldValues } from "react-hook-form"
export interface IField {
  rows: number
  placeholder: string
  id: string
  error: boolean
  name: keyof TFieldValues
  errors: FieldError | undefined
  multiline?: boolean
  register: UseFormRegister<TFieldValues>
}
