"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getVehicleRepository } from "@/features/vehicles/services";
import { parseVehicleFormData } from "../schemas/vehicle.schema";
import type { VehicleFormState } from "../types";

export async function createVehicleAction(
  _prevState: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const parsed = parseVehicleFormData(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const repository = await getVehicleRepository();
  const result = await repository.createVehicle(parsed.data);

  if (!result.success) {
    return { error: result.error };
  }

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
  redirect("/admin/vehiculos");
}
