"use client"

import { Box, Button, Fade } from "@mui/material"
import React, { JSX, useEffect, useState } from "react"
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined"

const ScrollTop: React.FC = (): JSX.Element => {
  const [inScroll, setIsScrolled] = useState<boolean>(false)
  const handleScroll = () =>
    window.scrollY > 250 ? setIsScrolled(true) : setIsScrolled(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Box>
      <Fade in={inScroll}>
        <Button
          className="w-[60px] h-[60px] bottom-[45px] right-[45px] opacity-80 hover:opacity-50 rounded"
          sx={{
            backgroundColor: "primary.main",
            boxShadow: "0px 0px 3px",
            color: "primary.200",
            position: "fixed",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <NorthOutlinedIcon sx={{ fontSize: "36px", color: "#b4b6ba" }} />
        </Button>
      </Fade>
    </Box>
  )
}
export default ScrollTop
