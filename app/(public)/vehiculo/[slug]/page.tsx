import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleGallery } from "@/features/vehicles/components/VehicleGallery";
import { VehicleSpecs } from "@/features/vehicles/components/VehicleSpecs";
import { HudFrame } from "@/components/ui/HudFrame";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { buildWhatsappLink } from "@/lib/utils/buildWhatsappLink";
import { getDealershipProfile } from "@/features/dealership/services/dealership.service";

interface VehiculoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: VehiculoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = await getVehicleRepository();
  const result = await repository.getVehicleBySlug(slug);

  if (!result.success || !result.data) {
    return { title: "Vehículo no encontrado | Pixtta" };
  }

  const vehicle = result.data;
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} | Pixtta`;
  const description = vehicle.description || `${vehicle.brand} ${vehicle.model} disponible en Pixtta.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.images[0] ? [vehicle.images[0].url] : [],
    },
  };
}

export default async function VehiculoPage({
  params,
}: VehiculoPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const repository = await getVehicleRepository();
  const result = await repository.getVehicleBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const vehicle = result.data;
  const accent: "ignition" | "teal" = vehicle.category === "electrico" ? "teal" : "ignition";
  const ctaBg = accent === "teal" ? "bg-teal" : "bg-ignition";

  const { whatsappNumber } = await getDealershipProfile();
  const whatsappLink = buildWhatsappLink(whatsappNumber, vehicle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileageKm,
      unitCode: "KMT",
    },
    image: vehicle.images.map((image) => image.url),
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <HudFrame accent={accent}>
          <VehicleGallery
            images={vehicle.images}
            alt={`${vehicle.brand} ${vehicle.model}`}
            accent={accent}
          />
        </HudFrame>

        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wide text-titanium">{vehicle.brand}</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-tight text-alabaster">
            {vehicle.model}
          </h1>

          <HudFrame accent={accent} className="mt-4 inline-block">
            <p className="border border-titanium/15 bg-graphite px-4 py-2 font-mono text-2xl font-semibold text-alabaster">
              {formatCurrency(vehicle.price)}
            </p>
          </HudFrame>

          <p className="mt-6 font-body text-sm leading-relaxed text-titanium">
            {vehicle.description}
          </p>

          <div className="mt-6">
            <VehicleSpecs vehicle={vehicle} />
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={`mt-8 inline-flex items-center justify-center border border-titanium/20 px-8 py-3 font-body text-sm font-semibold uppercase tracking-wide text-alabaster transition-colors ${ctaBg}`}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
