import type { MetadataRoute } from "next";
import { getVehicleRepository } from "@/features/vehicles/services";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repository = await getVehicleRepository();
  const result = await repository.getPublicVehicles({ pageSize: 1000 });

  const vehicleEntries: MetadataRoute.Sitemap = result.success
    ? result.data.items.map((vehicle) => ({
        url: `${BASE_URL}/vehiculo/${vehicle.slug}`,
        lastModified: vehicle.updatedAt,
      }))
    : [];

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/catalogo`, lastModified: new Date() },
    ...vehicleEntries,
  ];
}