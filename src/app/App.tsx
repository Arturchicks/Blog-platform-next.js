import React, { useEffect, useMemo } from "react"
import ErrorBoundary from "./errorBoundary"
import { AppHeader } from "widgets/header/ui/header"
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import ScrollTop from "shared/ui/scrollTop/scrollTop"

const App: React.FC = () => {
  return (
    <Box className="flex flex-col gap-5 flex-1 pb-5" sx={{ bgcolor: "background.default" }}>
      <ErrorBoundary>
        <AppHeader />
        <Outlet />
        <ScrollTop />
      </ErrorBoundary>
    </Box>
  )
}
export default App
