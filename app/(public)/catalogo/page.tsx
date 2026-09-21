import { getVehicleRepository, getCategoryRepository } from "@/features/vehicles/services";
import { VehicleGrid } from "@/features/vehicles/components/VehicleGrid";
import { VehicleFilters } from "@/features/vehicles/components/VehicleFilters";
import { CatalogPagination } from "@/features/vehicles/components/CatalogPagination";
import type { VehicleFilters as VehicleFiltersType } from "@/types";

interface CatalogoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function toNumber(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function toStringParam(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export default async function CatalogoPage({
  searchParams,
}: CatalogoPageProps): Promise<React.JSX.Element> {
  const params = await searchParams;

  const page = toNumber(params.page) ?? 1;
  const pageSize = toNumber(params.pageSize) ?? 12;

  const filters: VehicleFiltersType = {
    category: (params.category as VehicleFiltersType["category"]) || undefined,
    search: toStringParam(params.search),
    sort: (params.sort as VehicleFiltersType["sort"]) || undefined,
    priceMin: toNumber(params.priceMin),
    priceMax: toNumber(params.priceMax),
    yearMin: toNumber(params.yearMin),
    yearMax: toNumber(params.yearMax),
    mileageMax: toNumber(params.mileageMax),
    color: toStringParam(params.color),
    page,
    pageSize,
  };

  const vehicleRepository = await getVehicleRepository();
  const categoryRepository = await getCategoryRepository();

  const [result, categoriesResult, colorsResult] = await Promise.all([
    vehicleRepository.getPublicVehicles(filters),
    categoryRepository.getAllCategories(),
    vehicleRepository.getDistinctColors(),
  ]);

  const categories = categoriesResult.success ? categoriesResult.data : [];
  const colors = colorsResult.success ? colorsResult.data : [];

  if (!result.success) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="font-body text-sm text-ignition">
          No se pudo cargar el catálogo: {result.error}
        </p>
      </main>
    );
  }

  const { items, total } = result.data;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const buildHref = (targetPage: number): string => {
    const usp = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (key === "page") continue;
      if (typeof value === "string" && value) usp.set(key, value);
    }
    usp.set("page", String(targetPage));
    return `/catalogo?${usp.toString()}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase text-alabaster">
        Catálogo
      </h1>
      <VehicleFilters categories={categories} colors={colors} />
      <VehicleGrid vehicles={items} />
      <CatalogPagination page={page} totalPages={totalPages} buildHref={buildHref} />
    </main>
  );
}