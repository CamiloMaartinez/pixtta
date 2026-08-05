# Migraciones de Pixtta

Este directorio contiene el SQL de la base de datos, en el orden en que debe aplicarse.

## Opción A — Panel de Supabase (SQL Editor)

1. Entra a tu proyecto en https://supabase.com/dashboard
2. Ve a **SQL Editor**
3. Pega y ejecuta, en orden:
   1. `migrations/0001_schema.sql`
   2. `migrations/0002_policies.sql`

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
