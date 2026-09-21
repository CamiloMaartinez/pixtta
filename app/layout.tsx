import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";

const SITE_NAME = "Pixtta";
const DESCRIPTION =
  "Pixtta | Autos Premium: concesionario en Bucaramanga. Vendemos e importamos tu vehículo soñado. Distribuidores autorizados Can-Am y Sea-Doo.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Pixtta | Autos Premium",
    template: "%s",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_NAME,
    title: "Pixtta | Autos Premium",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixtta | Autos Premium",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#19161D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
