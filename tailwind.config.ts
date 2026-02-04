import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        brand: {
          black: "#000000",
          dark: "#18181b",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(120deg, #818cf8, #4338ca)",
      },
      borderRadius: {
        button: "8px",
        card: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
