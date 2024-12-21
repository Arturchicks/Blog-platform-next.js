import { ErrorStack } from "@/app/sign-up/types";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export const setErrors = <T extends FieldValues>(
  error: FetchBaseQueryError | SerializedError,
  message: string,
  setError: UseFormSetError<T>
) => {
  const { data } = error as ErrorStack;
  for (const key in data.errors) {
    setError(key as Path<T>, {
      message: `${key} ${message}`,
    });
  }
};
