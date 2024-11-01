import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: {
      "fade-in": {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "slide-in": {
        "0%": { opacity: "0", transform: "translateX(-50px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-20px)" },
      },
      "bounce-slow": {
        "0%, 100%": { transform: "translateY(0) rotate(-12deg)" },
        "50%": { transform: "translateY(-20px) rotate(-12deg)" },
      },
      "bounce-delayed": {
        "0%, 100%": { transform: "translateY(0) rotate(12deg)" },
        "50%": { transform: "translateY(-15px) rotate(12deg)" },
      },
    },
    animation: {
      "fade-in": "fade-in 0.8s ease-out",
      "slide-in": "slide-in 0.6s ease-out",
      float: "float 6s ease-in-out infinite",
      "bounce-slow": "bounce-slow 4s ease-in-out infinite",
      "bounce-delayed": "bounce-delayed 5s ease-in-out infinite",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
