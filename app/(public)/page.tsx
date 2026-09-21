import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ContactSection } from "@/components/layout/ContactSection";
import { InstagramStrip } from "@/components/layout/InstagramStrip";
import { PixttaCollage } from "@/components/layout/PixttaCollage";
import { HeroMosaic } from "@/components/layout/HeroMosaic";
import { SectionsSummary } from "@/components/layout/SectionsSummary";
import { BrandsMarquee } from "@/components/layout/BrandsMarquee";
import { AvailableVehicles } from "@/components/layout/AvailableVehicles";

export const metadata: Metadata = {
  title: "Pixtta | Concesionario de vehículos exclusivos",
  description:
    "Explora el catálogo de Pixtta: vehículos deportivos, SUV, sedanes, eléctricos y motos, verificados e inspeccionados.",
};

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <main className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <HeroMosaic />

        <div className="motion-safe:animate-[fade-up_0.9s_cubic-bezier(0.23,1,0.32,1)_both]">
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
            Colección curada · Pixtta
          </p>
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-[clamp(36px,8vw,72px)] font-extrabold uppercase leading-[0.95] text-alabaster motion-safe:animate-[fade-up_0.9s_cubic-bezier(0.23,1,0.32,1)_0.08s_both]">
          Precisión, no volumen.
        </h1>

        <p className="mt-6 max-w-xl font-body text-base text-titanium motion-safe:animate-[fade-up_0.9s_cubic-bezier(0.23,1,0.32,1)_0.16s_both]">
          Vehículos deportivos, SUV, motos, Can-Am y Sea-Doo, verificados e
          inspeccionados por Pixtta.
        </p>

        <div className="mt-10 w-full max-w-md motion-safe:animate-[fade-up_0.9s_cubic-bezier(0.23,1,0.32,1)_0.24s_both]">
          <HudFrame accent="ignition" className="w-full">
            <form
              action="/catalogo"
              method="GET"
              className="flex border border-titanium/20 bg-graphite"
            >
              <div className="flex flex-1 items-center gap-2 px-4">
                <Search size={16} className="text-titanium" />
                <input
                  type="text"
                  name="search"
                  placeholder="Buscar marca o modelo..."
                  className="w-full bg-transparent py-3 font-body text-sm text-alabaster placeholder-titanium outline-none"
                />
              </div>
              <button
                type="submit"
                className="press border-l border-titanium/20 bg-ignition px-6 font-body text-sm font-semibold uppercase tracking-wide text-alabaster hover:bg-ignition/90"
              >
                Buscar
              </button>
            </form>
          </HudFrame>
        </div>

        <Link
          href="/catalogo"
          className="mt-5 font-body text-xs font-medium uppercase tracking-wide text-titanium underline transition-colors duration-150 ease-out hover:text-alabaster motion-safe:animate-[fade-up_0.9s_cubic-bezier(0.23,1,0.32,1)_0.32s_both]"
        >
          Ver catálogo completo
        </Link>
      </main>

      <BrandsMarquee />

      <Reveal>
        <AvailableVehicles />
      </Reveal>

      <PixttaCollage />

      <Reveal>
        <SectionsSummary />
      </Reveal>

      <Reveal>
        <InstagramStrip />
      </Reveal>

      <Reveal>
        <ContactSection />
      </Reveal>
    </>
  );
}