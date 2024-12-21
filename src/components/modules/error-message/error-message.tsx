import { JSX } from "react";
import { ErrorPropsType } from "./types";

const ErrorMessage: React.FC<ErrorPropsType> = ({
  message,
  fontsize,
  px,
}: ErrorPropsType): JSX.Element => {
  return (
    <p
      className={`animate-display absolute text-red-500 font-Roboto text-[${fontsize}px] bottom-${px} right-0`}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
