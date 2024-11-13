import { BooleanArraySupportOption } from "prettier"
import { Dispatch, SetStateAction } from "react"

export interface ISignUp {
  username: string
  email: string
  password: string
  repeat: string
}

export interface IPolicy {
  agreeTerms: Dispatch<SetStateAction<boolean | string>>
  terms: boolean | string
}
