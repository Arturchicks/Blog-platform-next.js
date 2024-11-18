import { IArticle } from "../../entities/article"

export interface QueryArticles {
  articles: Array<IArticle>
  articlesCount: number
}
export interface QueryArgs {
  offset: number
  tag: string | undefined
}
export interface MutationAccount {
  user: {
    username: string
    email?: string
    token: string
  }
}
export interface User {
  user: { username: string; email: string; password?: string }
}
export interface MutationArticle {
  slug: string
  title: string
  description: string
  body: string
  tags: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

export interface Article {
  article: { title: string; description: string; body: string; tagList?: string[] }
}

export interface State {
  onchanged: boolean
}

export interface Params {
  slug: string
  method: string | undefined
}

export interface MutationLike {
  article: MutationArticle
}
export interface QueryUser {
  user: { username: string; email: string; token: string; image?: string }
}

export interface isAvatar {
  slug: string
}
