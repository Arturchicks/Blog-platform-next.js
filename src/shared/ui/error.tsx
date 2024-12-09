import React from "react"
import { ErrorProps } from "shared/redux/types"

export const ErrorMessage: React.FC<ErrorProps> = ({ message, fontsize, px }: ErrorProps): JSX.Element => {
  return (
    <p className={`animate-display absolute text-red-500 font-Roboto text-[${fontsize}px] bottom-${px}`}>{message}</p>
  )
}
