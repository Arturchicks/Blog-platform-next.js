import { UseFieldArrayRemove, UseFormRegisterReturn, UseFormUnregister } from "react-hook-form"

export interface Tag {
  key: string
  id: string
  index: number
  register?: UseFormRegisterReturn
  error: boolean
  remove: UseFieldArrayRemove | ((index: number) => void)
}
export interface Fields {
  title: string
  description: string
  body: string
  tagList?: { tag: string }[]
}
