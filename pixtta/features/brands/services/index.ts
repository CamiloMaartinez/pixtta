import { createClient } from "@/lib/supabase/server";
import { SupabaseBrandRepository } from "./supabase-brand.repository";
import type { BrandRepository } from "./brand.repository";

export async function getBrandRepository(): Promise<BrandRepository> {
  const supabase = await createClient();
  return new SupabaseBrandRepository(supabase);
}

export type { BrandRepository } from "./brand.repository";
