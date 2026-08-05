import { createClient } from "@/lib/supabase/server";
import type { Result } from "@/types";

/**
 * Servicio de autenticación. Envuelve Supabase Auth para que el resto
 * del proyecto no importe el cliente de Supabase directamente.
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<Result<void>> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, data: undefined };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
