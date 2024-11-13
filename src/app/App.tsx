import React, { useEffect } from "react"
import ErrorBoundary from "./errorBoundary"
import { Header } from "widgets/header"
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"

const App: React.FC = () => {
  return (
    <Box className="flex flex-col gap-5 flex-1 pb-2" sx={{ bgcolor: "background.default" }}>
      <ErrorBoundary>
        <Header />
        <Outlet />
        <div></div>
      </ErrorBoundary>
    </Box>
  )
}
export default App
