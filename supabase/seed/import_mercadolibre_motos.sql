-- =============================================================
-- Pixtta — Importación de vehículos desde Mercado Libre (3 publicaciones)
-- Generado por scripts/build-vehicles-seed.mjs desde import/listing-motos.json.
--
-- Se ejecuta en el SQL Editor de Supabase. Es seguro repetirlo: si el slug
-- ya existe no se vuelve a insertar (ni sus fotos), así que no pisa ediciones
-- hechas desde el admin.
--
-- Las fotos se sirven directo del CDN de Mercado Libre (cloudinary_public_id
-- lleva el prefijo "mercadolibre/" para reconocerlas). Si borras una
-- publicación en ML, su foto dejará de verse: conviene migrarlas a Cloudinary.
--
-- El listado NO trae color, combustible ni transmisión. Suposiciones a
-- verificar desde el admin (campo "verify" del script):
--   · Can-Am Outlander MAX 2026: transmisión
-- =============================================================

-- Marcas nuevas para el filtro de catálogo
insert into public.brands (slug, name) values
  ('can-am', 'Can-Am'),
  ('ducati', 'Ducati'),
  ('ktm', 'KTM')
on conflict (slug) do nothing;

-- Can-Am Outlander MAX Limited 1000R 2026 (MCO-2125655739)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'can-am-outlander-max-limited-1000r-2026', 'Can-Am', 'Outlander MAX', 2026, 'moto', 139000000, 0, 0,
    '1000R', 'gasolina', 'automatica', '', 'Can-am Outlander Max Limited 1000r 2026. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://moto.mercadolibre.com.co/MCO-2125655739-can-am-outlander-max-limited-1000r-2026-_JM', 'activo', false,
    '4x4', null, null, 'Limited 1000R', 2026
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2125655739-1', 'https://http2.mlstatic.com/D_Q_NP_698332-MCO113145417221_062026-B.webp', 0),
    ('mercadolibre/MCO-2125655739-2', 'https://http2.mlstatic.com/D_Q_NP_913692-MCO111298417308_052026-B.webp', 1),
    ('mercadolibre/MCO-2125655739-3', 'https://http2.mlstatic.com/D_Q_NP_799564-MCO111299011630_052026-B.webp', 2),
    ('mercadolibre/MCO-2125655739-4', 'https://http2.mlstatic.com/D_Q_NP_644214-MCO112332512777_052026-B.webp', 3),
    ('mercadolibre/MCO-2125655739-5', 'https://http2.mlstatic.com/D_Q_NP_895287-MCO113402498080_072026-B.webp', 4),
    ('mercadolibre/MCO-2125655739-6', 'https://http2.mlstatic.com/D_Q_NP_966594-MCO111299070808_052026-B.webp', 5),
    ('mercadolibre/MCO-2125655739-7', 'https://http2.mlstatic.com/D_Q_NP_905919-MCO112333195295_052026-B.webp', 6),
    ('mercadolibre/MCO-2125655739-8', 'https://http2.mlstatic.com/D_Q_NP_618935-MCO111298804332_052026-B.webp', 7),
    ('mercadolibre/MCO-2125655739-9', 'https://http2.mlstatic.com/D_Q_NP_838924-MCO111297884690_052026-B.webp', 8),
    ('mercadolibre/MCO-2125655739-10', 'https://http2.mlstatic.com/D_Q_NP_777896-MCO111298417352_052026-B.webp', 9)
) as i(pid, url, pos);

-- Ducati Panigale V4 S 2024 (MCO-2146850543)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'ducati-panigale-v4-s-2024', 'Ducati', 'Panigale', 2024, 'moto', 134000000, 900, 0,
    'V4', 'gasolina', 'manual', '', 'Ducati Panigale V4s. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://moto.mercadolibre.com.co/MCO-2146850543-ducati-panigale-v4s-_JM', 'activo', false,
    null, null, null, 'V4 S', 2024
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2146850543-1', 'https://http2.mlstatic.com/D_Q_NP_866427-MCO115143057286_082026-B.webp', 0)
) as i(pid, url, pos);

-- KTM Super Duke 1290 R 2021 (MCO-4363593728)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'ktm-super-duke-1290-r-2021', 'KTM', 'Super Duke', 2021, 'moto', 79900000, 7000, 0,
    '1290 cc', 'gasolina', 'manual', '', 'Ktm Superduke 1290 R. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://moto.mercadolibre.com.co/MCO-4363593728-ktm-superduke-1290-r-_JM', 'activo', false,
    null, null, null, '1290 R', 2021
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4363593728-1', 'https://http2.mlstatic.com/D_Q_NP_916193-MCO116651434883_082026-B.webp', 0)
) as i(pid, url, pos);
