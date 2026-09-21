import { createClient } from "@/lib/supabase/server";
import { SupabaseVehicleRepository } from "./supabase-vehicle.repository";
import { SupabaseVehicleImageRepository } from "./vehicle-image.repository";
import { SupabaseBrandRepository } from "./brand.repository";
import { SupabaseCategoryRepository } from "./category.repository";
import type { VehicleRepository } from "./vehicle.repository";
import type { VehicleImageRepository } from "./vehicle-image.repository";
import type { BrandRepository } from "./brand.repository";
import type { CategoryRepository } from "./category.repository";

/**
 * Fábrica del repositorio de vehículos para uso en Server Components,
 * Server Actions y Route Handlers.
 *
 * Los componentes/hooks nunca importan Supabase ni la implementación
 * concreta directamente: siempre pasan por aquí y programan contra
 * la interfaz `VehicleRepository`.
 */
export async function getVehicleRepository(): Promise<VehicleRepository> {
  const supabase = await createClient();
  return new SupabaseVehicleRepository(supabase);
}

/** Fábrica equivalente para el repositorio de imágenes de vehículo. */
export async function getVehicleImageRepository(): Promise<VehicleImageRepository> {
  const supabase = await createClient();
  return new SupabaseVehicleImageRepository(supabase);
}

/** Fábrica equivalente para el repositorio de marcas. */
export async function getBrandRepository(): Promise<BrandRepository> {
  const supabase = await createClient();
  return new SupabaseBrandRepository(supabase);
}

/** Fábrica equivalente para el repositorio de categorías. */
export async function getCategoryRepository(): Promise<CategoryRepository> {
  const supabase = await createClient();
  return new SupabaseCategoryRepository(supabase);
}

export type { VehicleRepository } from "./vehicle.repository";
export type { VehicleImageRepository } from "./vehicle-image.repository";
export type { BrandRepository } from "./brand.repository";
export type { CategoryRepository } from "./category.repository";