-- =============================================================
-- Pixtta — Marcas y categorías dinámicas (gestionables desde admin)
-- Opción B: tablas de catálogo + vehicles sigue guardando texto simple.
-- =============================================================

-- ---------------------------------------------------------------
-- Tabla: categories
-- ---------------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  created_at  timestamptz not null default now()
);

insert into public.categories (slug, name) values
  ('sedan', 'Sedán'),
  ('suv', 'SUV'),
  ('deportivo', 'Deportivo'),
  ('electrico', 'Eléctrico'),
  ('moto', 'Moto'),
  ('pickup', 'Pickup')
on conflict (slug) do nothing;

alter table public.categories enable row level security;

drop policy if exists "categories_public_select" on public.categories;
create policy "categories_public_select"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write"
  on public.categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------
-- Tabla: brands
-- ---------------------------------------------------------------
create table if not exists public.brands (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  created_at  timestamptz not null default now()
);

insert into public.brands (slug, name) values
  ('porsche', 'Porsche'),
  ('mercedes-benz', 'Mercedes-Benz'),
  ('bmw', 'BMW'),
  ('audi', 'Audi'),
  ('range-rover', 'Range Rover'),
  ('lamborghini', 'Lamborghini'),
  ('ducati', 'Ducati'),
  ('can-am', 'Can-Am'),
  ('sea-doo', 'Sea-Doo'),
  ('toyota', 'Toyota'),
  ('ford', 'Ford'),
  ('chevrolet', 'Chevrolet'),
  ('cadillac', 'Cadillac')
on conflict (slug) do nothing;

alter table public.brands enable row level security;

drop policy if exists "brands_public_select" on public.brands;
create policy "brands_public_select"
  on public.brands for select
  to anon, authenticated
  using (true);

drop policy if exists "brands_admin_write" on public.brands;
create policy "brands_admin_write"
  on public.brands for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------
-- vehicles.category ya no está limitado a una lista fija en la base
-- de datos — las categorías ahora son dinámicas (tabla `categories`).
-- La validación de "es una categoría real" pasa a hacerse en el código.
-- ---------------------------------------------------------------
alter table public.vehicles drop constraint if exists vehicles_category_check;