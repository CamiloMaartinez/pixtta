import type { PaginatedResponse, Result, Vehicle, VehicleFilters, VehicleInput } from "@/types";

/**
 * Contrato de acceso a datos de vehículos.
 *
 * Ningún componente o hook debe depender de Supabase directamente:
 * siempre deben depender de esta interfaz (principio de inversión
 * de dependencias). La implementación concreta se inyecta a través
 * de la fábrica en `features/vehicles/services/index.ts`.
 */
export interface VehicleRepository {
  /** Catálogo público — paginado, solo vehículos con status "activo". */
  getPublicVehicles(filters: VehicleFilters): Promise<Result<PaginatedResponse<Vehicle>>>;

  getVehicleBySlug(slug: string): Promise<Result<Vehicle | null>>;

  getAllVehicles(filters: VehicleFilters): Promise<Result<Vehicle[]>>;

  getVehicleById(id: string): Promise<Result<Vehicle | null>>;

  createVehicle(data: VehicleInput): Promise<Result<Vehicle>>;

  updateVehicle(id: string, data: VehicleInput): Promise<Result<Vehicle>>;

  deleteVehicle(id: string): Promise<Result<void>>;

  getDistinctColors(): Promise<Result<string[]>>;
}