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

/**
 * Validación de los datos del formulario de solicitud de crédito.
 */
export const creditFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  cedula: z.string().min(5, "Ingresa un número de cédula válido"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  email: z.string().email("Ingresa un correo válido"),
  monthlyIncome: z.coerce.number().min(0, "Ingresa un valor válido"),
  downPayment: z.coerce.number().min(0, "Ingresa un valor válido"),
  vehicleId: z.string().uuid().optional().or(z.literal("")),
});

export type CreditFormValues = z.infer<typeof creditFormSchema>;

/**
 * Convierte un FormData crudo en un objeto validado contra `creditFormSchema`.
 */
export function parseCreditFormData(formData: FormData) {
  return creditFormSchema.safeParse({
    name: formData.get("name"),
    cedula: formData.get("cedula"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    monthlyIncome: formData.get("monthlyIncome"),
    downPayment: formData.get("downPayment"),
    vehicleId: formData.get("vehicleId") ?? "",
  });
}
