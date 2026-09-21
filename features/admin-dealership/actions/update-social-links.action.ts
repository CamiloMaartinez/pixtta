"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SOCIAL_PLATFORMS, parseSocialLinksFormData } from "../schemas/dealership.schema";
import type { DealershipFormState } from "../types";

export async function updateSocialLinksAction(
  _prevState: DealershipFormState,
  formData: FormData
): Promise<DealershipFormState> {
  const parsed = parseSocialLinksFormData(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.fieldErrors };
  }

  const rows = parsed.data.map((link) => {
    const index = SOCIAL_PLATFORMS.findIndex((item) => item.platform === link.platform);
    return {
      platform: link.platform,
      label: SOCIAL_PLATFORMS[index]?.label ?? link.platform,
      url: link.url,
      sort_order: index + 1,
      is_active: link.isActive,
    };
  });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .upsert(rows, { onConflict: "platform" })
    .select("platform");

  if (error) return { error: error.message };
  if (!data || data.length !== rows.length) {
    return { error: "No tienes permisos de administrador para editar las redes." };
  }

  revalidateTag("dealership");
  revalidatePath("/", "layout");
  revalidatePath("/admin/concesionario");
  return { success: true };
}
