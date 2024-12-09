import { Box } from "@mui/material"
import { useRef } from "react"
import { FaRegEyeSlash } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"
import { SwitchTypes } from "../types/types"
import { CSSTransition } from "react-transition-group"

export const SwitchComponent = ({ password, visible, setVisible }: SwitchTypes) => {
  const ref = useRef<any>()

  return (
    <CSSTransition in={password} nodeRef={ref} timeout={300} classNames="alert" unmountOnExit>
      <Box
        ref={ref}
        className="text-[24px] hover:opacity-50 cursor-pointer absolute bottom-[140px] right-[16px]"
        onClick={() => setVisible((prev) => !prev)}
      >
        {!visible ? <FaRegEye className="animate-display" /> : <FaRegEyeSlash className="animate-display" />}
      </Box>
    </CSSTransition>
  )
}
