import Link from "next/link";
import { VehicleForm } from "@/features/admin-vehicles/components/VehicleForm";
import { createVehicleAction } from "@/features/admin-vehicles/actions/create-vehicle.action";

export default function NuevoVehiculoPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/admin/vehiculos" className="text-xs text-neutral-500 underline">
        ← Inventario
      </Link>
      <h1 className="mt-1 mb-6 text-2xl font-bold text-neutral-900">Nuevo vehículo</h1>
      <VehicleForm action={createVehicleAction} />
    </main>
  );
}
