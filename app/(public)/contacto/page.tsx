import type { Metadata } from "next";
import { MapPin, Navigation, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/features/leads/components/ContactForm";
import { SocialIcon } from "@/components/ui/SocialIcon";
import {
  buildGoogleMapsLink,
  buildGoogleMapsEmbedSrc,
  buildWazeLink,
} from "@/lib/constants/social";
import { buildWhatsappLink } from "@/lib/utils/buildWhatsappLink";
import { getDealershipProfile, formatFullAddress } from "@/features/dealership/services/dealership.service";

export const metadata: Metadata = {
  title: "Contacto | Pixtta",
  description:
    "Escríbenos por WhatsApp, visítanos en Bucaramanga o deja tus datos y te contactamos pronto.",
};

const CARD_CLASS = "border border-titanium/15 bg-graphite p-5 sm:p-6";
const LABEL_CLASS =
  "font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium";
const ACTION_CLASS =
  "flex items-center gap-2 border border-titanium/20 px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition hover:text-ignition";

export default async function ContactoPage(): Promise<React.JSX.Element> {
  const profile = await getDealershipProfile();
  const coords = { lat: profile.latitude, lng: profile.longitude };
  const whatsappLink = buildWhatsappLink(profile.whatsappNumber);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <p className={LABEL_CLASS}>Hablemos</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-alabaster">
        Contacto
      </h1>
      <p className="mt-4 max-w-2xl font-body text-sm text-titanium">
        {profile.description}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className={CARD_CLASS}>
            <p className={LABEL_CLASS}>Escríbenos</p>
            <a
              href={`tel:+${profile.whatsappNumber}`}
              className="mt-3 flex items-center gap-2 font-display text-xl font-bold text-alabaster transition-colors duration-150 ease-out hover:text-ignition"
            >
              <Phone size={18} className="text-ignition" aria-hidden />
              {profile.phone}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="press mt-4 inline-flex items-center gap-2 bg-ignition px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster hover:bg-ignition/90"
            >
              <SocialIcon platform="whatsapp" size={16} /> Escribir por WhatsApp
            </a>

            <ul className="mt-6 flex flex-wrap gap-3 border-t border-titanium/10 pt-6">
              {profile.socialLinks
                .filter((link) => link.platform !== "whatsapp")
                .map(({ platform, label, url }) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide text-titanium transition-colors duration-150 ease-out hover:text-alabaster"
                    >
                      <SocialIcon platform={platform} size={16} /> {label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="border border-amber/30 bg-graphite p-6">
            <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-amber">
              <ShieldCheck size={14} aria-hidden /> Canales oficiales
            </p>
            <p className="mt-3 font-body text-sm text-titanium">
              Para tu seguridad, confirma siempre que quien te escribe sea el número{" "}
              <span className="font-mono text-alabaster">{profile.phone}</span> o nuestras cuentas
              oficiales en Instagram, Facebook y TikTok antes de enviar dinero o documentos.
            </p>
          </div>

          <div className={CARD_CLASS}>
            <p className={LABEL_CLASS}>Visítanos</p>
            <p className="mt-3 flex items-start gap-2 font-body text-sm text-alabaster">
              <MapPin size={16} className="mt-0.5 shrink-0 text-ignition" aria-hidden />
              {formatFullAddress(profile)}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={buildGoogleMapsLink(coords)} target="_blank" rel="noreferrer" className={ACTION_CLASS}>
                <MapPin size={15} /> Google Maps
              </a>
              <a href={buildWazeLink(coords)} target="_blank" rel="noreferrer" className={ACTION_CLASS}>
                <Navigation size={15} /> Waze
              </a>
            </div>
            <div className="mt-5 aspect-[4/3] w-full overflow-hidden border border-titanium/15">
              <iframe
                src={buildGoogleMapsEmbedSrc(coords)}
                className="h-full w-full border-0"
                loading="lazy"
                title={`Ubicación de ${profile.name}`}
              />
            </div>
          </div>
        </div>

        <div>
          <p className={LABEL_CLASS}>Déjanos tus datos</p>
          <p className="mt-2 font-body text-sm text-titanium">
            Completa el formulario y te contactamos a la brevedad.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
