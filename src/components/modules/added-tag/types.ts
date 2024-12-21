import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFieldArrayRemove,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface AddedTagType {
  index: number;
  register?: UseFormRegisterReturn;
  error:
    | Merge<
        FieldError,
        (Merge<FieldError, FieldErrorsImpl<{ tag: string }>> | undefined)[]
      >
    | undefined;
  remove: UseFieldArrayRemove;
}
