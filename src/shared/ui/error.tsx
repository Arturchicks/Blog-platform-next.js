import clsx from "clsx"
import React from "react"
type ErrorProps = {
  message?: string | undefined | null
  fontsize?: number
  type?: string
}
export const ErrorMessage: React.FC<ErrorProps> = ({ message, fontsize, type }: ErrorProps): JSX.Element => {
  return (
    <p
      className={clsx(
        type === "comment" ? "bottom-[24px]" : type === "edit" ? null : "bottom-[-20px]",
        `animate-display absolute text-red-500 font-Roboto text-[${fontsize}px]`
      )}
    >
      {message}
    </p>
  )
}
