/**
 * Tipos de dominio relacionados con el inventario de vehículos.
 * Reflejan el esquema definido en la sección 4 del documento de arquitectura.
 */

export type VehicleStatus = "activo" | "vendido" | "borrador";

export type VehicleCategory =
  | "sedan"
  | "suv"
  | "deportivo"
  | "electrico"
  | "moto"
  | "pickup";

export type FuelType = "gasolina" | "diesel" | "electrico" | "hibrido";

export type Transmission = "automatica" | "manual";

export interface VehicleImage {
  id: string;
  url: string;
  position: number;
  cloudinaryPublicId: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  price: number;
  mileageKm: number;
  horsepower: number;
  acceleration0To100: number;
  topSpeedKmh: number;
  engine: string;
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  description: string;
  status: VehicleStatus;
  isFeatured: boolean;
  images: VehicleImage[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Forma de los datos al crear o editar un vehículo desde el panel admin.
 * No incluye campos generados por el sistema (id, slug, timestamps, images).
 */
export interface VehicleInput {
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  price: number;
  mileageKm: number;
  horsepower: number;
  acceleration0To100: number;
  topSpeedKmh: number;
  engine: string;
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  description: string;
  status: VehicleStatus;
  isFeatured: boolean;
}

/**
 * Filtros usados tanto en el catálogo público como en la tabla admin.
 * Todos opcionales: su ausencia significa "sin filtrar por ese campo".
 */
export interface VehicleFilters {
  category?: VehicleCategory;
  search?: string;
  sort?: "precio-asc" | "precio-desc" | "año-desc";
  status?: VehicleStatus;
}
