import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente anónimo de Supabase sin sesión ni cookies, para leer datos
 * públicos (RLS `select` abierto) desde componentes que deben poder
 * cachearse, como el Footer. No usar para nada que dependa del usuario.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
