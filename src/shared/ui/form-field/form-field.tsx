import { Box, TextField } from "@mui/material"
import React, { memo, useState } from "react"
import { ErrorMessage } from "../error"
import { IField } from "./types"

export const FormField: React.FC<IField> = memo((props: IField): JSX.Element => {
  const { defaultValue, register, isSubmitted, type, children, ...restProps } = props
  const [value, setValue] = useState<string | undefined>(defaultValue)
  return (
    <>
      <label htmlFor={props.id} className="relative animate-display">
        <Box sx={{ fontSize: "14px", textTransform: "capitalize", color: "text.primary" }}>
          {type !== "comment" && type !== "bio" && props.name}
        </Box>
        <TextField
          size="small"
          type={props.type}
          sx={{ width: "100%" }}
          value={type !== "comment" ? value : null}
          {...restProps}
          {...register(props.name, {
            onChange: (e) => setValue(e.target.value),
          })}
        />
        {props.errors && <ErrorMessage type={type} message={props.errors.message} fontsize={12} />}
      </label>
      {children}
    </>
  )
})
FormField.displayName = "FormField"
