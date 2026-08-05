import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleRepository } from "@/features/vehicles/services";
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
  const result = await repository.getVehicleById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/admin/vehiculos" className="text-xs text-neutral-500 underline">
        ← Inventario
      </Link>
      <h1 className="mt-1 mb-6 text-2xl font-bold text-neutral-900">Editar vehículo</h1>

      <div className="mb-8 rounded-lg border border-neutral-200 p-5">
        <ImageUploader vehicleId={result.data.id} images={result.data.images} />
      </div>

      <VehicleForm action={updateVehicleAction} defaultValues={result.data} />
    </main>
  );
}
