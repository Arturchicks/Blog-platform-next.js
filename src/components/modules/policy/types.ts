import { Dispatch, SetStateAction } from "react";

export interface PolicyType {
  agreeTerms: Dispatch<SetStateAction<boolean>>;
  terms: boolean | string;
  submitted: boolean;
}
