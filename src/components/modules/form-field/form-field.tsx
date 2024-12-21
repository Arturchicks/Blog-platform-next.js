"use client";
import { Box, TextField } from "@mui/material";
import React, { JSX } from "react";
import { FormFieldType } from "./types";
import ErrorMessage from "../error-message/error-message";

const FormField: React.FC<FormFieldType> = ({
  register,
  children,
  type,
  errors,
  id,
  ...rest
}: FormFieldType): JSX.Element => {
  return (
    <React.Fragment>
      <label htmlFor={id} className="relative animate-display">
        <Box
          sx={{
            fontSize: "14px",
            textTransform: "capitalize",
            color: "text.primary",
          }}
        >
          {id}
        </Box>
        <TextField
          id={id}
          size="small"
          placeholder={id}
          type={type}
          error={Boolean(errors)}
          {...rest}
          sx={{ width: "100%" }}
          {...register(id)}
        />
        {errors && <ErrorMessage message={errors.message} fontsize={12} />}
      </label>
      {children}
    </React.Fragment>
  );
};
export default FormField;
