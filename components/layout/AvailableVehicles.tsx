import Link from "next/link";
import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleGrid } from "@/features/vehicles/components/VehicleGrid";

export async function AvailableVehicles(): Promise<React.JSX.Element> {
  const repository = await getVehicleRepository();
  const result = await repository.getPublicVehicles({ pageSize: 8 });
  const vehicles = result.success ? result.data.items : [];

  return (
    <section className="border-t border-titanium/10 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
              Disponibles ahora
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-alabaster sm:text-3xl">
              Vehículos disponibles
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="shrink-0 whitespace-nowrap py-2 font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <VehicleGrid vehicles={vehicles} />
      </div>
    </section>
  );
}