import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0B0C0E",
        graphite: "#1E2023",
        titanium: "#A7ABB1",
        alabaster: "#F7F5F2",
        ignition: "#FF3B30",
        teal: "#14B8A6",
        amber: "#F2A93B",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
