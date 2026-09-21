import type { Vehicle } from "@/types";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
}

/**
 * Grilla responsive de vehículos, con su propio estado vacío.
 * No sabe de dónde vienen los datos (esa responsabilidad es de la página).
 */
export function VehicleGrid({ vehicles }: VehicleGridProps): React.JSX.Element {
  if (vehicles.length === 0) {
    return (
      <div className="border border-dashed border-titanium/30 p-12 text-center font-body text-sm text-titanium">
        No hay vehículos disponibles por el momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
