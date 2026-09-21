import { Montserrat, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Montserrat: sans geométrica, la más cercana al "AUTOS PREMIUM" del logo
 * oficial de Pixtta. Reemplaza al serif anterior (Playfair Display).
 */
export const fontDisplay = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
