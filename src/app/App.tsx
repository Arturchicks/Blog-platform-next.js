import React, { useState } from "react"
import ErrorBoundary from "./errorBoundary"
import { Header } from "widgets/header"
import { Outlet } from "react-router-dom"
import { Articles } from "pages/Articles"
import { useGetArticleQuery } from "shared/redux/api"

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <ErrorBoundary>
        <Header />
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}
export default App
