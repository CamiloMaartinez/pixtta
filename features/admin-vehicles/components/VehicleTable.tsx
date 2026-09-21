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
  reservado: "Reservado",
};

/** Colores semánticos de estado — distintos del acento por categoría (Ignition/Teal). */
const STATUS_STYLES: Record<VehicleStatus, string> = {
  activo: "border-teal text-teal",
  vendido: "border-titanium text-titanium",
  borrador: "border-amber text-amber",
  reservado: "border-ignition text-ignition",
};

function StatusBadge({ status }: { status: VehicleStatus }): React.JSX.Element {
  return (
    <span
      className={`inline-flex border px-2.5 py-1 font-body text-[11px] font-medium uppercase tracking-wide ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function RowActions({ vehicle }: { vehicle: Vehicle }): React.JSX.Element {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/admin/vehiculos/${vehicle.id}/editar`}
        className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
      >
        Editar
      </Link>
      <DeleteVehicleButton vehicleId={vehicle.id} vehicleLabel={`${vehicle.brand} ${vehicle.model}`} />
    </div>
  );
}

/**
 * Tabla de inventario para el panel administrativo.
 * En pantallas < 640px, la tabla se reemplaza por una lista de
 * tarjetas apiladas con la misma información (manual de marca,
 * sección 17): evita el scroll horizontal forzado en móvil.
 */
export function VehicleTable({ vehicles }: VehicleTableProps): React.JSX.Element {
  if (vehicles.length === 0) {
    return (
      <div className="border border-dashed border-titanium/30 p-12 text-center font-body text-sm text-titanium">
        Todavía no hay vehículos registrados.
      </div>
    );
  }

  const th = "px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wide text-titanium";

  return (
    <>
      {/* Tabla — pantallas ≥ 640px */}
      <div className="hidden overflow-x-auto border border-titanium/15 sm:block">
        <table className="min-w-full text-sm">
          <thead className="bg-graphite">
            <tr>
              <th className={th}>Vehículo</th>
              <th className={th}>Año</th>
              <th className={th}>Kilometraje</th>
              <th className={th}>Precio</th>
              <th className={th}>Estado</th>
              <th className={th}>
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-titanium/10">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-4 py-3">
                  <p className="font-display text-sm font-bold text-alabaster">
                    {vehicle.brand} {vehicle.model}
                  </p>
                </td>
                <td className="px-4 py-3 font-mono text-titanium">{vehicle.year}</td>
                <td className="px-4 py-3 font-mono text-titanium">{formatKm(vehicle.mileageKm)}</td>
                <td className="px-4 py-3 font-mono text-alabaster">{formatCurrency(vehicle.price)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={vehicle.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end">
                    <RowActions vehicle={vehicle} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas apiladas — pantallas < 640px */}
      <div className="flex flex-col gap-3 sm:hidden">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border border-titanium/15 bg-graphite p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-bold text-alabaster">
                  {vehicle.brand} {vehicle.model}
                </p>
                <p className="mt-1 font-mono text-xs text-titanium">
                  {vehicle.year} · {formatKm(vehicle.mileageKm)}
                </p>
              </div>
              <StatusBadge status={vehicle.status} />
            </div>

            <p className="mt-3 font-mono text-lg text-alabaster">{formatCurrency(vehicle.price)}</p>

            <div className="mt-4 border-t border-titanium/10 pt-3">
              <RowActions vehicle={vehicle} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
