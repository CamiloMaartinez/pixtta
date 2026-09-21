# Migraciones de Pixtta

Este directorio contiene el SQL de la base de datos, en el orden en que debe aplicarse.

## Opción A — Panel de Supabase (SQL Editor)

1. Entra a tu proyecto en https://supabase.com/dashboard
2. Ve a **SQL Editor**
3. Pega y ejecuta, en orden:
   1. `migrations/0001_schema.sql`
   2. `migrations/0002_policies.sql`
   3. `migrations/0003_vehicle_details_and_reservado.sql`
   4. `migrations/0004_brands_and_categories.sql`
   5. `migrations/0005_dealership_info_and_social_links.sql` — crea `dealership_info` y `social_links` con los datos reales de Pixtta (contacto, dirección y redes). Es idempotente: para cambiar un dato, edita el `insert` y vuelve a ejecutarla, o actualiza la fila desde el Table Editor. El sitio cachea estos datos 1 hora.

> Si aún no aplicas la 0005, el sitio funciona igual: usa los mismos datos desde `lib/constants/social.ts`.

## Opción B — Supabase CLI

```bash
supabase link --project-ref <tu-project-ref>
supabase db push
```

## Después de aplicar las migraciones

Para crear tu primer usuario administrador:

1. Crea el usuario desde **Authentication → Users** en el panel de Supabase (o con registro normal).
2. Copia su `id` (uuid).
3. Insértalo en `admin_users`:
   ```sql
   insert into public.admin_users (id, full_name)
   values ('<uuid-del-usuario>', 'Tu nombre');
   ```

Sin este último paso, ese usuario podrá iniciar sesión pero no tendrá permisos de administrador (las políticas RLS lo bloquearán).
