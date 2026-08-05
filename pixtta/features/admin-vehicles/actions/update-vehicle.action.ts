"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getVehicleRepository } from "@/features/vehicles/services";
import { parseVehicleFormData } from "../schemas/vehicle.schema";
import type { VehicleFormState } from "../types";

export async function updateVehicleAction(
  _prevState: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { error: "Falta el identificador del vehículo." };
  }

  const parsed = parseVehicleFormData(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const repository = await getVehicleRepository();
  const result = await repository.updateVehicle(id, parsed.data);

  if (!result.success) {
    return { error: result.error };
  }

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
  revalidatePath(`/vehiculo/${result.data.slug}`);
  redirect("/admin/vehiculos");
}
