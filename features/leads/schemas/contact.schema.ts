import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  email: z.string().email("Correo inválido").or(z.literal("")).optional(),
  message: z.string().min(1, "Escribe tu mensaje"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function parseContactFormData(formData: FormData) {
  return contactFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
}