import daisyui from "daisyui"
import typography from "@tailwindcss/typography"
import { theme } from "antd"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      "PT-Sans": ["PT Sans", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    fontSize: {
      "clamp-xs": "clamp(8px, 1vw, 0.7rem)",
      clamp: "clamp(12px, 2vw, 1rem)",
      "clamp-xl": "clamp(16px, 2vw, 20px)",
    },
    extend: {},
    screens: {
      xs: "240px",
      s: "320px",
      sx: "480px",
      sm: "640px",
      lg: "990px",
      xl: "1200px",
      "2xl": "1380px",
    },
  },
  plugins: [typography, daisyui],
}
