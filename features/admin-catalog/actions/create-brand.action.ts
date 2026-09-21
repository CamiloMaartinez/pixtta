"use server";

import { revalidatePath } from "next/cache";
import { getBrandRepository } from "@/features/vehicles/services";

export async function createBrandAction(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const repository = await getBrandRepository();
  await repository.createBrand(name);

  revalidatePath("/admin/marcas-categorias");
}