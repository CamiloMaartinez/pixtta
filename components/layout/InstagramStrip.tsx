import Image from "next/image";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { INSTAGRAM, SOCIAL_LINKS } from "@/lib/constants/social";

const PHOTOS = [
  { src: "/images/galeria/1.jpg", alt: "Toyota Fortuner gris en Pixtta" },
  { src: "/images/galeria/2.jpg", alt: "Jeep Grand Cherokee gris en Pixtta" },
  { src: "/images/galeria/3.jpg", alt: "SUV Toyota gris verdoso en Pixtta" },
  { src: "/images/galeria/4.jpg", alt: "Camioneta azul oscuro en Pixtta" },
  { src: "/images/galeria/5.jpg", alt: "Toyota Hilux blanca en Pixtta" },
  { src: "/images/galeria/6.jpg", alt: "Toyota blanca en Pixtta" },
];

/** 1.982 → "+1.900" (redondeo hacia abajo a la centena, para no exagerar). */
function roundedCount(value: number): string {
  return `+${(Math.floor(value / 100) * 100).toLocaleString("es-CO")}`;
}

/**
 * Franja "Síguenos en Instagram": 6 fotos del perfil, cifras de la cuenta y
 * enlace directo. Fotos estáticas en /public/images/galeria/.
 */
export function InstagramStrip(): React.JSX.Element {
  return (
    <section className="border-t border-titanium/10 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
              Síguenos
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-alabaster">
              {INSTAGRAM.handle} en Instagram
            </h2>
            <p className="mt-2 font-mono text-xs text-titanium">
              {roundedCount(INSTAGRAM.followers)} seguidores · {roundedCount(INSTAGRAM.posts)}{" "}
              publicaciones
            </p>
          </div>

          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 border border-titanium/20 px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition hover:text-ignition"
          >
            <SocialIcon platform="instagram" size={16} /> Ver perfil
          </a>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
          {PHOTOS.map((photo) => (
            <li key={photo.src}>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`${photo.alt} — ver en Instagram`}
                className="group relative block aspect-square overflow-hidden border border-titanium/15"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-carbon/0 transition-colors duration-200 group-hover:bg-carbon/25" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
