import React, { ReactElement } from "react";
interface IButton {
  variant: "Sign In" | "Sign Up";
  className?: string;
  children?: ReactElement;
}
const SignButton: React.FC<IButton> = ({ variant, className }): ReactElement => {
  return (
    <>
      {variant === "Sign In" && <button className={className}>Sign In</button>}
      {variant === "Sign Up" && <button className={className}>Sign Up</button>}
    </>
  );
};
export default SignButton;
