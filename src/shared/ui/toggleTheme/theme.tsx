import { createTheme } from "@mui/material/styles"
export const theme = createTheme({
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
          secondary: "rgba(232, 232, 232, 1)",
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
          secondary: "rgba(232, 232, 232, 1)",
        },
      },
    },
  },
})
