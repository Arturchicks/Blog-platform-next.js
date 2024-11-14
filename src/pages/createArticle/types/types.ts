export interface Tag {
  key: string
  delete: (index: number) => void
  id: string
  index: number
  error: boolean
}

export interface TFieldValues {
  title: string
  description: string
  body: string
}
export interface Tags {
  tags: { tag: string }[]
}
