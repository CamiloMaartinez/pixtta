import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatKm } from "@/lib/utils/formatKm";
import { HudFrame } from "@/components/ui/HudFrame";

interface VehicleCardProps {
  vehicle: Vehicle;
}

/**
 * Tarjeta de presentación de un vehículo en el catálogo público.
 * El acento (Ignition/Teal) depende de la categoría: eléctrico usa
 * Teal, todo lo demás usa Ignition (manual de marca, sección 2).
 */
export function VehicleCard({ vehicle }: VehicleCardProps): React.JSX.Element {
  const coverImage = vehicle.images[0]?.url;
  const accent: "ignition" | "teal" = vehicle.category === "electrico" ? "teal" : "ignition";
  const hoverBorder = accent === "teal" ? "hover:border-teal" : "hover:border-ignition";

  return (
    <HudFrame accent={accent}>
      <Link
        href={`/vehiculo/${vehicle.slug}`}
        className={`block border border-titanium/15 bg-graphite transition-colors duration-200 ${hoverBorder}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-carbon">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="vehicle-photo object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-body text-xs font-medium uppercase tracking-wide text-titanium">
              Sin fotografía
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-wide text-titanium">
              {vehicle.brand}
            </p>
            <h3 className="font-display text-xl font-bold text-alabaster">{vehicle.model}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-titanium">
            <span>{vehicle.year}</span>
            <span>·</span>
            <span>{formatKm(vehicle.mileageKm)}</span>
            {vehicle.horsepower > 0 && (
              <>
                <span>·</span>
                <span>{vehicle.horsepower} HP</span>
              </>
            )}
          </div>

          <p className="mt-2 font-mono text-lg font-medium text-alabaster">
            {formatCurrency(vehicle.price)}
          </p>
        </div>
      </Link>
    </HudFrame>
  );
}
