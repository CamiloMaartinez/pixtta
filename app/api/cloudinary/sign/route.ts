import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getImageService } from "@/features/media/services/image.service";

/**
 * Genera una firma de subida para Cloudinary. La API secret nunca sale
 * del servidor. Protegido manualmente porque las rutas /api no pasan
 * por el middleware de /admin/**.
 */
export async function POST(): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminRow) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const imageService = getImageService();
  const signature = imageService.createUploadSignature();

  return NextResponse.json(signature);
}
