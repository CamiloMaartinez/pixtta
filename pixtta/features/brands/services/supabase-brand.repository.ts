import type { SupabaseClient } from "@supabase/supabase-js";
import type { Brand, Result } from "@/types";
import type { BrandRepository } from "./brand.repository";

interface BrandRow {
  id: string;
  slug: string;
  name: string;
}

export class SupabaseBrandRepository implements BrandRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getBrands(): Promise<Result<Brand[]>> {
    try {
      const { data, error } = await this.supabase
        .from("brands")
        .select("id, slug, name")
        .order("name", { ascending: true });

      if (error) return { success: false, error: error.message };

      return { success: true, data: (data as BrandRow[]).map((row) => ({ ...row })) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}
