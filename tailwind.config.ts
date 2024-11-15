import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import tailWindAnimate from "tailwindcss-animate";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    light: {
      colors: {
        primary: "#7828c8",
      },
    },
    dark: {
      colors: {
        primary: "#9353d3",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    keyframes: {
      "fade-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
    animation: {
      "fade-up": "fade-up 0.5s ease-out",
      "fade-in": "fade-in 0.3s ease-out",
    },
  },
  darkMode: "class",
  plugins: [nextui(), tailWindAnimate],
};
export default config;
