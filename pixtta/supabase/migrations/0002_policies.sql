-- =============================================================
-- Pixtta — Políticas de seguridad a nivel de fila (RLS)
-- Corresponde a la sección 4 (RLS) y 5 (autenticación) del
-- documento de arquitectura.
-- =============================================================

-- ---------------------------------------------------------------
-- Helper: ¿el usuario autenticado actual es administrador?
-- ---------------------------------------------------------------
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$ language sql security definer stable;

-- ---------------------------------------------------------------
-- vehicles
-- ---------------------------------------------------------------
alter table public.vehicles enable row level security;

drop policy if exists "vehicles_public_select_activo" on public.vehicles;
create policy "vehicles_public_select_activo"
  on public.vehicles
  for select
  to anon, authenticated
  using (status = 'activo');

drop policy if exists "vehicles_admin_select_all" on public.vehicles;
create policy "vehicles_admin_select_all"
  on public.vehicles
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "vehicles_admin_insert" on public.vehicles;
create policy "vehicles_admin_insert"
  on public.vehicles
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "vehicles_admin_update" on public.vehicles;
create policy "vehicles_admin_update"
  on public.vehicles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "vehicles_admin_delete" on public.vehicles;
create policy "vehicles_admin_delete"
  on public.vehicles
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------
-- vehicle_images
-- Lectura pública solo si el vehículo asociado está activo.
-- Escritura solo admin.
-- ---------------------------------------------------------------
alter table public.vehicle_images enable row level security;

drop policy if exists "vehicle_images_public_select" on public.vehicle_images;
create policy "vehicle_images_public_select"
  on public.vehicle_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.vehicles v
      where v.id = vehicle_images.vehicle_id
        and v.status = 'activo'
    )
  );

drop policy if exists "vehicle_images_admin_select_all" on public.vehicle_images;
create policy "vehicle_images_admin_select_all"
  on public.vehicle_images
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "vehicle_images_admin_write" on public.vehicle_images;
create policy "vehicle_images_admin_write"
  on public.vehicle_images
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------
-- admin_users
-- Sin acceso público. Un admin solo puede ver su propia fila.
-- ---------------------------------------------------------------
alter table public.admin_users enable row level security;

drop policy if exists "admin_users_self_select" on public.admin_users;
create policy "admin_users_self_select"
  on public.admin_users
  for select
  to authenticated
  using (id = auth.uid());

-- ---------------------------------------------------------------
-- leads
-- Cualquiera puede crear un lead (formulario público de contacto).
-- Solo el admin puede leerlos.
-- ---------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "leads_admin_select" on public.leads;
create policy "leads_admin_select"
  on public.leads
  for select
  to authenticated
  using (public.is_admin());
