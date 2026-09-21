"use server";

import { getLeadRepository } from "../services";
import { parseContactFormData } from "../schemas/contact.schema";
import type { LeadFormState } from "../types";

export async function createContactLeadAction(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = parseContactFormData(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const repository = await getLeadRepository();
  const result = await repository.createLead({
    type: "contacto",
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    message: parsed.data.message,
  });

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true };
}