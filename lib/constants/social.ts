/**
 * Datos reales de contacto y redes de Pixtta (fuente: MercadoLibre,
 * Facebook y Linktree). Sirven de respaldo cuando las tablas
 * `dealership_info` / `social_links` no responden, y como valores por
 * defecto para los helpers de mapas.
 */

import type { DealershipProfile, SocialLink } from "@/types";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573167989657";

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: "https://www.instagram.com/pixtta",
  facebook: "https://www.facebook.com/profile.php?id=61553097972517",
  tiktok: "https://www.tiktok.com/@pixtta_premium",
  mercadoLibre: "https://www.mercadolibre.com.co/pagina/pixtta",
} as const;

/**
 * Perfil de Instagram (captura del 20-sep-2026). Las cifras se desactualizan:
 * ajústalas cuando quieras. Se muestran redondeadas hacia abajo ("+1.900").
 */
export const INSTAGRAM = {
  handle: "@pixtta",
  displayName: "PIXTTA | AUTOS PREMIUM",
  category: "Concesionario de automóviles",
  bio: "Exclusive Garage Shop. Vendemos e importamos tu vehículo soñado. Distribuidor autorizado Can-Am | Sea-Doo.",
  followers: 1982,
  posts: 550,
} as const;

export const LOCATION = {
  address: "Blvr. Bolívar #25-47, Bucaramanga, Santander, Colombia",
  lat: 7.1282642,
  lng: -73.1204042,
} as const;

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: "whatsapp", label: "WhatsApp", url: SOCIAL_LINKS.whatsapp },
  { platform: "instagram", label: "Instagram", url: SOCIAL_LINKS.instagram },
  { platform: "facebook", label: "Facebook", url: SOCIAL_LINKS.facebook },
  { platform: "tiktok", label: "TikTok", url: SOCIAL_LINKS.tiktok },
  { platform: "mercadolibre", label: "Mercado Libre", url: SOCIAL_LINKS.mercadoLibre },
];

export const DEFAULT_DEALERSHIP: DealershipProfile = {
  name: "Pixtta",
  slogan: "Pasión por los motores",
  description:
    "Exclusive Garage Shop: tu concesionario de autos premium en Bucaramanga. Vendemos e importamos tu vehículo soñado. Distribuidores autorizados de Can-Am y Sea-Doo, con 14 años de confianza en Santander.",
  address: "Blvr. Bolívar #25-47",
  city: "Bucaramanga",
  region: "Santander",
  country: "Colombia",
  latitude: LOCATION.lat,
  longitude: LOCATION.lng,
  phone: "+57 316 798 9657",
  whatsappNumber: WHATSAPP_NUMBER,
  socialLinks: DEFAULT_SOCIAL_LINKS,
};

interface Coordinates {
  lat: number;
  lng: number;
}

export function buildGoogleMapsLink({ lat, lng }: Coordinates = LOCATION): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function buildGoogleMapsEmbedSrc({ lat, lng }: Coordinates = LOCATION): string {
  return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
}

export function buildWazeLink({ lat, lng }: Coordinates = LOCATION): string {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}
