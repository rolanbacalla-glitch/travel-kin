import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand:    "#F7F2E4",
        ocean:   "#0077B6",
        "ocean-dark": "#005F92",
        sunset:  "#FF8C42",
        "sunset-dark": "#E07030",
        slate:   "#1E2D35",
        "slate-mid": "#2F3E46",
        terra:   "#C1440E",
        mist:    "#EEF5F8",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "subtle-zoom": {
          "0%":   { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-in": {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up":     "fade-up 0.8s ease-out both",
        "subtle-zoom": "subtle-zoom 8s ease-out both",
        "slide-in":    "slide-in 0.6s ease-out both",
        "float":       "float 4s ease-in-out infinite",
        "ticker":      "ticker 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
