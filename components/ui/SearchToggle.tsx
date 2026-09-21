"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

/**
 * Buscador global del navbar: un ícono de lupa que expande un input a su
 * izquierda. Único elemento del navbar donde animamos `width` (drawer-like,
 * cubic-bezier de iOS) — es un elemento aislado, no una lista, así que el
 * costo de layout es despreciable.
 */
export function SearchToggle(): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (open && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = value.trim();
    if (term.length === 0) return;
    router.push(`/catalogo?search=${encodeURIComponent(term)}`);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="flex items-center justify-end">
      <form
        onSubmit={handleSubmit}
        className={`overflow-hidden border border-titanium/20 bg-graphite transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "w-48 sm:w-64" : "w-0 border-transparent"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar marca o modelo..."
          className="h-9 w-48 min-w-48 bg-transparent px-3 font-body text-sm text-alabaster placeholder-titanium outline-none sm:w-64 sm:min-w-64"
        />
      </form>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Cerrar búsqueda" : "Buscar"}
        aria-expanded={open}
        className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center text-titanium transition-colors duration-150 ease-out hover:text-alabaster"
      >
        {open ? <X size={17} /> : <Search size={17} />}
      </button>
    </div>
  );
}
