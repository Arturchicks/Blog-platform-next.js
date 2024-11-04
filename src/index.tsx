import ReactDOM from "react-dom/client"
import { router } from "./app/routing"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./shared/redux"
import "./index.css"
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles"
const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "rgba(34, 35, 37, 1)",
        },
        secondary: {
          main: "rgba(255, 255, 255, 255)",
        },
        background: {
          default: "rgba(19, 20, 21, 1)",
        },
        text: {
          primary: "rgba(255, 255, 255, 255)",
        },
      },
    },
    light: {
      palette: {
        background: {
          default: "rgba(235, 238, 243, 1)",
        },
        secondary: {
          main: "rgba(0, 0, 0, 0.85)",
        },
        primary: {
          main: "rgba(255, 255, 255, 255)",
        },
        text: {
          primary: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
