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
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        brand: {
          dark: "#0B0F1A",
          surface: "#111827",
          slate: "#1E293B",
        },
        teal: {
          DEFAULT: "#0D9488",
          deep: "#0F766E",
          soft: "#99F6E4",
        },
        txt: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "#334155",
        },
        status: {
          green: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
      },
      borderRadius: {
        button: "6px",
        card: "8px",
        badge: "4px",
      },
      boxShadow: {
        "teal-glow": "0 0 0 1px rgba(13, 148, 136, 0.25)",
        "teal-glow-lg": "0 0 20px rgba(13, 148, 136, 0.15)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(160deg, #0F172A 0%, #134E4A 100%)",
      },
      fontSize: {
        base: ["15px", "1.6"],
      },
      letterSpacing: {
        "tight-h1": "-0.03em",
      },
    },
  },
  plugins: [],
};
export default config;
