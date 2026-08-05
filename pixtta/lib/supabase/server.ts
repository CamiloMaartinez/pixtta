import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para usar en Server Components, Server Actions
 * y Route Handlers. Lee/escribe la sesión a través de las cookies de
 * la petición actual. También queda sujeto a las políticas RLS.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Se puede ignorar si setAll se invoca desde un Server Component
            // (Next.js solo permite escribir cookies en Server Actions/Route Handlers).
          }
        },
      },
    }
  );
}
