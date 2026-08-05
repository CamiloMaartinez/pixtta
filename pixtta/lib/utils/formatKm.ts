/**
 * Formatea un kilometraje. 0 se muestra como "0 KM" (vehículo nuevo).
 * Ej: formatKm(15000) -> "15.000 km"
 */
export function formatKm(value: number): string {
  if (value === 0) return "0 KM";
  return `${value.toLocaleString("es-CO")} km`;
}
