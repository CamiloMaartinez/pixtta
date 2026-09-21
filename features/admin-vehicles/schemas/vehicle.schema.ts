import { z } from "zod";

function toNullable(value: FormDataEntryValue | null): string | null {
  if (value === null) return null;
  const str = String(value).trim();
  return str.length > 0 ? str : null;
}

export const vehicleFormSchema = z.object({
  brand: z.string().min(1, "La marca es obligatoria"),
  model: z.string().min(1, "El modelo es obligatorio"),
  year: z.coerce.number().int().min(1950, "Año inválido"),
  category: z.string().min(1, "Selecciona una categoría"),
  price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
  mileageKm: z.coerce.number().min(0, "El kilometraje debe ser mayor o igual a 0"),
  horsepower: z.coerce.number().min(0),
  acceleration0To100: z.coerce.number().min(0),
  topSpeedKmh: z.coerce.number().min(0),
  engine: z.string().min(1, "El motor es obligatorio"),
  fuelType: z.enum(["gasolina", "diesel", "electrico", "hibrido"], {
    errorMap: () => ({ message: "Selecciona un combustible" }),
  }),
  transmission: z.enum(["automatica", "manual"], {
    errorMap: () => ({ message: "Selecciona una transmisión" }),
  }),
  color: z.string().min(1, "El color es obligatorio"),
  description: z.string().default(""),
  status: z.enum(["activo", "vendido", "borrador", "reservado"], {
    errorMap: () => ({ message: "Selecciona un estado" }),
  }),
  isFeatured: z.boolean().default(false),

  traccion: z.string().nullable(),
  carroceria: z.string().nullable(),
  puertas: z.coerce.number().int().positive("Debe ser mayor a 0").nullable(),
  version: z.string().nullable(),
  placaTerminadaEn: z
    .string()
    .regex(/^[0-9]$/, "Debe ser un solo dígito (0-9)")
    .nullable(),
  origenPlaca: z.string().nullable(),
  modelYear: z.coerce.number().int().min(1950, "Año inválido").nullable(),
  documentosVigentesHasta: z.string().nullable(),
  seats: z.coerce.number().int().positive("Debe ser mayor a 0").nullable(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export function parseVehicleFormData(formData: FormData) {
  return vehicleFormSchema.safeParse({
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    category: formData.get("category"),
    price: formData.get("price"),
    mileageKm: formData.get("mileageKm"),
    horsepower: formData.get("horsepower"),
    acceleration0To100: formData.get("acceleration0To100"),
    topSpeedKmh: formData.get("topSpeedKmh"),
    engine: formData.get("engine"),
    fuelType: formData.get("fuelType"),
    transmission: formData.get("transmission"),
    color: formData.get("color"),
    description: formData.get("description") ?? "",
    status: formData.get("status"),
    isFeatured: formData.get("isFeatured") === "on",
    traccion: toNullable(formData.get("traccion")),
    carroceria: toNullable(formData.get("carroceria")),
    puertas: toNullable(formData.get("puertas")),
    version: toNullable(formData.get("version")),
    placaTerminadaEn: toNullable(formData.get("placaTerminadaEn")),
    origenPlaca: toNullable(formData.get("origenPlaca")),
    modelYear: toNullable(formData.get("modelYear")),
    documentosVigentesHasta: toNullable(formData.get("documentosVigentesHasta")),
    seats: toNullable(formData.get("seats")),
  });
}