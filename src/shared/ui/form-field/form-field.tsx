import { Box, TextField } from "@mui/material"
import React from "react"
import { ErrorMessage } from "../error"
import { IField } from "./types"

export const FormField: React.FC<IField> = (props): JSX.Element => {
  return (
    <label htmlFor={props.id} className="relative">
      <Box sx={{ marginBottom: "4px", fontSize: "14px" }}>{props.placeholder}</Box>
      <TextField
        rows={props.rows}
        placeholder={props.placeholder}
        multiline={props.multiline}
        id={props.id}
        type={props.type}
        size="small"
        className="w-[100%]"
        error={props.error}
        autoComplete="off"
        {...props.register}
      />
      {props.errors && <ErrorMessage message={props.errors.message} fontsize={12} />}
    </label>
  )
}
