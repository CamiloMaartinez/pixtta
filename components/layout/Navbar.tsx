"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { SearchToggle } from "@/components/ui/SearchToggle";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/marcas", label: "Marcas" },
  { href: "/informacion", label: "Información del Concesionario" },
  { href: "/contacto", label: "Contacto" },
];

function isActive(pathname: string | null, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname?.startsWith(href) ?? false;
}

/**
 * Barra de navegación del sitio público (manual de marca, sección 9).
 * Fondo Carbon con blur, subrayado Ignition en el enlace activo. Debajo
 * de md colapsa a menú de pantalla completa con morph hamburguesa → X
 * y reveal escalonado de los enlaces (habilidad animate).
 */
export function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-titanium/10 bg-carbon/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[68px] sm:gap-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap font-body text-sm font-medium uppercase tracking-wide transition-colors duration-150 ease-out ${
                  active
                    ? "border-b-2 border-ignition text-alabaster"
                    : "text-titanium hover:text-alabaster"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchToggle />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="relative -mr-1.5 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-alabaster transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-alabaster transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
              }`}
            />
          </button>
        </div>
        </div>
      </header>

      {/*
        Panel móvil: hermano del header (no hijo). El header usa backdrop-blur, y un
        `position: fixed` dentro de un ancestro con backdrop-filter se ancla a ese
        ancestro en vez de a la pantalla, lo que dejaba el menú de alto casi cero.
        `pt-16` / `sm:pt-[68px]` deja libre la altura del header (h-16 / 68px) + su borde.
      */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-carbon/[0.98] pt-[65px] backdrop-blur-lg transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:pt-[69px] lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-6 sm:px-6 sm:py-8">
          {LINKS.map((link, index) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                style={{ transitionDelay: menuOpen ? `${index * 50 + 80}ms` : "0ms" }}
                className={`border-b border-titanium/10 py-4 font-display text-xl font-extrabold uppercase transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:text-2xl ${
                  active ? "text-ignition" : "text-alabaster"
                } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <form
            action="/catalogo"
            method="GET"
            role="search"
            style={{ transitionDelay: menuOpen ? `${LINKS.length * 50 + 80}ms` : "0ms" }}
            className={`mt-6 flex border border-titanium/20 bg-graphite transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:hidden ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <input
              type="text"
              name="search"
              tabIndex={menuOpen ? 0 : -1}
              placeholder="Buscar marca o modelo..."
              aria-label="Buscar marca o modelo"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 font-body text-sm text-alabaster placeholder-titanium outline-none"
            />
            <button
              type="submit"
              tabIndex={menuOpen ? 0 : -1}
              className="press border-l border-titanium/20 bg-ignition px-5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster"
            >
              Buscar
            </button>
          </form>
        </nav>
      </div>
    </>
  );
}
