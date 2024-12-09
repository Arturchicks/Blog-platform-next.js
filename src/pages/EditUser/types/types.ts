import { Dispatch, LegacyRef, SetStateAction } from "react"
import { FieldError } from "react-hook-form"

export interface Error {
  username?: FieldError
  email?: FieldError
  password?: FieldError
}
export interface IEditUser {
  username: string
  email: string
  password?: string
  image: string | ArrayBuffer | undefined
  error?: {
    data: {
      errors: Error
    }
  }
}
export interface SwitchTypes {
  password: boolean
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}
