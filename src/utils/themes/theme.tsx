"use client";
import { Theme, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "rgb(19, 20, 21)",
        },
        primary: {
          main: "rgba(34, 35, 37)",
          "100": "rgba(34, 35, 37, 0.7)",
          "200": "#494949",
        },
        secondary: {
          main: "rgb(180, 182, 186)",
        },
        text: {
          primary: "rgb(255, 255, 255)",
          secondary: "rgb(180, 182, 186)",
        },
      },
    },
    light: {
      palette: {
        background: {
          default: "rgb(235, 238, 243)",
        },
        primary: {
          main: "rgba(255, 255, 255)",
          "100": "rgba(255, 255, 255, 0.7)",
          "200": "#d6caca",
        },
        secondary: {
          main: "rgba(0, 0, 0, 0.5)",
        },
        text: {
          primary: "rgb(0, 0, 0)",
          secondary: "rgb(180, 182, 186)",
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
            boxShadow: ({ palette }: Theme) =>
              `0 0 0 100px ${palette.primary.main} inset`,
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
});

const ThemeClient = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default ThemeClient;
