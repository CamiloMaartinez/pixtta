"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleImage } from "@/types";

interface VehicleGalleryProps {
  images: VehicleImage[];
  alt: string;
  accent?: "ignition" | "teal";
}

/**
 * Galería simple: imagen principal + miniaturas clicables.
 * El borde de la miniatura activa sigue el acento del vehículo
 * (Ignition/Teal), igual que en la tarjeta del catálogo.
 */
export function VehicleGallery({
  images,
  alt,
  accent = "ignition",
}: VehicleGalleryProps): React.JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBorder = accent === "teal" ? "border-teal" : "border-ignition";

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center border border-titanium/15 bg-graphite font-body text-xs font-medium uppercase tracking-wide text-titanium">
        Sin fotografías
      </div>
    );
  }

    const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-titanium/15 bg-graphite">
        <Image
          src={activeImage.url}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16 overflow-hidden border-2 transition-colors ${
                index === activeIndex ? activeBorder : "border-transparent"
              }`}
            >
              <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
