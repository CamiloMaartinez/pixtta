import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_DEALERSHIP, DEFAULT_SOCIAL_LINKS } from "@/lib/constants/social";
import { DealershipForm } from "@/features/admin-dealership/components/DealershipForm";
import {
  SocialLinksForm,
  type SocialLinkValue,
} from "@/features/admin-dealership/components/SocialLinksForm";
import type { SocialPlatform } from "@/types";

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

export default async function ConcesionarioAdminPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();

  const [infoResult, linksResult] = await Promise.all([
    supabase
      .from("dealership_info")
      .select(
        "name, slogan, description, address, city, region, country, latitude, longitude, phone, whatsapp_number"
      )
      .eq("id", 1)
      .maybeSingle(),
    supabase.from("social_links").select("platform, url, is_active"),
  ]);

  const tablesMissing = Boolean(infoResult.error || linksResult.error);
  const info = infoResult.data as DealershipRow | null;

  const profile = {
    name: info?.name ?? DEFAULT_DEALERSHIP.name,
    slogan: info?.slogan ?? DEFAULT_DEALERSHIP.slogan,
    description: info?.description ?? DEFAULT_DEALERSHIP.description,
    address: info?.address ?? DEFAULT_DEALERSHIP.address,
    city: info?.city ?? DEFAULT_DEALERSHIP.city,
    region: info?.region ?? DEFAULT_DEALERSHIP.region,
    country: info?.country ?? DEFAULT_DEALERSHIP.country,
    latitude: info?.latitude ?? DEFAULT_DEALERSHIP.latitude,
    longitude: info?.longitude ?? DEFAULT_DEALERSHIP.longitude,
    phone: info?.phone ?? DEFAULT_DEALERSHIP.phone,
    whatsappNumber: info?.whatsapp_number ?? DEFAULT_DEALERSHIP.whatsappNumber,
  };

  const saved = new Map(
    ((linksResult.data ?? []) as { platform: string; url: string; is_active: boolean }[]).map(
      (row) => [row.platform, row]
    )
  );

  const socialValues = Object.fromEntries(
    DEFAULT_SOCIAL_LINKS.map((fallback) => {
      const row = saved.get(fallback.platform);
      const value: SocialLinkValue = {
        url: row?.url ?? fallback.url,
        isActive: row?.is_active ?? true,
      };
      return [fallback.platform, value];
    })
  ) as Record<SocialPlatform, SocialLinkValue>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/admin"
        className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
      >
        ← Panel administrativo
      </Link>
      <h1 className="mt-1 mb-2 font-display text-2xl font-extrabold uppercase text-alabaster">
        Concesionario y redes
      </h1>
      <p className="mb-8 font-body text-xs text-titanium">
        Lo que guardes aquí aparece en el pie de página, en Contacto, en Información y en los
        botones de WhatsApp del sitio público.
      </p>

      {tablesMissing && (
        <p
          role="alert"
          className="mb-8 border border-amber/40 px-4 py-3 font-body text-sm text-amber"
        >
          Las tablas <code>dealership_info</code> y <code>social_links</code> todavía no existen o
          no se pueden leer. Ejecuta <code>supabase/migrations/0005_dealership_info_and_social_links.sql</code>{" "}
          en el SQL Editor de Supabase antes de guardar.
        </p>
      )}

      <section>
        <h2 className="mb-4 font-display text-lg font-bold uppercase text-alabaster">
          Información
        </h2>
        <DealershipForm profile={profile} />
      </section>

      <section className="mt-12 border-t border-titanium/10 pt-10">
        <h2 className="mb-4 font-display text-lg font-bold uppercase text-alabaster">
          Redes sociales
        </h2>
        <SocialLinksForm values={socialValues} />
      </section>
    </main>
  );
}
