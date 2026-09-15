import type { Metadata } from "next";
import Link from "next/link";
import { getVehicleRepository } from "@/features/vehicles/services";
import { getBrandRepository } from "@/features/brands/services";
import { VehicleGrid } from "@/features/vehicles/components/VehicleGrid";
import { HudFrame } from "@/components/ui/HudFrame";

export const metadata: Metadata = {
  title: "Pixtta | Concesionario de vehículos exclusivos",
  description:
    "Explora el catálogo de Pixtta: vehículos deportivos, SUV, sedanes, eléctricos y motos, verificados e inspeccionados.",
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const vehicleRepository = await getVehicleRepository();
  const brandRepository = await getBrandRepository();

  const [vehiclesResult, brandsResult] = await Promise.all([
    vehicleRepository.getPublicVehicles({}),
    brandRepository.getBrands(),
  ]);

  const vehicles = vehiclesResult.success ? vehiclesResult.data.slice(0, 6) : [];
  const brands = brandsResult.success ? brandsResult.data : [];

  return (
    <main>
      <section className="border-b border-titanium/20 px-6 py-20 text-center">
        <h1 className="font-display text-4xl text-alabaster sm:text-5xl">
          Encuentra tu próximo vehículo
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-titanium">
          Deportivos, SUV, motos y más — verificados e inspeccionados.
        </p>
        <form action="/catalogo" className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            type="text"
            name="search"
            placeholder="Busca por marca o modelo"
            className="w-full rounded-md border border-titanium/40 bg-carbon px-4 py-2.5 text-sm text-alabaster outline-none focus:border-teal"
          />
          <button
            type="submit"
            className="rounded-md bg-ignition px-6 py-2.5 text-sm font-semibold text-alabaster transition-colors hover:bg-ignition/90"
          >
            Buscar
          </button>
        </form>
      </section>

      {brands.length > 0 && (
        <section className="border-b border-titanium/20 px-6 py-12">
          <h2 className="mb-6 text-center text-xs uppercase tracking-widest text-titanium">
            Marcas disponibles
          </h2>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/catalogo?search=${encodeURIComponent(brand.name)}`}
                className="rounded-full border border-titanium/30 px-4 py-1.5 text-sm text-titanium transition-colors hover:border-ignition hover:text-alabaster"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-alabaster">Vehículos disponibles</h2>
          <Link href="/catalogo" className="text-sm text-teal hover:underline">
            Ver catálogo completo →
          </Link>
        </div>
        <VehicleGrid vehicles={vehicles} />
      </section>

      <section className="border-t border-titanium/20 px-6 py-16">
        <h2 className="mb-8 text-center font-display text-2xl text-alabaster">
          Nuestros servicios
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/credito"
            className="group relative rounded-lg border border-titanium/30 bg-graphite p-6 transition-colors hover:border-ignition"
          >
            <HudFrame />
            <h3 className="font-display text-lg text-alabaster">Solicita tu crédito</h3>
            <p className="mt-2 text-sm text-titanium">
              Estructura el crédito para tu próximo vehículo con nuestro equipo.
            </p>
          </Link>
          <Link
            href="/vender"
            className="group relative rounded-lg border border-titanium/30 bg-graphite p-6 transition-colors hover:border-ignition"
          >
            <HudFrame />
            <h3 className="font-display text-lg text-alabaster">Vende tu vehículo</h3>
            <p className="mt-2 text-sm text-titanium">
              Cuéntanos sobre tu vehículo y recibe una oferta.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
