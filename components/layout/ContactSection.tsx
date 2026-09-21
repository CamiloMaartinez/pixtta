import { MapPin, Navigation } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import {
  buildGoogleMapsLink,
  buildGoogleMapsEmbedSrc,
  buildWazeLink,
} from "@/lib/constants/social";
import { buildWhatsappLink } from "@/lib/utils/buildWhatsappLink";
import { getDealershipProfile, formatFullAddress } from "@/features/dealership/services/dealership.service";

export async function ContactSection(): Promise<React.JSX.Element> {
  const profile = await getDealershipProfile();
  const coords = { lat: profile.latitude, lng: profile.longitude };
  const whatsappLink = buildWhatsappLink(profile.whatsappNumber);

  return (
    <section className="border-t border-titanium/10 px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">Visítanos</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-alabaster">{formatFullAddress(profile)}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={buildGoogleMapsLink(coords)} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-titanium/20 px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster hover:border-ignition"><MapPin size={15} /> Google Maps</a>
            <a href={buildWazeLink(coords)} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-titanium/20 px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster hover:border-ignition"><Navigation size={15} /> Waze</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {profile.socialLinks.map(({ platform, label, url }) => (
              <a key={platform} href={platform === "whatsapp" ? whatsappLink : url} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster"><SocialIcon platform={platform} size={16} /> {label}</a>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden border border-titanium/15">
          <iframe src={buildGoogleMapsEmbedSrc(coords)} className="h-full w-full border-0" loading="lazy" title="Ubicación de Pixtta" />
        </div>
      </div>
    </section>
  );
}
