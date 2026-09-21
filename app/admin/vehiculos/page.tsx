import Link from "next/link";
import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleTable } from "@/features/admin-vehicles/components/VehicleTable";

export default async function AdminVehiculosPage(): Promise<React.JSX.Element> {
  const repository = await getVehicleRepository();
  const result = await repository.getAllVehicles({});

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
          >
            ← Panel administrativo
          </Link>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase text-alabaster">
            Inventario
          </h1>
        </div>
        <Link
          href="/admin/vehiculos/nuevo"
          className="border border-titanium/20 bg-ignition px-4 py-2 font-body text-sm font-semibold uppercase tracking-wide text-alabaster"
        >
          + Nuevo vehículo
        </Link>
      </div>

      {!result.success ? (
        <p className="font-body text-sm text-ignition">
          No se pudo cargar el inventario: {result.error}
        </p>
      ) : (
        <VehicleTable vehicles={result.data} />
      )}
    </main>
  );
}
