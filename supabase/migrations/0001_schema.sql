-- =============================================================
-- Pixtta — Esquema inicial de base de datos
-- Corresponde a la sección 4 del documento de arquitectura.
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- Tabla: vehicles
-- ---------------------------------------------------------------
create table if not exists public.vehicles (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  brand                 text not null,
  model                 text not null,
  year                  int not null check (year > 1950),
  category              text not null check (
    category in ('sedan', 'suv', 'deportivo', 'electrico', 'moto', 'pickup')
  ),
  price                 numeric not null check (price >= 0),
  mileage_km            int not null default 0 check (mileage_km >= 0),
  horsepower            int not null default 0 check (horsepower >= 0),
  acceleration_0_100    numeric,
  top_speed_kmh         int,
  engine                text not null default '',
  fuel_type             text not null check (
    fuel_type in ('gasolina', 'diesel', 'electrico', 'hibrido')
  ),
  transmission          text not null check (
    transmission in ('automatica', 'manual')
  ),
  color                 text not null default '',
  description           text not null default '',
  status                text not null default 'borrador' check (
    status in ('activo', 'vendido', 'borrador')
  ),
  is_featured           boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists idx_vehicles_status on public.vehicles (status);
create index if not exists idx_vehicles_category on public.vehicles (category);
create index if not exists idx_vehicles_slug on public.vehicles (slug);

-- Mantiene updated_at sincronizado en cada UPDATE
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_vehicles_updated_at on public.vehicles;
create trigger trg_vehicles_updated_at
  before update on public.vehicles
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- Tabla: vehicle_images
-- ---------------------------------------------------------------
create table if not exists public.vehicle_images (
  id                    uuid primary key default gen_random_uuid(),
  vehicle_id            uuid not null references public.vehicles (id) on delete cascade,
  cloudinary_public_id  text not null,
  url                   text not null,
  position              int not null default 0,
  created_at            timestamptz not null default now()
);

create index if not exists idx_vehicle_images_vehicle_id on public.vehicle_images (vehicle_id);

-- ---------------------------------------------------------------
-- Tabla: admin_users
-- Se vincula 1 a 1 con auth.users. El alta de administradores se
-- hace manualmente desde el panel de Supabase, no hay registro público.
-- ---------------------------------------------------------------
create table if not exists public.admin_users (
  id                    uuid primary key references auth.users (id) on delete cascade,
  full_name             text not null default '',
  role                  text not null default 'admin' check (role in ('admin')),
  created_at            timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Tabla: leads (contactos generados desde el sitio público)
-- ---------------------------------------------------------------
create table if not exists public.leads (
  id                    uuid primary key default gen_random_uuid(),
  vehicle_id            uuid references public.vehicles (id) on delete set null,
  name                  text not null,
  phone                 text not null,
  message                text,
  channel               text not null default 'form' check (channel in ('form', 'whatsapp')),
  created_at            timestamptz not null default now()
);

create index if not exists idx_leads_vehicle_id on public.leads (vehicle_id);
