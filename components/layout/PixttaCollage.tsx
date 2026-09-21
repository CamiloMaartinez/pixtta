"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface CollageItem {
  src: string;
  alt: string;
  caption: string;
  /** Clases de grilla: define el tamaño del mosaico (cols/rows que ocupa). */
  span: string;
}

/**
 * Collage de la página principal. La grilla usa filas de alto fijo y cada
 * tile ocupa más o menos celdas, así se arma un mosaico asimétrico sin
 * depender de la proporción de cada foto.
 */
const ITEMS: CollageItem[] = [
  {
    src: "/images/collage/1.jpg",
    alt: "Cuatrimoto Can-Am Outlander levantando barro en el bosque",
    caption: "Can-Am Outlander",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/collage/5.jpg",
    alt: "Toyota 4Runner blanca frente a la fachada de Pixtta",
    caption: "Toyota 4Runner",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/collage/2.jpg",
    alt: "Moto eléctrica Can-Am Pulse en un parqueadero",
    caption: "Can-Am Pulse 100% eléctrica",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/collage/4.jpg",
    alt: "Moto acuática Sea-Doo 2026 sobre el agua",
    caption: "Sea-Doo 2026",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/collage/6.jpg",
    alt: "Toyota Prado gris frente a la fachada de Pixtta",
    caption: "Toyota Prado",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/collage/3.jpg",
    alt: "Vehículos Can-Am recorriendo el desierto de día y de noche",
    caption: "Can-Am todoterreno",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/collage/7.jpg",
    alt: "Lexus blanca frente a la fachada de Pixtta",
    caption: "Lexus GX",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/collage/8.jpg",
    alt: "Toyota Land Cruiser blanca frente a la fachada de Pixtta",
    caption: "Toyota Land Cruiser",
    span: "col-span-2 row-span-2",
  },
];

export function PixttaCollage(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  // Se conserva al cerrar para que la foto siga visible durante la animación de salida.
  const [current, setCurrent] = useState(0);

  // Entrada escalonada: se dispara una sola vez al entrar en pantalla.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const open = (index: number): void => {
    setCurrent(index);
    dialogRef.current?.showModal();
  };
  const close = (): void => dialogRef.current?.close();
  const step = (delta: number): void =>
    setCurrent((prev) => (prev + delta + ITEMS.length) % ITEMS.length);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  // Clic en el fondo oscuro (fuera de la foto) cierra el modal.
  const onDialogClick = (event: React.MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget) close();
  };

  const item = ITEMS[current] ?? ITEMS[0]!;

  return (
    <section className="border-t border-titanium/10 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
          Galería
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-alabaster">
          Pasión por los motores
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-titanium">
          Autos premium, cuatrimotos, motos y motos acuáticas. Toca una foto para verla en grande.
        </p>

        <div
          ref={sectionRef}
          className={`mt-8 grid auto-rows-[110px] grid-cols-2 gap-1 sm:auto-rows-[130px] md:grid-cols-4 ${
            visible ? "collage-visible" : ""
          }`}
        >
          {ITEMS.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => open(index)}
              aria-label={`Ver en grande: ${photo.caption}`}
              style={{ "--tile-delay": `${index * 60}ms` } as React.CSSProperties}
              className={`collage-tile group relative overflow-hidden border border-titanium/15 text-left ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-transparent" />
              <span className="collage-caption absolute inset-x-3 bottom-3 font-display text-xs font-bold uppercase tracking-wide text-alabaster sm:text-sm">
                {photo.caption}
              </span>
              <span className="collage-plus absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-carbon/70 text-alabaster">
                <Maximize2 size={14} aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        aria-label={`Foto ampliada: ${item.caption}`}
        className="pixtta-lightbox"
      >
        <div className="relative">
          <div className="relative mx-auto w-fit max-w-[94vw] overflow-hidden border border-titanium/20 bg-graphite">
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={1600}
              height={1067}
              sizes="94vw"
              className="h-auto max-h-[80vh] w-auto max-w-[94vw] object-contain"
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-alabaster">
              {item.caption}
              <span className="ml-3 font-mono text-xs font-normal text-titanium">
                {current + 1} / {ITEMS.length}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="press flex h-10 w-10 items-center justify-center border border-titanium/25 text-alabaster hover:border-ignition"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Foto siguiente"
                className="press flex h-10 w-10 items-center justify-center border border-titanium/25 text-alabaster hover:border-ignition"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                autoFocus
                className="press flex h-10 w-10 items-center justify-center border border-titanium/25 bg-ignition text-alabaster"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
