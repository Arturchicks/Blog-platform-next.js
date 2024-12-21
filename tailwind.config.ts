import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
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
  },
  plugins: [],
} satisfies Config;
