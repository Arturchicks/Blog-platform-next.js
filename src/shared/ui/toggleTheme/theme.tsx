import { createTheme, Theme } from "@mui/material/styles"

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
          primary: "#b4b6ba",
          secondary: "#b4b6ba",
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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&[aria-invalid='false']": {
            "&:focus-within:not(.MuiInputBase-inputMultiline)": {
              outline: "2px solid #1890FF",
              borderRadius: "4px",
            },
          },
          "&:-webkit-autofill": {
            boxShadow: (theme: Theme) => `0 0 0 100px ${theme.palette.primary.main} inset`,
          },
        },
        root: {
          "&:not(.Mui-error):focus-within": {
            outline: "2px solid #1890FF",
            borderRadius: "4px",
          },
          "&.Mui-error:focus-within": {
            outline: "2px solid #f44336",
            borderRadius: "4px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        },
      },
    },
  },
})
