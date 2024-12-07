import { FieldError, UseFormRegister } from "react-hook-form"

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
  children?: React.ReactNode
}
