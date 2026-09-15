import { z } from "zod";

/**
 * Validación de los datos del formulario de contacto.
 */
export const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  message: z.string().default(""),
  vehicleId: z.string().uuid().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Convierte un FormData crudo (tal como llega a una Server Action)
 * en un objeto validado contra `contactFormSchema`.
 */
export function parseContactFormData(formData: FormData) {
  return contactFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message") ?? "",
    vehicleId: formData.get("vehicleId") ?? "",
  });
}
