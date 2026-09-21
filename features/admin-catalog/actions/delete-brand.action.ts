"use server";

import { revalidatePath } from "next/cache";
import { getBrandRepository } from "@/features/vehicles/services";

export async function deleteBrandAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const repository = await getBrandRepository();
  await repository.deleteBrand(id);

  revalidatePath("/admin/marcas-categorias");
}