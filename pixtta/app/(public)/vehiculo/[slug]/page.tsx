import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleRepository } from "@/features/vehicles/services";
import { VehicleGallery } from "@/features/vehicles/components/VehicleGallery";
import { VehicleSpecs } from "@/features/vehicles/components/VehicleSpecs";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { buildWhatsappLink } from "@/lib/utils/buildWhatsappLink";

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
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
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
    <main className="mx-auto max-w-5xl p-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <VehicleGallery images={vehicle.images} alt={`${vehicle.brand} ${vehicle.model}`} />

        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">{vehicle.brand}</p>
          <h1 className="text-3xl font-bold text-neutral-900">{vehicle.model}</h1>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {formatCurrency(vehicle.price)}
          </p>

          <p className="mt-4 text-sm text-neutral-600">{vehicle.description}</p>

          <div className="mt-6">
            <VehicleSpecs vehicle={vehicle} />
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
