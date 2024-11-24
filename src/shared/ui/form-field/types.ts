import { FieldError, UseFormRegister, UseFormRegisterReturn, UseFormTrigger } from "react-hook-form"

export interface IField {
  rows?: number
  placeholder: string
  id: string
  value?: string
  type?: string
  error: boolean
  name: string
  errors: FieldError | undefined
  multiline?: boolean
  register: UseFormRegisterReturn
}
