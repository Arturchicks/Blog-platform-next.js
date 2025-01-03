import { IArticle } from "../../entities/article"

export interface QueryArticles {
  articles: Array<IArticle>
  articlesCount: number
}
export interface QueryArticle {
  article: {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: Author
  }
}
export interface QueryArgs {
  offset?: number
  tag?: string | undefined
  username?: string | undefined
}
export interface MutationAccount {
  data: {
    user?: {
      username: string
      email?: string
      token: string
    }
    error?: {
      errors: {
        username?: string
        email?: string
        password?: string
      }
    }
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
  tagList: { tag: string }[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface Author {
  username: string
  image: string | undefined
  following: boolean
  bio?: string
}
export interface Profile {
  profile: Author
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
export interface CommentType {
  id: string
  body: string
  createdAt: string
  author: Author
  username: string | undefined
}
export interface CommentsType {
  comments: Comment[]
}
export interface ErrorProps {
  message?: string | undefined | null
  fontsize?: number
  px?: number | string
}
