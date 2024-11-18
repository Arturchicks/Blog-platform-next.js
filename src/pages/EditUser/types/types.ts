export interface Error {
  username?: string
  email?: string
  password?: string
}
export interface IEditUser {
  username: string
  email: string
  password?: string
  image: string | ArrayBuffer | undefined
  error?: {
    data: {
      errors: Error
    }
  }
}
