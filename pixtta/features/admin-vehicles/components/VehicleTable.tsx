import Link from "next/link";
import type { Vehicle, VehicleStatus } from "@/types";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatKm } from "@/lib/utils/formatKm";
import { DeleteVehicleButton } from "./DeleteVehicleButton";

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const STATUS_LABELS: Record<VehicleStatus, string> = {
  activo: "Activo",
  vendido: "Vendido",
  borrador: "Borrador",
};

const STATUS_STYLES: Record<VehicleStatus, string> = {
  activo: "bg-green-100 text-green-700",
  vendido: "bg-neutral-200 text-neutral-600",
  borrador: "bg-yellow-100 text-yellow-700",
};

/**
 * Tabla de inventario para el panel administrativo.
 * Componente puro: no consulta datos ni ejecuta acciones (eso viene en el Paso 10).
 */
export function VehicleTable({ vehicles }: VehicleTableProps): React.JSX.Element {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 p-12 text-center text-sm text-neutral-500">
        Todavía no hay vehículos registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200 text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Vehículo</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Año</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Kilometraje</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Precio</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Estado</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-neutral-900">
                  {vehicle.brand} {vehicle.model}
                </p>
              </td>
              <td className="px-4 py-3 text-neutral-600">{vehicle.year}</td>
              <td className="px-4 py-3 text-neutral-600">{formatKm(vehicle.mileageKm)}</td>
              <td className="px-4 py-3 text-neutral-600">{formatCurrency(vehicle.price)}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[vehicle.status]}`}
                >
                  {STATUS_LABELS[vehicle.status]}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/vehiculos/${vehicle.id}/editar`}
                    className="text-xs font-medium text-neutral-600 underline"
                  >
                    Editar
                  </Link>
                  <DeleteVehicleButton
                    vehicleId={vehicle.id}
                    vehicleLabel={`${vehicle.brand} ${vehicle.model}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
