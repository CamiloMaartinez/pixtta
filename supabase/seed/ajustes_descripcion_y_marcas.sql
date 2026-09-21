-- =============================================================
-- Pixtta — Ajustes: descripción del concesionario + marcas sin logo
-- Ejecutar en el SQL Editor de Supabase. Cada parte es independiente.
-- =============================================================

-- ------------------------------------------------------------
-- PARTE 1 · Descripción (la que ven Contacto, Información y el pie)
-- Edita el texto entre comillas simples y ejecuta. Si necesitas un
-- apóstrofo dentro del texto, escríbelo doble ('').
-- También se puede cambiar desde /admin/concesionario.
-- ------------------------------------------------------------
update public.dealership_info
set
  description = 'Exclusive Garage Shop: tu concesionario de autos premium en Bucaramanga. Vendemos e importamos tu vehículo soñado. Distribuidores autorizados de Can-Am y Sea-Doo, con 14 años de confianza en Santander.',
  updated_at  = now()
where id = 1;

-- ------------------------------------------------------------
-- PARTE 2 · Quitar las marcas que no tienen logo
-- Con logo (se quedan): Audi, Cadillac, Can-Am, Chevrolet, Ducati,
-- Ford, KTM, Lamborghini, Mercedes-Benz, Renault, Toyota.
--
-- Sin logo (se eliminan de la tabla `brands`):
--   BMW, Range Rover, Sea-Doo   → no tienen vehículos publicados
--   Jeep (2), Mini (1), Porsche (2) → SÍ tienen vehículos activos
--
-- Los vehículos NO se borran: siguen en el catálogo. Lo que cambia es
-- que esas marcas dejan de salir en la franja de marcas y en /marcas,
-- y no aparecerán en la lista al crear un vehículo desde el admin.
-- Si quieres conservar alguna, borra su línea de la lista.
-- ------------------------------------------------------------
delete from public.brands
where slug in (
  'bmw',
  'range-rover',
  'sea-doo',
  'jeep',
  'mini',
  'porsche'
);

-- Verificación: debe devolver las 11 marcas con logo.
select slug, name from public.brands order by name;
