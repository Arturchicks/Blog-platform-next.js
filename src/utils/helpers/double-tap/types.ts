import { Params, QueryArticle } from "@/store/types";
import {
  BaseQueryFn,
  TypedMutationTrigger,
} from "@reduxjs/toolkit/query/react";
import { Dispatch, SetStateAction } from "react";
type T = {
  setAnimation: Dispatch<SetStateAction<string>>;
  setMethod: Dispatch<SetStateAction<string>>;
  slug: string;
  method: string;
  setLike: TypedMutationTrigger<QueryArticle, Params, BaseQueryFn>;
};

export type DoubleTaptype = (args: T) => () => void;
