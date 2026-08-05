import Link from "next/link";
import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleTable } from "@/features/admin-vehicles/components/VehicleTable";

export default async function AdminVehiculosPage(): Promise<React.JSX.Element> {
  const repository = await getVehicleRepository();
  const result = await repository.getAllVehicles({});

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs text-neutral-500 underline">
            ← Panel administrativo
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">Inventario</h1>
        </div>
        <Link
          href="/admin/vehiculos/nuevo"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          + Nuevo vehículo
        </Link>
      </div>

      {!result.success ? (
        <p className="text-sm text-red-600">
          No se pudo cargar el inventario: {result.error}
        </p>
      ) : (
        <VehicleTable vehicles={result.data} />
      )}
    </main>
  );
}
