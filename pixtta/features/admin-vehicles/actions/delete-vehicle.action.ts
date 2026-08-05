"use server";

import { revalidatePath } from "next/cache";
import { getVehicleRepository } from "@/features/vehicles/services";

export async function deleteVehicleAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const repository = await getVehicleRepository();
  await repository.deleteVehicle(id);

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
}
