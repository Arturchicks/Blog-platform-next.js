import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot"
import { BooleanArraySupportOption } from "prettier"
import { Dispatch, SetStateAction } from "react"

export interface ISignUp {
  username: string
  email: string
  password: string
  repeat: string
}

export interface IPolicy {
  agreeTerms: Dispatch<SetStateAction<boolean>>
  terms: boolean | string
  submitted: boolean
}
export interface ErrorData {
  data: {
    errors: {
      username?: string
      email?: string
      password?: string
    }
  }
}
export interface ServerError extends Error {
  error?: ErrorData
}
export type ErrorKey = "repeat" | "username" | "email" | "password" | `root.${string}` | "root"
