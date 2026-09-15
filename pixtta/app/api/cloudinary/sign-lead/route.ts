import { NextResponse } from "next/server";
import { getImageService } from "@/features/media/services/image.service";

/**
 * Firma de subida para Cloudinary, expuesta sin autenticación para el
 * formulario público /vender. A diferencia de /api/cloudinary/sign
 * (admin), sube a una carpeta separada (`pixtta/leads`) precisamente
 * porque cualquier visitante puede invocarla.
 */
export async function POST(): Promise<NextResponse> {
  const imageService = getImageService();
  const signature = imageService.createLeadUploadSignature();

  return NextResponse.json(signature);
}
