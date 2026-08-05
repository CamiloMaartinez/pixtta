import type { Result, Vehicle, VehicleFilters, VehicleInput } from "@/types";

/**
 * Contrato de acceso a datos de vehículos.
 *
 * Ningún componente o hook debe depender de Supabase directamente:
 * siempre deben depender de esta interfaz (principio de inversión
 * de dependencias). La implementación concreta se inyecta a través
 * de la fábrica en `features/vehicles/services/index.ts`.
 */
export interface VehicleRepository {
  /** Catálogo público — solo vehículos con status "activo". */
  getPublicVehicles(filters: VehicleFilters): Promise<Result<Vehicle[]>>;

  /** Ficha técnica pública por slug. Devuelve null si no existe o no está activo. */
  getVehicleBySlug(slug: string): Promise<Result<Vehicle | null>>;

  /** Uso administrativo — incluye vehículos en cualquier estado. */
  getAllVehicles(filters: VehicleFilters): Promise<Result<Vehicle[]>>;

  /** Uso administrativo — trae un vehículo por id, en cualquier estado. */
  getVehicleById(id: string): Promise<Result<Vehicle | null>>;

  createVehicle(data: VehicleInput): Promise<Result<Vehicle>>;

  updateVehicle(id: string, data: VehicleInput): Promise<Result<Vehicle>>;

  deleteVehicle(id: string): Promise<Result<void>>;
}
