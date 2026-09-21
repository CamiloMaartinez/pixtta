"use server";

import { revalidatePath } from "next/cache";
import { getCategoryRepository } from "@/features/vehicles/services";

export async function createCategoryAction(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const repository = await getCategoryRepository();
  await repository.createCategory(name);

  revalidatePath("/admin/marcas-categorias");
}