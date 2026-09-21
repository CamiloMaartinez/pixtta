import Link from "next/link";
import { VehicleForm } from "@/features/admin-vehicles/components/VehicleForm";
import { createVehicleAction } from "@/features/admin-vehicles/actions/create-vehicle.action";
import { getBrandRepository, getCategoryRepository } from "@/features/vehicles/services";

export default async function NuevoVehiculoPage(): Promise<React.JSX.Element> {
  const brandRepository = await getBrandRepository();
  const categoryRepository = await getCategoryRepository();

  const [brandsResult, categoriesResult] = await Promise.all([
    brandRepository.getAllBrands(),
    categoryRepository.getAllCategories(),
  ]);

  const brands = brandsResult.success ? brandsResult.data : [];
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/admin/vehiculos"
        className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
      >
        ← Inventario
      </Link>
      <h1 className="mt-1 mb-6 font-display text-2xl font-extrabold uppercase text-alabaster">
        Nuevo vehículo
      </h1>
      <VehicleForm action={createVehicleAction} brands={brands} categories={categories} />
    </main>
  );
}