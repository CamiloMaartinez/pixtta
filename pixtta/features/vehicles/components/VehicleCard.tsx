import Link from "next/link";
import type { Vehicle } from "@/types";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatKm } from "@/lib/utils/formatKm";

interface VehicleCardProps {
  vehicle: Vehicle;
}

/**
 * Tarjeta de presentación de un vehículo en el catálogo público.
 * Componente puro: solo recibe datos y los muestra, sin lógica de
 * filtrado ni acceso a datos.
 */
export function VehicleCard({ vehicle }: VehicleCardProps): React.JSX.Element {
  const coverImage = vehicle.images[0]?.url;

  return (
    <Link
      href={`/vehiculo/${vehicle.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-titanium/30 bg-graphite"
    >
      <div className="relative aspect-[4/3] w-full bg-carbon">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-titanium">
            Sin fotografía
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-titanium">{vehicle.brand}</p>
          <h3 className="font-display text-lg text-alabaster">{vehicle.model}</h3>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-titanium">
          <span>{vehicle.year}</span>
          <span>{formatKm(vehicle.mileageKm)}</span>
          <span>{vehicle.horsepower} HP</span>
        </div>

        <p className="mt-auto text-lg font-bold text-alabaster">
          {formatCurrency(vehicle.price)}
        </p>
      </div>
    </Link>
  );
}
