"use client";

import { useEffect, useRef, useState } from "react";
import type { Brand } from "@/types";

interface BrandMarkProps {
  brand: Brand;
  /** Ancho/alto del tile — la grilla de /marcas usa uno más grande que el marquee. */
  size?: "sm" | "lg";
}

/**
 * Tile de marca con efecto "glass" (hairline + bg translúcido + highlight
 * interior). Intenta cargar el logo real en /logos/{slug}.png (blanco sobre
 * transparente, ver scripts/build-brand-logos.mjs); si falta, cae a un monograma — nunca un ícono
 * roto. Reemplaza esta lógica el día que `Brand` tenga un `logoUrl` real.
 */
export function BrandMark({ brand, size = "sm" }: BrandMarkProps): React.JSX.Element {
  // Se muestra el monograma hasta que el logo cargue de verdad: así nunca aparece
  // un icono de imagen rota (ni antes de hidratar ni si el SVG no existe).
  const [logoLoaded, setLogoLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si el logo terminó de cargar antes de hidratar, `onLoad` ya no se dispara: se revisa al montar.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLogoLoaded(true);
  }, []);
  // "lg" vive en la grilla de /marcas: en móvil ocupa el ancho de su celda (2 columnas en
  // pantallas de 360px no caben a 160px fijos); desde `sm` vuelve a 160×96.
  const dimensions = size === "lg" ? "h-20 w-full sm:h-24 sm:w-40" : "h-16 w-28";

  return (
    <div
      className={`group relative flex shrink-0 items-center justify-center overflow-hidden border border-titanium/15 bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:border-titanium/30 ${dimensions}`}
    >
      <span className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={`/logos/${brand.slug}.png`}
        alt={logoLoaded ? brand.name : ""}
        onLoad={() => setLogoLoaded(true)}
        onError={() => setLogoLoaded(false)}
        className={`max-h-[60%] max-w-[70%] object-contain opacity-70 transition-opacity duration-200 ease-out group-hover:opacity-100 ${
          logoLoaded ? "" : "hidden"
        }`}
      />
      {!logoLoaded && (
        <span className="flex flex-col items-center gap-1">
          <span className="font-display text-xl font-extrabold uppercase text-titanium transition-colors duration-200 group-hover:text-alabaster">
            {brand.name.slice(0, 2)}
          </span>
          <span className="max-w-full truncate px-1 font-mono text-[9px] uppercase tracking-[0.15em] text-titanium/60">
            {brand.name}
          </span>
        </span>
      )}
    </div>
  );
}
