  -- =============================================================
  -- Pixtta — Ampliación de vehicles: campos descriptivos del
  -- mercado colombiano + nuevo estado "reservado".
  -- Todas las columnas nuevas son NULLABLE: no rompe datos existentes.
  -- =============================================================

  alter table public.vehicles
    add column if not exists traccion text,
    add column if not exists carroceria text,
    add column if not exists puertas int,
    add column if not exists version text,
    add column if not exists placa_terminada_en text,
    add column if not exists origen_placa text,
    add column if not exists model_year int,
    add column if not exists documentos_vigentes_hasta date;

  -- Validaciones mínimas sobre las columnas nuevas
  alter table public.vehicles
    add constraint vehicles_puertas_check
      check (puertas is null or puertas > 0);

  alter table public.vehicles
    add constraint vehicles_placa_terminada_en_check
      check (placa_terminada_en is null or placa_terminada_en ~ '^[0-9]$');

  alter table public.vehicles
    add constraint vehicles_model_year_check
      check (model_year is null or model_year > 1950);

  -- Ampliar el estado para incluir "reservado"
  alter table public.vehicles drop constraint if exists vehicles_status_check;
  alter table public.vehicles
    add constraint vehicles_status_check
      check (status in ('activo', 'vendido', 'borrador', 'reservado'));

  comment on column public.vehicles.year is 'Año de fabricación.';
  comment on column public.vehicles.model_year is 'Modelo — año de matrícula (puede diferir del año de fabricación).';
  comment on column public.vehicles.documentos_vigentes_hasta is 'Fecha del próximo vencimiento de documentos (ej. SOAT).';
