export interface ArticleFormType {
  title: string
  description: string
  body: string
  tags?: { tag: string }[]
  image?: string
}
