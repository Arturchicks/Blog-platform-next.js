import React from "react"
type ErrorProps = {
  message: string | undefined
}
export const ErrorMessage: React.FC<ErrorProps> = ({ message }: ErrorProps): JSX.Element => {
  return <p className="animate-display absolute bottom-[-20px] text-red-500 font-Roboto text-xs">{message}</p>
}
