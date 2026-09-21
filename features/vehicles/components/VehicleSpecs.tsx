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

interface Spec {
  label: string;
  value: string;
  /** Manual de marca, sección 16: los números van en Data (mono), las palabras en Body. */
  numeric: boolean;
}

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Lista de especificaciones técnicas del vehículo.
 * Los campos del mercado colombiano (tracción, carrocería, etc.) solo
 * se muestran cuando el vehículo los tiene cargados — son opcionales.
 * Componente puro, sin acceso a datos.
 */
export function VehicleSpecs({ vehicle }: VehicleSpecsProps): React.JSX.Element {
  // Los datos que aún no están cargados (0 o vacío) no se muestran: evita "0 HP", "0 s" o un motor en blanco.
  const baseSpecs: Spec[] = [
    vehicle.horsepower > 0
      ? { label: "Potencia", value: `${vehicle.horsepower} HP`, numeric: true }
      : null,
    vehicle.acceleration0To100 > 0
      ? { label: "0–100 km/h", value: `${vehicle.acceleration0To100} s`, numeric: true }
      : null,
    vehicle.topSpeedKmh > 0
      ? { label: "Velocidad máxima", value: `${vehicle.topSpeedKmh} km/h`, numeric: true }
      : null,
    vehicle.engine ? { label: "Motor", value: vehicle.engine, numeric: false } : null,
    { label: "Combustible", value: FUEL_LABELS[vehicle.fuelType], numeric: false },
    { label: "Transmisión", value: TRANSMISSION_LABELS[vehicle.transmission], numeric: false },
    vehicle.color ? { label: "Color", value: vehicle.color, numeric: false } : null,
    { label: "Kilometraje", value: formatKm(vehicle.mileageKm), numeric: true },
  ].filter((spec): spec is Spec => spec !== null);

  const optionalSpecs: Spec[] = [
    vehicle.modelYear ? { label: "Modelo", value: String(vehicle.modelYear), numeric: true } : null,
    vehicle.traccion ? { label: "Tracción", value: vehicle.traccion, numeric: false } : null,
    vehicle.carroceria ? { label: "Carrocería", value: vehicle.carroceria, numeric: false } : null,
    vehicle.puertas ? { label: "Puertas", value: String(vehicle.puertas), numeric: true } : null,
    vehicle.version ? { label: "Versión", value: vehicle.version, numeric: false } : null,
    vehicle.placaTerminadaEn
      ? { label: "Placa terminada en", value: vehicle.placaTerminadaEn, numeric: true }
      : null,
    vehicle.origenPlaca
      ? { label: "Origen de placa", value: vehicle.origenPlaca, numeric: false }
      : null,
    vehicle.documentosVigentesHasta
      ? {
          label: "Documentos vigentes hasta",
          value: formatDate(vehicle.documentosVigentesHasta),
          numeric: false,
        }
      : null,
  ].filter((spec): spec is Spec => spec !== null);

  const specs = [...baseSpecs, ...optionalSpecs];

  return (
    <dl className="grid grid-cols-2 gap-5 border-t border-titanium/10 pt-6 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            {spec.label}
          </dt>
          <dd
            className={`mt-1 break-words text-sm text-alabaster ${
              spec.numeric ? "font-mono font-medium" : "font-body font-medium"
            }`}
          >
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
