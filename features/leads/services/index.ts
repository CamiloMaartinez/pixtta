import { createClient } from "@/lib/supabase/server";
import { SupabaseLeadRepository } from "./lead.repository";
import type { LeadRepository } from "./lead.repository";

export async function getLeadRepository(): Promise<LeadRepository> {
  const supabase = await createClient();
  return new SupabaseLeadRepository(supabase);
}

export type { LeadRepository } from "./lead.repository";