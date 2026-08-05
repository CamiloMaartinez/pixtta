/**
 * Formatea un valor numérico como pesos colombianos.
 * Ej: formatCurrency(285000000) -> "$ 285.000.000"
 */
export function formatCurrency(value: number): string {
  return `$ ${value.toLocaleString("es-CO")}`;
}
