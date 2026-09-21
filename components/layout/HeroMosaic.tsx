import Image from "next/image";

/**
 * Mosaico asimétrico de bienvenida: un tile grande (vehículo frente a la
 * fachada de Pixtta) + dos apilados del showroom BRP (Can-Am y Sea-Doo).
 * Fotos en /public/images/hero/, generadas desde el Instagram de Pixtta con
 * scripts/build-brand-assets.mjs. Overlay en degradado hacia Carbon para que
 * el texto superpuesto sea legible.
 */
export function HeroMosaic(): React.JSX.Element {
  return (
    <div className="absolute inset-0 -z-10 grid grid-cols-2 gap-1 opacity-90 sm:grid-cols-3">
      <div className="hero-tile relative col-span-2 row-span-2 overflow-hidden sm:col-span-2">
        <Image
          src="/images/hero/1.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className="hero-tile relative hidden overflow-hidden sm:block"
        style={{ "--tile-delay": "140ms" } as React.CSSProperties}
      >
        <Image
          src="/images/hero/2.jpg"
          alt=""
          fill
          priority
          sizes="33vw"
          className="object-cover"
        />
      </div>
      <div
        className="hero-tile relative hidden overflow-hidden sm:block"
        style={{ "--tile-delay": "280ms" } as React.CSSProperties}
      >
        <Image
          src="/images/hero/3.jpg"
          alt=""
          fill
          priority
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-carbon/20" />
      <div className="absolute inset-0 bg-carbon/30" />
    </div>
  );
}
