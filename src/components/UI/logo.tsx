"use client";
import { IoPlanetSharp } from "react-icons/io5";

const Logo = () => {
  return (
    <p className="flex text-[20px] whitespace-nowrap align-middle text-[#00a5ff] hover:opacity-70 transition-opacity duration-200">
      RealW{<IoPlanetSharp className="self-center" />}rld Blog
    </p>
  );
};
export default Logo;
