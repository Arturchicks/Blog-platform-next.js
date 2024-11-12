import { UseFormUnregister, UseFormRegister } from "react-hook-form"

export interface Tag {
  key: string
  delete: (key: string, index: number) => void
  id: string
  index: number
  error: boolean
  register: UseFormRegister<TFieldValues>
  unregister: UseFormUnregister<TFieldValues>
}

export interface TFieldValues {
  title: string
  description: string
  body: string
  tagList?: string[]
}
