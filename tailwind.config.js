import daisyui from "daisyui"
import typography from "@tailwindcss/typography"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      "PT-Sans": ["PT Sans", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
    screens: {
      lg: "990px",
      xl: "1200px",
      "2xl": "1380px",
    },
  },
  plugins: [typography, daisyui],
}
