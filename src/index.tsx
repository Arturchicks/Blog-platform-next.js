import ReactDOM from "react-dom/client"
import { router } from "./app/routing"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./shared/redux"
import { ThemeProvider } from "@mui/material"
import { theme } from "shared/ui/toggleTheme/theme"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
