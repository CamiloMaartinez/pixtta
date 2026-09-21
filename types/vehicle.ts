export type VehicleStatus = "activo" | "vendido" | "borrador" | "reservado";

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
  category: string;
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
  traccion?: string | null;
  carroceria?: string | null;
  puertas?: number | null;
  version?: string | null;
  placaTerminadaEn?: string | null;
  origenPlaca?: string | null;
  modelYear?: number | null;
  documentosVigentesHasta?: string | null;
  seats?: number | null;
  images: VehicleImage[];
  createdAt: string;
  updatedAt: string;
}

export interface VehicleInput {
  brand: string;
  model: string;
  year: number;
  category: string;
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
  traccion?: string | null;
  carroceria?: string | null;
  puertas?: number | null;
  version?: string | null;
  placaTerminadaEn?: string | null;
  origenPlaca?: string | null;
  modelYear?: number | null;
  documentosVigentesHasta?: string | null;
  seats?: number | null;
}

export interface VehicleFilters {
  category?: string;
  search?: string;
  sort?: "precio-asc" | "precio-desc" | "año-desc";
  status?: VehicleStatus;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  color?: string;
  seats?: number;
  page?: number;
  pageSize?: number;
}