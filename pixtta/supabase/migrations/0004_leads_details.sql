-- =============================================================
-- Pixtta — Campos comunes/estructurados adicionales para leads
-- `email` es común a los 3 formularios; `details` guarda los
-- campos específicos de cada tipo (p. ej. cédula/ingresos en
-- /credito) sin forzar columnas nulas para los demás tipos.
-- =============================================================

alter table public.leads
  add column if not exists email text,
  add column if not exists details jsonb not null default '{}'::jsonb;
