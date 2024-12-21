import {
  FieldArrayWithId,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { CreateArticleType } from "@/app/create-article/types";

export interface AddedTagListType {
  remove: UseFieldArrayRemove;
  errors:
    | Merge<
        FieldError,
        (Merge<FieldError, FieldErrorsImpl<{ tag: string }>> | undefined)[]
      >
    | undefined;
  register: UseFormRegister<CreateArticleType>;
  fields: FieldArrayWithId<CreateArticleType, "tags", "id">[];
}
