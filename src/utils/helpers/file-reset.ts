import { ChangeEvent } from "react";

export const fileReset = ({ target }: ChangeEvent<HTMLInputElement>): void => {
  target.value = target.defaultValue;
};
