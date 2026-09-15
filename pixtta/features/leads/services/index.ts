import { createClient } from "@/lib/supabase/server";
import { SupabaseLeadRepository } from "./supabase-lead.repository";
import type { LeadRepository } from "./lead.repository";

/**
 * Fábrica del repositorio de leads para uso en Server Components,
 * Server Actions y Route Handlers. Ver `features/vehicles/services`
 * para la justificación del patrón.
 */
export async function getLeadRepository(): Promise<LeadRepository> {
  const supabase = await createClient();
  return new SupabaseLeadRepository(supabase);
}

export type { LeadRepository } from "./lead.repository";
