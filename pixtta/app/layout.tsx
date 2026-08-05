import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixtta",
  description: "Concesionario Pixtta — catálogo de vehículos exclusivos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
