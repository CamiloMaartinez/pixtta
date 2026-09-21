import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { DEFAULT_DEALERSHIP, DEFAULT_SOCIAL_LINKS } from "@/lib/constants/social";
import type { DealershipProfile, SocialLink, SocialPlatform } from "@/types";

const PLATFORMS: readonly SocialPlatform[] = [
  "whatsapp",
  "instagram",
  "facebook",
  "tiktok",
  "mercadolibre",
];

interface DealershipRow {
  name: string;
  slogan: string | null;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  whatsapp_number: string | null;
}

interface SocialLinkRow {
  platform: string;
  label: string;
  url: string;
}

async function fetchDealershipProfile(): Promise<DealershipProfile> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return DEFAULT_DEALERSHIP;
  }

  try {
    const supabase = createPublicClient();
    const [infoResult, linksResult] = await Promise.all([
      supabase
        .from("dealership_info")
        .select(
          "name, slogan, description, address, city, region, country, latitude, longitude, phone, whatsapp_number"
        )
        .eq("id", 1)
        .maybeSingle(),
      supabase
        .from("social_links")
        .select("platform, label, url")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

    const info = infoResult.data as DealershipRow | null;
    const links = ((linksResult.data ?? []) as SocialLinkRow[]).filter(
      (row): row is SocialLinkRow & { platform: SocialPlatform } =>
        (PLATFORMS as readonly string[]).includes(row.platform)
    );

    const socialLinks: SocialLink[] = links.length > 0 ? links : DEFAULT_SOCIAL_LINKS;

    if (!info) return { ...DEFAULT_DEALERSHIP, socialLinks };

    return {
      name: info.name,
      slogan: info.slogan ?? DEFAULT_DEALERSHIP.slogan,
      description: info.description,
      address: info.address,
      city: info.city,
      region: info.region,
      country: info.country,
      latitude: info.latitude ?? DEFAULT_DEALERSHIP.latitude,
      longitude: info.longitude ?? DEFAULT_DEALERSHIP.longitude,
      phone: info.phone ?? DEFAULT_DEALERSHIP.phone,
      whatsappNumber: info.whatsapp_number ?? DEFAULT_DEALERSHIP.whatsappNumber,
      socialLinks,
    };
  } catch {
    return DEFAULT_DEALERSHIP;
  }
}

/**
 * Perfil público del concesionario (contacto, ubicación y redes).
 * Nunca lanza: si Supabase no responde devuelve los valores de
 * lib/constants/social.ts. Cacheado 1 h; se invalida con el tag "dealership".
 */
export const getDealershipProfile = unstable_cache(
  fetchDealershipProfile,
  ["dealership-profile"],
  { revalidate: 3600, tags: ["dealership"] }
);

/** Dirección completa en una línea, ej. "Blvr. Bolívar #25-47, Bucaramanga, Santander, Colombia". */
export function formatFullAddress(profile: DealershipProfile): string {
  return `${profile.address}, ${profile.city}, ${profile.region}, ${profile.country}`;
}
