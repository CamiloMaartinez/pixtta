import { createClient } from "@/lib/supabase/server";
import { SupabaseVehicleRepository } from "./supabase-vehicle.repository";
import { SupabaseVehicleImageRepository } from "./vehicle-image.repository";
import type { VehicleRepository } from "./vehicle.repository";
import type { VehicleImageRepository } from "./vehicle-image.repository";

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

export type { VehicleRepository } from "./vehicle.repository";
export type { VehicleImageRepository } from "./vehicle-image.repository";
