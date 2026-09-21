import { getDealershipProfile } from "@/features/dealership/services/dealership.service";

/**
 * Datos estructurados schema.org (AutoDealer) para que Google muestre
 * dirección, teléfono y perfiles oficiales del concesionario.
 */
export async function DealershipJsonLd(): Promise<React.JSX.Element> {
  const profile = await getDealershipProfile();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: profile.name,
    description: profile.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    telephone: `+${profile.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: profile.address,
      addressLocality: profile.city,
      addressRegion: profile.region,
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: profile.latitude,
      longitude: profile.longitude,
    },
    sameAs: profile.socialLinks
      .filter((link) => link.platform !== "whatsapp")
      .map((link) => link.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
