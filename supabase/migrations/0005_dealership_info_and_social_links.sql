-- =============================================================
-- Pixtta — Información global del concesionario y redes sociales
-- Fuente: MercadoLibre (pagina/pixtta), Facebook y Linktree (linktr.ee/pixtta).
-- Idempotente: se puede ejecutar varias veces sin duplicar datos.
-- =============================================================

-- ---------------------------------------------------------------
-- Tabla: dealership_info  (una sola fila de configuración global)
-- ---------------------------------------------------------------
create table if not exists public.dealership_info (
  id               smallint primary key default 1 check (id = 1),
  name             text not null,
  slogan           text,
  description      text not null,
  address          text not null,
  city             text not null,
  region           text not null,
  country          text not null default 'Colombia',
  latitude         double precision,
  longitude        double precision,
  phone            text,
  whatsapp_number  text,
  updated_at       timestamptz not null default now()
);

alter table public.dealership_info enable row level security;

drop policy if exists "dealership_info_public_select" on public.dealership_info;
create policy "dealership_info_public_select"
  on public.dealership_info for select
  to anon, authenticated
  using (true);

drop policy if exists "dealership_info_admin_write" on public.dealership_info;
create policy "dealership_info_admin_write"
  on public.dealership_info for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into public.dealership_info (
  id, name, slogan, description, address, city, region, country,
  latitude, longitude, phone, whatsapp_number
) values (
  1,
  'Pixtta',
  'Pasión por los motores',
  'Tu concesionario de autos premium en Bucaramanga. Distribuidores autorizados de Can-Am y Sea-Doo. 14 años de confianza en Santander.',
  'Blvr. Bolívar #25-47',
  'Bucaramanga',
  'Santander',
  'Colombia',
  7.1282642,
  -73.1204042,
  '+57 316 798 9657',
  '573167989657'
)
on conflict (id) do update set
  name            = excluded.name,
  slogan          = excluded.slogan,
  description     = excluded.description,
  address         = excluded.address,
  city            = excluded.city,
  region          = excluded.region,
  country         = excluded.country,
  latitude        = excluded.latitude,
  longitude       = excluded.longitude,
  phone           = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  updated_at      = now();

-- ---------------------------------------------------------------
-- Tabla: social_links
-- ---------------------------------------------------------------
create table if not exists public.social_links (
  id          uuid primary key default gen_random_uuid(),
  platform    text not null unique
              check (platform in ('whatsapp', 'instagram', 'facebook', 'tiktok', 'mercadolibre')),
  label       text not null,
  url         text not null,
  sort_order  smallint not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.social_links enable row level security;

drop policy if exists "social_links_public_select" on public.social_links;
create policy "social_links_public_select"
  on public.social_links for select
  to anon, authenticated
  using (is_active);

drop policy if exists "social_links_admin_write" on public.social_links;
create policy "social_links_admin_write"
  on public.social_links for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into public.social_links (platform, label, url, sort_order) values
  ('whatsapp',     'WhatsApp',      'https://wa.me/573167989657',                                  1),
  ('instagram',    'Instagram',     'https://www.instagram.com/pixtta',                            2),
  ('facebook',     'Facebook',      'https://www.facebook.com/profile.php?id=61553097972517',      3),
  ('tiktok',       'TikTok',        'https://www.tiktok.com/@pixtta_premium',                      4),
  ('mercadolibre', 'Mercado Libre', 'https://www.mercadolibre.com.co/pagina/pixtta',               5)
on conflict (platform) do update set
  label      = excluded.label,
  url        = excluded.url,
  sort_order = excluded.sort_order,
  is_active  = true;
