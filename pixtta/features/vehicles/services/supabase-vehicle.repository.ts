import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  FuelType,
  Result,
  Transmission,
  Vehicle,
  VehicleCategory,
  VehicleFilters,
  VehicleInput,
  VehicleStatus,
} from "@/types";
import { slugify } from "@/lib/utils/slugify";
import type { VehicleRepository } from "./vehicle.repository";

/** Forma cruda de una fila de `vehicles` unida con sus imágenes. */
interface VehicleRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number | string;
  mileage_km: number;
  horsepower: number;
  acceleration_0_100: number | string | null;
  top_speed_kmh: number | null;
  engine: string;
  fuel_type: string;
  transmission: string;
  color: string;
  description: string;
  status: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  vehicle_images: Array<{ id: string; url: string; position: number; cloudinary_public_id: string }> | null;
}

const VEHICLE_SELECT = "*, vehicle_images(id, url, position, cloudinary_public_id)";

function mapRowToVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    category: row.category as VehicleCategory,
    price: Number(row.price),
    mileageKm: row.mileage_km,
    horsepower: row.horsepower,
    acceleration0To100: row.acceleration_0_100 ? Number(row.acceleration_0_100) : 0,
    topSpeedKmh: row.top_speed_kmh ?? 0,
    engine: row.engine,
    fuelType: row.fuel_type as FuelType,
    transmission: row.transmission as Transmission,
    color: row.color,
    description: row.description,
    status: row.status as VehicleStatus,
    isFeatured: row.is_featured,
    images: (row.vehicle_images ?? [])
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((img) => ({
        id: img.id,
        url: img.url,
        position: img.position,
        cloudinaryPublicId: img.cloudinary_public_id,
      })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toInsertRecord(data: VehicleInput, slug: string) {
  return {
    slug,
    brand: data.brand,
    model: data.model,
    year: data.year,
    category: data.category,
    price: data.price,
    mileage_km: data.mileageKm,
    horsepower: data.horsepower,
    acceleration_0_100: data.acceleration0To100,
    top_speed_kmh: data.topSpeedKmh,
    engine: data.engine,
    fuel_type: data.fuelType,
    transmission: data.transmission,
    color: data.color,
    description: data.description,
    status: data.status,
    is_featured: data.isFeatured,
  };
}

export class SupabaseVehicleRepository implements VehicleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private applyFilters(query: any, filters: VehicleFilters) {
    let q = query;

    if (filters.category) {
      q = q.eq("category", filters.category);
    }

    if (filters.search && filters.search.trim().length > 0) {
      const term = filters.search.trim();
      q = q.or(`brand.ilike.%${term}%,model.ilike.%${term}%`);
    }

    switch (filters.sort) {
      case "precio-asc":
        q = q.order("price", { ascending: true });
        break;
      case "precio-desc":
        q = q.order("price", { ascending: false });
        break;
      case "año-desc":
        q = q.order("year", { ascending: false });
        break;
      default:
        q = q.order("created_at", { ascending: false });
    }

    return q;
  }

  async getPublicVehicles(filters: VehicleFilters): Promise<Result<Vehicle[]>> {
    try {
      let query = this.supabase
        .from("vehicles")
        .select(VEHICLE_SELECT)
        .eq("status", "activo");

      query = this.applyFilters(query, filters);

      const { data, error } = await query;
      if (error) return { success: false, error: error.message };

      return { success: true, data: (data as VehicleRow[]).map(mapRowToVehicle) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async getVehicleBySlug(slug: string): Promise<Result<Vehicle | null>> {
    try {
      const { data, error } = await this.supabase
        .from("vehicles")
        .select(VEHICLE_SELECT)
        .eq("slug", slug)
        .eq("status", "activo")
        .maybeSingle();

      if (error) return { success: false, error: error.message };
      if (!data) return { success: true, data: null };

      return { success: true, data: mapRowToVehicle(data as VehicleRow) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async getAllVehicles(filters: VehicleFilters): Promise<Result<Vehicle[]>> {
    try {
      let query = this.supabase.from("vehicles").select(VEHICLE_SELECT);

      if (filters.status) {
        query = query.eq("status", filters.status);
      }
      query = this.applyFilters(query, filters);

      const { data, error } = await query;
      if (error) return { success: false, error: error.message };

      return { success: true, data: (data as VehicleRow[]).map(mapRowToVehicle) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async getVehicleById(id: string): Promise<Result<Vehicle | null>> {
    try {
      const { data, error } = await this.supabase
        .from("vehicles")
        .select(VEHICLE_SELECT)
        .eq("id", id)
        .maybeSingle();

      if (error) return { success: false, error: error.message };
      if (!data) return { success: true, data: null };

      return { success: true, data: mapRowToVehicle(data as VehicleRow) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async createVehicle(data: VehicleInput): Promise<Result<Vehicle>> {
    try {
      const baseSlug = slugify(data.brand, data.model, data.year);
      let slug = baseSlug;

      const { data: inserted, error } = await this.supabase
        .from("vehicles")
        .insert(toInsertRecord(data, slug))
        .select(VEHICLE_SELECT)
        .single();

      if (error?.code === "23505") {
        // slug duplicado: se agrega un sufijo corto y se reintenta una vez
        slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
        const retry = await this.supabase
          .from("vehicles")
          .insert(toInsertRecord(data, slug))
          .select(VEHICLE_SELECT)
          .single();

        if (retry.error) return { success: false, error: retry.error.message };
        return { success: true, data: mapRowToVehicle(retry.data as VehicleRow) };
      }

      if (error) return { success: false, error: error.message };

      return { success: true, data: mapRowToVehicle(inserted as VehicleRow) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async updateVehicle(id: string, data: VehicleInput): Promise<Result<Vehicle>> {
    try {
      const { data: updated, error } = await this.supabase
        .from("vehicles")
        .update({
          brand: data.brand,
          model: data.model,
          year: data.year,
          category: data.category,
          price: data.price,
          mileage_km: data.mileageKm,
          horsepower: data.horsepower,
          acceleration_0_100: data.acceleration0To100,
          top_speed_kmh: data.topSpeedKmh,
          engine: data.engine,
          fuel_type: data.fuelType,
          transmission: data.transmission,
          color: data.color,
          description: data.description,
          status: data.status,
          is_featured: data.isFeatured,
        })
        .eq("id", id)
        .select(VEHICLE_SELECT)
        .single();

      if (error) return { success: false, error: error.message };

      return { success: true, data: mapRowToVehicle(updated as VehicleRow) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async deleteVehicle(id: string): Promise<Result<void>> {
    try {
      const { error } = await this.supabase.from("vehicles").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}
