export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}
type onTagClick = (arg: string) => void
export interface IArticle {
  className: string
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: false
  favoritesCount: number
  author: Author
  onTagCLick: onTagClick
}
