import { Theme } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined"
import { CSSTransition } from "react-transition-group"
import { useTheme } from "@emotion/react"
import clsx from "clsx"
const ScrollTop: React.FC = (): JSX.Element => {
  const ref = useRef(null)
  const [inScroll, setIsScrolled] = useState<boolean>(false)
  const theme = useTheme() as Theme
  const handleScroll = () => {
    if (scrollY > 250) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <CSSTransition nodeRef={ref} in={inScroll} timeout={300} classNames="alert" unmountOnExit>
      <button
        ref={ref}
        className={clsx(
          `w-[60px] h-[60px] fixed bottom-[45px] right-[45px] opacity-80 hover:opacity-50 rounded`,
          theme.palette.mode === "dark"
            ? "bg-[#222325] shadow-[0px_0px_3px_#494949]"
            : "bg-[#fff] shadow-[0px_0px_3px_#d6caca]"
        )}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        <NorthOutlinedIcon sx={{ fontSize: "36px", color: "#b4b6ba" }} />
      </button>
    </CSSTransition>
  )
}
export default ScrollTop
