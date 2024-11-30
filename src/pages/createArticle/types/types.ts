import { SrvRecord } from "dns"
import { UseFieldArrayRemove, UseFormRegisterReturn, UseFormUnregister } from "react-hook-form"

export interface Tag {
  key: string
  id: string
  index: number
  register?: UseFormRegisterReturn
  error: boolean
  message: string | undefined
  remove: (index: number) => void
}
export interface Fields {
  title: string
  description: string
  body: string
  tagList?: { tag: string }[]
}
