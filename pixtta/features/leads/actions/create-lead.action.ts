"use server";

import { getLeadRepository } from "@/features/leads/services";
import { parseContactFormData } from "../schemas/lead.schema";
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
    message: parsed.data.message,
    vehicleId: parsed.data.vehicleId || null,
  });

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true };
}
