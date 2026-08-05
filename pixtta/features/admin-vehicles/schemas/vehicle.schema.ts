import { z } from "zod";

/**
 * Validación de los datos del formulario de vehículo.
 * La forma resultante coincide con `VehicleInput` (types/vehicle.ts).
 */
export const vehicleFormSchema = z.object({
  brand: z.string().min(1, "La marca es obligatoria"),
  model: z.string().min(1, "El modelo es obligatorio"),
  year: z.coerce.number().int().min(1950, "Año inválido"),
  category: z.enum(["sedan", "suv", "deportivo", "electrico", "moto", "pickup"], {
    errorMap: () => ({ message: "Selecciona una categoría" }),
  }),
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
  status: z.enum(["activo", "vendido", "borrador"], {
    errorMap: () => ({ message: "Selecciona un estado" }),
  }),
  isFeatured: z.boolean().default(false),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

/**
 * Convierte un FormData crudo (tal como llega a una Server Action)
 * en un objeto validado contra `vehicleFormSchema`.
 */
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
  });
}
