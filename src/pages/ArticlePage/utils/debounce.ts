import { CommentType } from "shared/redux/types"

export const debounce = (fn: (args: CommentType) => void, delay: number) => {
  let timer: NodeJS.Timeout | undefined
  return (args: CommentType) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(args)
    }, delay)
  }
}
