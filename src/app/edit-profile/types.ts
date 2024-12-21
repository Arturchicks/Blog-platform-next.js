import { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

export interface Error {
  username?: FieldError;
  email?: FieldError;
  password?: FieldError;
}
export interface EditProfileType {
  username: string | undefined;
  email: string | undefined;
  password?: string | undefined;
  image: string | ArrayBuffer | undefined;
  error?: {
    data: {
      errors: Error;
    };
  };
}
export type PasswordType = "password" | "text";

export interface SwitchTypes {
  password: boolean;
  type: PasswordType;
  setType: Dispatch<SetStateAction<PasswordType>>;
}

export interface EditProfileForm {
  username: string | undefined;
  email: string | undefined;
  password?: string | undefined;
}
