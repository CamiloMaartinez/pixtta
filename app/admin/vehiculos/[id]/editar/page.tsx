import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleRepository, getBrandRepository, getCategoryRepository } from "@/features/vehicles/services";
import { VehicleForm } from "@/features/admin-vehicles/components/VehicleForm";
import { updateVehicleAction } from "@/features/admin-vehicles/actions/update-vehicle.action";
import { ImageUploader } from "@/features/media/components/ImageUploader";

interface EditarVehiculoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarVehiculoPage({
  params,
}: EditarVehiculoPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const repository = await getVehicleRepository();
  const brandRepository = await getBrandRepository();
  const categoryRepository = await getCategoryRepository();

  const [result, brandsResult, categoriesResult] = await Promise.all([
    repository.getVehicleById(id),
    brandRepository.getAllBrands(),
    categoryRepository.getAllCategories(),
  ]);

  if (!result.success || !result.data) {
    notFound();
  }

  const brands = brandsResult.success ? brandsResult.data : [];
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/admin/vehiculos"
        className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
      >
        ← Inventario
      </Link>
      <h1 className="mt-1 mb-6 font-display text-2xl font-extrabold uppercase text-alabaster">
        Editar vehículo
      </h1>

      <div className="mb-8 border border-titanium/15 bg-graphite p-5">
        <ImageUploader vehicleId={result.data.id} images={result.data.images} />
      </div>

      <VehicleForm
        action={updateVehicleAction}
        defaultValues={result.data}
        brands={brands}
        categories={categories}
      />
    </main>
  );
}