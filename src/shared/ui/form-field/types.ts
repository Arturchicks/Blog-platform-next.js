import { MutableRefObject, Ref, RefObject } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

type NewType = string

export interface IField {
  rows?: number
  placeholder: string
  id: string
  defaultValue?: string
  type?: string
  error: boolean
  ref?: RefObject<any>
  name: NewType
  isEmpty?: boolean
  errors: FieldError | undefined
  multiline?: boolean
  register: UseFormRegister<any>
  children?: React.ReactNode
}
