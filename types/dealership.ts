/**
 * Información global del concesionario y sus redes. Se lee de las tablas
 * `dealership_info` y `social_links` (supabase/migrations/0005_*.sql), con
 * respaldo en lib/constants/social.ts si la base de datos no responde.
 */

export type SocialPlatform =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "mercadolibre";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface DealershipProfile {
  name: string;
  slogan: string;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  /** Teléfono legible, ej. "+57 316 798 9657". */
  phone: string;
  /** Solo dígitos con indicativo, ej. "573167989657" (para wa.me). */
  whatsappNumber: string;
  socialLinks: SocialLink[];
}
