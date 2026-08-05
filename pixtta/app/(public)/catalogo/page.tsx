import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleGrid } from "@/features/vehicles/components/VehicleGrid";
import { VehicleFilters } from "@/features/vehicles/components/VehicleFilters";
import type { VehicleFilters as VehicleFiltersType } from "@/types";

interface CatalogoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogoPage({
  searchParams,
}: CatalogoPageProps): Promise<React.JSX.Element> {
  const params = await searchParams;

  const filters: VehicleFiltersType = {
    category: (params.category as VehicleFiltersType["category"]) || undefined,
    search: typeof params.search === "string" ? params.search : undefined,
    sort: (params.sort as VehicleFiltersType["sort"]) || undefined,
  };

  const repository = await getVehicleRepository();
  const result = await repository.getPublicVehicles(filters);

  if (!result.success) {
    return (
      <main className="mx-auto max-w-6xl p-8">
        <p className="text-sm text-red-600">
          No se pudo cargar el catálogo: {result.error}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Catálogo</h1>
      <VehicleFilters />
      <VehicleGrid vehicles={result.data} />
    </main>
  );
}
