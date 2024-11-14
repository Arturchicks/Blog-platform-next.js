import clsx from "clsx"
import React from "react"
type ErrorProps = {
  message: string | undefined | null
  fontsize?: number
}
export const ErrorMessage: React.FC<ErrorProps> = ({ message, fontsize }: ErrorProps): JSX.Element => {
  return (
    <p className={clsx(`animate-display absolute bottom-[-20px] text-red-500 font-Roboto text-[${fontsize}px]`)}>
      {message}
    </p>
  )
}
