import type { Vehicle } from "@/types";
import { formatKm } from "@/lib/utils/formatKm";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

const FUEL_LABELS: Record<Vehicle["fuelType"], string> = {
  gasolina: "Gasolina",
  diesel: "Diésel",
  electrico: "Eléctrico",
  hibrido: "Híbrido",
};

const TRANSMISSION_LABELS: Record<Vehicle["transmission"], string> = {
  automatica: "Automática",
  manual: "Manual",
};

/**
 * Lista de especificaciones técnicas del vehículo.
 * Componente puro, sin acceso a datos.
 */
export function VehicleSpecs({ vehicle }: VehicleSpecsProps): React.JSX.Element {
  const specs: Array<{ label: string; value: string }> = [
    { label: "Potencia", value: `${vehicle.horsepower} HP` },
    { label: "0–100 km/h", value: `${vehicle.acceleration0To100} s` },
    { label: "Velocidad máxima", value: `${vehicle.topSpeedKmh} km/h` },
    { label: "Motor", value: vehicle.engine },
    { label: "Combustible", value: FUEL_LABELS[vehicle.fuelType] },
    { label: "Transmisión", value: TRANSMISSION_LABELS[vehicle.transmission] },
    { label: "Color", value: vehicle.color },
    { label: "Kilometraje", value: formatKm(vehicle.mileageKm) },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="text-xs uppercase tracking-wide text-neutral-500">{spec.label}</dt>
          <dd className="mt-1 text-sm font-medium text-neutral-900">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
