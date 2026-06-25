import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#005077",
        "tertiary-container": "#ffab67",
        "on-primary-container": "#005750",
        "surface-container-low": "#f0f3ff",
        "on-primary": "#ffffff",
        "surface-container-highest": "#d9e3f9",
        "primary-container": "#4fd1c5",
        "primary": "#006a63",
        "outline": "#6c7a77",
        "on-secondary": "#ffffff",
        "on-background": "#121c2c",
        "error-container": "#ffdad6",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#bbc9c7",
        "on-surface": "#121c2c",
        "on-tertiary-container": "#773d00",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "on-surface-variant": "#3c4947",
        "tertiary-fixed-dim": "#ffb77f",
        "secondary-container": "#74c3fe",
        "surface-container": "#e7eeff",
        "error": "#ba1a1a",
        "surface-container-high": "#dee8ff",
        "secondary": "#006494",
        "on-error": "#ffffff",
        "surface-variant": "#d9e3f9",
        "tertiary": "#8e4e11",
        "surface": "#f9f9ff",
        "background": "#f9f9ff"
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      spacing: {
        base: "8px",
        md: "20px",
        xs: "4px",
        gutter: "16px",
        lg: "32px",
        xl: "48px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        sm: "12px"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "title-sm": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "display-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }]
      }
    }
  },
  plugins: [forms]
};

export default config;
