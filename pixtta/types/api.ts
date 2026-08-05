/**
 * Tipos genéricos reutilizables en toda la capa de servicios.
 */

/**
 * Representa el resultado de una operación que puede fallar,
 * sin recurrir a excepciones para el flujo normal de control.
 *
 * Uso típico:
 *   const result = await vehicleRepository.createVehicle(input);
 *   if (!result.success) {
 *     // manejar result.error
 *   }
 */
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
