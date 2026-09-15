/**
 * Formatea una fecha ISO como fecha y hora corta en español (Colombia).
 * Ej: formatDate("2026-09-15T10:00:00Z") -> "15 sept 2026, 10:00 a. m."
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
