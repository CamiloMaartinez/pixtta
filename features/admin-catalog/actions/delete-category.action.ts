"use server";

import { revalidatePath } from "next/cache";
import { getCategoryRepository } from "@/features/vehicles/services";

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const repository = await getCategoryRepository();
  await repository.deleteCategory(id);

  revalidatePath("/admin/marcas-categorias");
}