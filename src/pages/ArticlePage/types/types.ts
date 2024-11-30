export interface IComment {
  comment: {
    body: string
  }
}
export interface CommentForm {
  body?: string | undefined
  image?: string | undefined
  imageHash?: string | undefined
}
