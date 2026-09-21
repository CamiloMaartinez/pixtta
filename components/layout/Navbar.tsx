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
    <header className="sticky top-0 z-50 border-b border-titanium/10 bg-carbon/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
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
            className="relative flex h-9 w-9 shrink-0 items-center justify-center lg:hidden"
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

      <div
        className={`fixed inset-x-0 top-[65px] bottom-0 z-40 bg-carbon/98 backdrop-blur-lg transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-8">
          {LINKS.map((link, index) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: menuOpen ? `${index * 50 + 80}ms` : "0ms" }}
                className={`border-b border-titanium/10 py-4 font-display text-2xl font-extrabold uppercase transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  active ? "text-ignition" : "text-alabaster"
                } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            style={{ transitionDelay: menuOpen ? `${LINKS.length * 50 + 80}ms` : "0ms" }}
            className={`mt-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:hidden ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <SearchToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
