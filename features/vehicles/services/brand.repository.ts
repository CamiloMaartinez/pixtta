import type { SupabaseClient } from "@supabase/supabase-js";
import type { Brand, Result } from "@/types";
import { slugify } from "@/lib/utils/slugify";

export interface BrandRepository {
  getAllBrands(): Promise<Result<Brand[]>>;
  createBrand(name: string): Promise<Result<Brand>>;
  deleteBrand(id: string): Promise<Result<void>>;
}

export class SupabaseBrandRepository implements BrandRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAllBrands(): Promise<Result<Brand[]>> {
    try {
      const { data, error } = await this.supabase
        .from("brands")
        .select("id, slug, name")
        .order("name", { ascending: true });

      if (error) return { success: false, error: error.message };
      return { success: true, data: data as Brand[] };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async createBrand(name: string): Promise<Result<Brand>> {
    try {
      const slug = slugify(name);
      const { data, error } = await this.supabase
        .from("brands")
        .insert({ slug, name })
        .select("id, slug, name")
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data as Brand };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async deleteBrand(id: string): Promise<Result<void>> {
    try {
      const { error } = await this.supabase.from("brands").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}