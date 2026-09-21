import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, Result } from "@/types";
import { slugify } from "@/lib/utils/slugify";

export interface CategoryRepository {
  getAllCategories(): Promise<Result<Category[]>>;
  createCategory(name: string): Promise<Result<Category>>;
  deleteCategory(id: string): Promise<Result<void>>;
}

export class SupabaseCategoryRepository implements CategoryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAllCategories(): Promise<Result<Category[]>> {
    try {
      const { data, error } = await this.supabase
        .from("categories")
        .select("id, slug, name")
        .order("name", { ascending: true });

      if (error) return { success: false, error: error.message };
      return { success: true, data: data as Category[] };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async createCategory(name: string): Promise<Result<Category>> {
    try {
      const slug = slugify(name);
      const { data, error } = await this.supabase
        .from("categories")
        .insert({ slug, name })
        .select("id, slug, name")
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data as Category };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async deleteCategory(id: string): Promise<Result<void>> {
    try {
      const { error } = await this.supabase.from("categories").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}