"use server";

import { revalidatePath } from "next/cache";
import { getVehicleImageRepository } from "@/features/vehicles/services";

export async function addVehicleImageAction(
  vehicleId: string,
  url: string,
  cloudinaryPublicId: string,
  position: number
): Promise<{ error?: string }> {
  const repository = await getVehicleImageRepository();
  const result = await repository.addImage({ vehicleId, url, cloudinaryPublicId, position });

  if (!result.success) {
    return { error: result.error };
  }

  revalidatePath(`/admin/vehiculos/${vehicleId}/editar`);
  revalidatePath("/catalogo");
  return {};
}
