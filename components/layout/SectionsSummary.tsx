import { ArrowUpRight, Globe2, Tag, Ship } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buildWhatsappMessageLink } from "@/lib/utils/buildWhatsappLink";
import { getDealershipProfile } from "@/features/dealership/services/dealership.service";

/**
 * Tres llamados a la acción que abren WhatsApp con el mensaje ya escrito.
 * Están basados en lo que Pixtta ya ofrece: vender tu vehículo, importar el
 * vehículo soñado y cotizar Can-Am / Sea-Doo bajo pedido.
 */
const ACTIONS = [
  {
    title: "Vende tu vehículo",
    description: "Publicamos tu vehículo con nuestro respaldo y llegamos a más compradores.",
    cta: "Quiero vender",
    message: "Hola, quiero vender mi vehículo con Pixtta.",
    Icon: Tag,
  },
  {
    title: "Importa tu vehículo soñado",
    description: "Vendemos e importamos: dinos qué vehículo buscas y nos encargamos.",
    cta: "Quiero importar",
    message: "Hola, quiero que Pixtta me importe un vehículo. ¿Me pueden asesorar?",
    Icon: Ship,
  },
  {
    title: "Can-Am y Sea-Doo bajo pedido",
    description: "Cotiza tu Can-Am o Sea-Doo con el respaldo de distribuidor oficial BRP.",
    cta: "Cotizar",
    message: "Hola, quiero cotizar un Can-Am / Sea-Doo bajo pedido.",
    Icon: Globe2,
  },
];

export async function SectionsSummary(): Promise<React.JSX.Element> {
  const { whatsappNumber } = await getDealershipProfile();

  return (
    <section className="border-t border-titanium/10 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
          Hablemos de tu próximo vehículo
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-alabaster">
          ¿Qué necesitas hoy?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ACTIONS.map(({ title, description, cta, message, Icon }, index) => (
            <Reveal key={title} delay={index * 60}>
              <a
                href={buildWhatsappMessageLink(whatsappNumber, message)}
                target="_blank"
                rel="noreferrer"
                className="cta-card group flex h-full flex-col border border-titanium/15 bg-graphite p-6"
              >
                <Icon size={20} className="text-ignition" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-alabaster">
                  {title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm text-titanium">{description}</p>
                <span className="mt-5 flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-alabaster">
                  {cta}
                  <ArrowUpRight size={14} className="cta-arrow text-ignition" aria-hidden />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
