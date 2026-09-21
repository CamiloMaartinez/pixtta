import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Logo } from "@/components/ui/Logo";
import { buildWhatsappLink } from "@/lib/utils/buildWhatsappLink";
import { buildGoogleMapsLink } from "@/lib/constants/social";
import { getDealershipProfile, formatFullAddress } from "@/features/dealership/services/dealership.service";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/marcas", label: "Marcas" },
  { href: "/informacion", label: "Información" },
  { href: "/contacto", label: "Contacto" },
];

const COLUMN_TITLE_CLASS =
  "font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium";
const LINK_CLASS =
  "font-body text-sm text-alabaster/80 transition-colors duration-150 ease-out hover:text-ignition";

/**
 * Pie de página del sitio público. Datos antes que adjetivos,
 * consistente con el tono de voz del manual de marca. Contacto y
 * redes vienen de `dealership_info` / `social_links`.
 */
export async function Footer(): Promise<React.JSX.Element> {
  const profile = await getDealershipProfile();
  const whatsappLink = buildWhatsappLink(profile.whatsappNumber);
  const phoneHref = `tel:+${profile.whatsappNumber}`;

  return (
    <footer className="border-t border-titanium/10 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo variant="full" height={44} />
          <p className="mt-4 max-w-md font-body text-sm text-titanium">{profile.description}</p>

          <ul className="mt-5 flex flex-wrap gap-3">
            {profile.socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.platform === "whatsapp" ? whatsappLink : link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-11 w-11 items-center justify-center border border-titanium/20 sm:h-10 sm:w-10 text-titanium transition-colors duration-150 ease-out hover:border-ignition hover:text-ignition"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={COLUMN_TITLE_CLASS}>Contacto</p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-ignition" aria-hidden />
              <a
                href={buildGoogleMapsLink({ lat: profile.latitude, lng: profile.longitude })}
                target="_blank"
                rel="noreferrer"
                className={LINK_CLASS}
              >
                {formatFullAddress(profile)}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-ignition" aria-hidden />
              <a href={phoneHref} className={LINK_CLASS}>
                {profile.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm font-medium uppercase tracking-wide text-titanium transition-colors duration-150 ease-out hover:text-ignition"
              >
                Contactar por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={COLUMN_TITLE_CLASS}>Explorar</p>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl font-mono text-[11px] text-titanium/70">
        © {new Date().getFullYear()} {profile.name} · {profile.slogan}
      </p>

      <p className="mx-auto mt-4 max-w-6xl border-t border-titanium/10 pt-4 font-body text-[11px] text-titanium/40">
        Diseñado y desarrollado por Camilo Martinez · cm942995@gmail.com
      </p>
    </footer>
  );
}
