"use client"
import { Box, Theme, useTheme } from "@mui/material"
import React from "react"

const Blur: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { palette } = useTheme() as Theme
  return (
    <React.Fragment>
      <Box
        className="left-0 w-full h-2 pointer-events-none absolute top-0 z-[1]"
        sx={{
          backgroundImage: `linear-gradient(to bottom, ${palette.primary.main}, transparent)`,
        }}
      />
      {children}
      <Box
        className="left-0 w-full min-h-5 pointer-events-none absolute bottom-0 z-[1]"
        sx={{
          backgroundImage: `linear-gradient(to top, ${palette.primary.main}, transparent)`,
        }}
      />
    </React.Fragment>
  )
}
export default Blur
