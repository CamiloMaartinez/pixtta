"use server";

import { revalidatePath } from "next/cache";
import { getVehicleImageRepository } from "@/features/vehicles/services";
import { getImageService } from "@/features/media/services/image.service";

export async function deleteVehicleImageAction(
  imageId: string,
  vehicleId: string
): Promise<{ error?: string }> {
  const repository = await getVehicleImageRepository();
  const result = await repository.deleteImage(imageId);

  if (!result.success) {
    return { error: result.error };
  }

  const imageService = getImageService();
  await imageService.deleteImage(result.data.cloudinaryPublicId);

  revalidatePath(`/admin/vehiculos/${vehicleId}/editar`);
  revalidatePath("/catalogo");
  return {};
}
