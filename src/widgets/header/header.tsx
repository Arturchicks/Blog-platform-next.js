import React from "react";
import SignButton from "../../shared/ui/signButton";
const Header: React.FC = () => {
  return (
    <div className="flex h-[80px] items-center justify-between bg-white p-4">
      <div className="w-[150px] text-black">
        <span>RealWorld Blog</span>
      </div>
      <div className="flex gap-4">
        <SignButton variant="Sign In" className="font-sans text-black  hover:opacity-80" />
        <SignButton
          variant="Sign Up"
          className="w-[109px] h-[51px] border-solid border-[1px] border-lime-600 rounded text-lime-600 hover:opacity-75"
        />
      </div>
    </div>
  );
};
export default Header;
