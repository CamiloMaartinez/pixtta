-- =============================================================
-- Pixtta — Descripción y lema tomados del perfil de Instagram
-- "PIXTTA | AUTOS PREMIUM · Exclusive Garage Shop 🚘 Vendemos e importamos
--  tu vehículo soñado 🚤 Distribuidor autorizado Can-Am | Sea Doo"
--
-- Requiere que ya exista la tabla dealership_info (migración 0005).
-- También puedes cambiarlo desde /admin/concesionario.
-- =============================================================
update public.dealership_info
set
  description = 'Exclusive Garage Shop: tu concesionario de autos premium en Bucaramanga. Vendemos e importamos tu vehículo soñado. Distribuidores autorizados de Can-Am y Sea-Doo, con 14 años de confianza en Santander.',
  updated_at  = now()
where id = 1;
