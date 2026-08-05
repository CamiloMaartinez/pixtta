"use client";

import { useState } from "react";
import type { VehicleImage } from "@/types";

interface VehicleGalleryProps {
  images: VehicleImage[];
  alt: string;
}

/**
 * Galería simple: imagen principal + miniaturas clicables.
 * Sin carrusel avanzado ni animaciones todavía — eso se define
 * en el módulo de diseño visual, para no mezclar estructura con estilo.
 */
export function VehicleGallery({ images, alt }: VehicleGalleryProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-400">
        Sin fotografías
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activeImage.url} alt={alt} className="h-full w-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                index === activeIndex ? "border-neutral-900" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
