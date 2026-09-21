import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  getDealershipProfile,
  formatFullAddress,
} from "@/features/dealership/services/dealership.service";

export const metadata: Metadata = {
  title: "Información del Concesionario | Pixtta",
  description:
    "Conoce a Pixtta: distribuidores autorizados de Can-Am y Sea-Doo en Bucaramanga, con 14 años de confianza en Santander.",
};

export default async function InformacionPage(): Promise<React.JSX.Element> {
  const profile = await getDealershipProfile();

  const HIGHLIGHTS = [
    {
      title: "Vehículos verificados",
      description: "Cada unidad es inspeccionada antes de entrar al catálogo.",
      Icon: ShieldCheck,
    },
    {
      title: "Atención directa",
      description: "Un mismo equipo te acompaña desde la consulta hasta la entrega.",
      Icon: Users,
    },
    {
      title: `${profile.city}, ${profile.region}`,
      description: formatFullAddress(profile),
      Icon: MapPin,
    },
  ];

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <Reveal>
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
            Sobre Pixtta
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-alabaster sm:text-4xl">
            Información del concesionario
          </h1>
          <p className="mt-4 max-w-2xl font-body text-sm text-titanium">
            {profile.description} Deportivos, SUV, motos, Can-Am y Sea-Doo, seleccionados e
            inspeccionados antes de llegar al catálogo público.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {HIGHLIGHTS.map(({ title, description, Icon }, index) => (
            <Reveal key={title} delay={index * 60}>
              <div className="h-full border border-titanium/15 bg-graphite p-6">
                <Icon size={20} className="text-ignition" />
                <h2 className="mt-4 font-display text-lg font-bold uppercase text-alabaster">
                  {title}
                </h2>
                <p className="mt-2 font-body text-sm text-titanium">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mt-12 grid overflow-hidden border border-titanium/15 bg-graphite md:grid-cols-2">
            <div className="relative min-h-64">
              <Image
                src="/images/brp/aventura.jpg"
                alt="Grupo de aventureros con cuatrimotos Can-Am en el campo"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
                Distribuidor oficial autorizado
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-alabaster">
                BRP · Can-Am · Sea-Doo
              </h2>
              <p className="mt-4 max-w-3xl font-body text-sm text-titanium">
                Distribuidores autorizados de Los Coches, importador exclusivo de BRP para Colombia,
                en Santander. Buggies y cuatrimotos todoterreno Can-Am, motos acuáticas Sea-Doo y
                tricimotos Spyder, con venta de equipos, accesorios, merchandise y servicio técnico.
              </p>
              <Link
                href="/catalogo?category=moto"
                className="mt-5 inline-block border border-titanium/20 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition hover:text-ignition"
              >
                Ver motos y recreativos
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      <Reveal>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 text-center">
          <p className="font-body text-sm text-titanium">
            ¿Tienes preguntas sobre un vehículo o quieres agendar una visita?
          </p>
          <Link
            href="/contacto"
            className="mt-4 inline-block border border-titanium/20 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition hover:text-ignition"
          >
            Contáctanos
          </Link>
        </div>
      </Reveal>
    </>
  );
}
