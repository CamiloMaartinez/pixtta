-- =============================================================
-- Pixtta — Discriminador de tipo de lead
-- Permite reutilizar `leads` para /contacto, /credito y /vender.
-- =============================================================

alter table public.leads
  add column if not exists type text not null default 'contacto'
    check (type in ('contacto', 'credito', 'vender'));

create index if not exists idx_leads_type on public.leads (type);
