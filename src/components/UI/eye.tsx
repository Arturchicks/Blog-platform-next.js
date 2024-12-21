"use client"
import { SwitchTypes } from "@/app/edit-profile/types"
import { Box } from "@mui/material"
import { useRef } from "react"
import { FaRegEyeSlash } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"

export const SwitchEye = ({ password, type, setType }: SwitchTypes) => {
  const ref = useRef(null)

  return (
    <CSSTransition
      in={password}
      nodeRef={ref}
      timeout={300}
      classNames="display"
      unmountOnExit
    >
      <Box
        ref={ref}
        className="text-[24px] hover:opacity-50 cursor-pointer absolute bottom-[140px] right-[16px]"
        onClick={() =>
          setType((prev) => (prev === "password" ? "text" : "password"))
        }
      >
        {type === "text" ? (
          <FaRegEye className="animate-display" />
        ) : (
          <FaRegEyeSlash className="animate-display" />
        )}
      </Box>
    </CSSTransition>
  )
}
