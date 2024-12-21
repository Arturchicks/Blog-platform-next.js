import { SignUpType } from "@/app/sign-up/types";
import { RefObject } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export interface FormFieldType {
  rows?: number;
  id: string;
  defaultValue?: string;
  type?: string;
  ref?: RefObject<any>;
  isEmpty?: boolean;
  errors: FieldError | undefined;
  multiline?: boolean;
  register: UseFormRegister<any>;
  children?: React.ReactNode;
}
