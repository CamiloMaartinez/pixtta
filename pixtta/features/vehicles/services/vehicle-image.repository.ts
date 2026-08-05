import type { SupabaseClient } from "@supabase/supabase-js";
import type { Result, VehicleImage } from "@/types";

export interface NewVehicleImage {
  vehicleId: string;
  url: string;
  cloudinaryPublicId: string;
  position: number;
}

/**
 * Contrato de acceso a la tabla `vehicle_images`.
 * Separado de VehicleRepository a propósito (responsabilidad única):
 * las imágenes tienen su propio ciclo de vida (Cloudinary + tabla),
 * distinto al de los datos del vehículo.
 */
export interface VehicleImageRepository {
  addImage(data: NewVehicleImage): Promise<Result<VehicleImage>>;
  deleteImage(imageId: string): Promise<Result<{ cloudinaryPublicId: string }>>;
}

export class SupabaseVehicleImageRepository implements VehicleImageRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async addImage(data: NewVehicleImage): Promise<Result<VehicleImage>> {
    try {
      const { data: inserted, error } = await this.supabase
        .from("vehicle_images")
        .insert({
          vehicle_id: data.vehicleId,
          url: data.url,
          cloudinary_public_id: data.cloudinaryPublicId,
          position: data.position,
        })
        .select("id, url, position, cloudinary_public_id")
        .single();

      if (error) return { success: false, error: error.message };

      return {
        success: true,
        data: {
          id: inserted.id,
          url: inserted.url,
          position: inserted.position,
          cloudinaryPublicId: inserted.cloudinary_public_id,
        },
      };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async deleteImage(imageId: string): Promise<Result<{ cloudinaryPublicId: string }>> {
    try {
      const { data: existing, error: fetchError } = await this.supabase
        .from("vehicle_images")
        .select("cloudinary_public_id")
        .eq("id", imageId)
        .single();

      if (fetchError) return { success: false, error: fetchError.message };

      const { error: deleteError } = await this.supabase
        .from("vehicle_images")
        .delete()
        .eq("id", imageId);

      if (deleteError) return { success: false, error: deleteError.message };

      return {
        success: true,
        data: { cloudinaryPublicId: existing.cloudinary_public_id as string },
      };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}
