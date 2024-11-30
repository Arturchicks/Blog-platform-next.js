import { Box, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ErrorMessage } from "../error"
import { IField } from "./types"

export const FormField: React.FC<IField> = (props): JSX.Element => {
  const { defaultValue, register, isSubmitted, ...restProps } = props
  const [value, setValue] = useState<string | undefined>(defaultValue)

  return (
    <label htmlFor={props.id} className="relative">
      <Box sx={{ fontSize: "14px", textTransform: "capitalize" }}>{props.type !== "comment" && props.placeholder}</Box>
      <TextField
        size="small"
        className="w-[100%]"
        value={props.type !== "comment" ? value : defaultValue}
        {...restProps}
        {...props.register(props.name, {
          onChange: (e) => setValue(e.target.value),
        })}
      />
      {props.errors && <ErrorMessage type={props.type} message={props.errors.message} fontsize={12} />}
    </label>
  )
}
