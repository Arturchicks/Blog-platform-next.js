import { Dispatch, SetStateAction } from "react"

export const debounce = (fn: Dispatch<SetStateAction<string>>, delay: number) => {
  let timer: NodeJS.Timeout | undefined
  return (args: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      return fn(args)
    }, delay)
  }
}
