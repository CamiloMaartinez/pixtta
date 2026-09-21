import { z } from "zod";
import type { SocialPlatform } from "@/types";

export const SOCIAL_PLATFORMS: { platform: SocialPlatform; label: string }[] = [
  { platform: "whatsapp", label: "WhatsApp" },
  { platform: "instagram", label: "Instagram" },
  { platform: "facebook", label: "Facebook" },
  { platform: "tiktok", label: "TikTok" },
  { platform: "mercadolibre", label: "Mercado Libre" },
];

export const dealershipSchema = z.object({
  name: z.string().trim().min(2, "Ingresa el nombre."),
  slogan: z.string().trim().max(120, "Máximo 120 caracteres."),
  description: z.string().trim().min(10, "Escribe una descripción de al menos 10 caracteres."),
  address: z.string().trim().min(3, "Ingresa la dirección."),
  city: z.string().trim().min(2, "Ingresa la ciudad."),
  region: z.string().trim().min(2, "Ingresa el departamento."),
  country: z.string().trim().min(2, "Ingresa el país."),
  latitude: z.coerce.number({ invalid_type_error: "Latitud inválida." }).min(-90).max(90),
  longitude: z.coerce.number({ invalid_type_error: "Longitud inválida." }).min(-180).max(180),
  phone: z.string().trim().min(7, "Ingresa un teléfono válido."),
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Solo dígitos con indicativo, ej. 573167989657."),
});

export type DealershipInput = z.infer<typeof dealershipSchema>;

export function parseDealershipFormData(formData: FormData) {
  return dealershipSchema.safeParse(Object.fromEntries(formData));
}

const httpsUrl = z
  .string()
  .trim()
  .url("Ingresa una URL válida.")
  .refine((value) => value.startsWith("https://"), "La URL debe empezar con https://");

export interface SocialLinkInput {
  platform: SocialPlatform;
  url: string;
  isActive: boolean;
}

/** Lee `url_<plataforma>` y `active_<plataforma>` del formulario de redes. */
export function parseSocialLinksFormData(
  formData: FormData
):
  | { success: true; data: SocialLinkInput[] }
  | { success: false; fieldErrors: Record<string, string[]> } {
  const data: SocialLinkInput[] = [];
  const fieldErrors: Record<string, string[]> = {};

  for (const { platform } of SOCIAL_PLATFORMS) {
    const parsed = httpsUrl.safeParse(formData.get(`url_${platform}`) ?? "");
    if (!parsed.success) {
      fieldErrors[platform] = parsed.error.issues.map((issue) => issue.message);
      continue;
    }
    data.push({
      platform,
      url: parsed.data,
      isActive: formData.get(`active_${platform}`) === "on",
    });
  }

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors };
  return { success: true, data };
}
