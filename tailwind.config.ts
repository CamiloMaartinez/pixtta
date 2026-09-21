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
        // Paleta oficial, muestreada del logo de Pixtta (Instagram):
        // fondo #19161D, blanco y rojo #E6303D (la "puerta" de la X).
        carbon: "#19161D",
        graphite: {
          DEFAULT: "#221F27",
          light: "#2B2831",
        },
        titanium: "#9391A0",
        alabaster: "#F7F6F8",
        ignition: "#E6303D",
        teal: "#12888E",
        amber: "#E8A33D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
