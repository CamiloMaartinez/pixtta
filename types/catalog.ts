/**
 * Marcas y categorías gestionables desde el panel admin.
 * `vehicles.brand` / `vehicles.category` siguen guardando el `slug`
 * como texto simple (opción B, sin llave foránea) — ver
 * supabase/migrations/0004_brands_and_categories.sql.
 */

export interface Brand {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}