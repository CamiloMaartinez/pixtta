import type { Metadata } from "next";
import Link from "next/link";
import { getBrandRepository } from "@/features/vehicles/services";
import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Marcas | Pixtta",
  description: "Todas las marcas disponibles en el catálogo de Pixtta.",
};

export default async function MarcasPage(): Promise<React.JSX.Element> {
  const repository = await getBrandRepository();
  const result = await repository.getAllBrands();
  const brands = result.success ? result.data : [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
          Catálogo por marca
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-alabaster sm:text-4xl">
          Marcas
        </h1>
        <p className="mt-4 max-w-xl font-body text-sm text-titanium">
          Selecciona una marca para ver los vehículos disponibles de esa
          línea en nuestro catálogo.
        </p>
      </Reveal>

      {brands.length === 0 ? (
        <p className="mt-12 font-body text-sm text-titanium">
          Aún no hay marcas cargadas.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {brands.map((brand, index) => (
            <Reveal key={brand.id} delay={(index % 8) * 40}>
              <Link
                href={`/catalogo?search=${encodeURIComponent(brand.name)}`}
                className="flex flex-col items-center"
              >
                <BrandMark brand={brand} size="lg" />
                <p className="mt-3 text-center font-body text-xs font-medium uppercase tracking-wide text-titanium">
                  {brand.name}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
