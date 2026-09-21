"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parseDealershipFormData } from "../schemas/dealership.schema";
import type { DealershipFormState } from "../types";

function revalidatePublicPages(): void {
  revalidateTag("dealership");
  revalidatePath("/", "layout");
}

export async function updateDealershipAction(
  _prevState: DealershipFormState,
  formData: FormData
): Promise<DealershipFormState> {
  const parsed = parseDealershipFormData(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { whatsappNumber, ...rest } = parsed.data;
  const supabase = await createClient();

  // RLS solo deja escribir a admins: si no lo es, la consulta devuelve 0 filas sin error.
  const { data, error } = await supabase
    .from("dealership_info")
    .upsert(
      {
        id: 1,
        ...rest,
        slogan: rest.slogan || null,
        whatsapp_number: whatsappNumber,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("id");

  if (error) return { error: error.message };
  if (!data || data.length === 0) {
    return { error: "No tienes permisos de administrador para editar esta información." };
  }

  revalidatePublicPages();
  revalidatePath("/admin/concesionario");
  return { success: true };
}
