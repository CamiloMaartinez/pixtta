-- =============================================================
-- Pixtta — Importación de vehículos desde Mercado Libre (20 publicaciones)
-- Generado por scripts/build-vehicles-seed.mjs desde import/listing.json.
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
--   · Toyota Land Cruiser 2026: combustible, transmisión
--   · Porsche Boxster 2019: transmisión
--   · Mercedes-Benz Clase GLC 2026: combustible
--   · Toyota Fortuner 2022: combustible, transmisión
--   · Jeep Wrangler 2020: combustible, transmisión
--   · Ford Fusion 2017: transmisión
--   · Toyota Hilux 2023: combustible
--   · Toyota Prado 2025: combustible, transmisión
--   · Mini Cooper S 2022: transmisión
--   · Jeep Grand Cherokee 2015: transmisión
--   · Toyota Hilux 2023: combustible
--   · Toyota Prado 2012: combustible, transmisión
--   · Toyota Prado 2013: combustible, transmisión
-- =============================================================

-- Marcas nuevas para el filtro de catálogo
insert into public.brands (slug, name) values
  ('toyota', 'Toyota'),
  ('porsche', 'Porsche'),
  ('mercedes-benz', 'Mercedes-Benz'),
  ('jeep', 'Jeep'),
  ('ford', 'Ford'),
  ('mini', 'Mini'),
  ('renault', 'Renault')
on conflict (slug) do nothing;

-- Toyota Land Cruiser GRJ79 Chasis 2026 (MCO-4309317188)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-land-cruiser-grj79-chasis-2026', 'Toyota', 'Land Cruiser', 2026, 'pickup', 349900000, 0, 0,
    '4.0 L', 'gasolina', 'manual', '', 'Toyota Land Cruiser 2026 4.0 Grj79 Chasis. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4309317188-toyota-land-cruiser-grj79-chasis-40-_JM', 'activo', false,
    null, null, null, 'GRJ79 Chasis', 2026
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4309317188-1', 'https://http2.mlstatic.com/D_Q_NP_789992-MCO114674480228_082026-B.webp', 0),
    ('mercadolibre/MCO-4309317188-2', 'https://http2.mlstatic.com/D_Q_NP_708219-MCO116039605263_082026-B.webp', 1),
    ('mercadolibre/MCO-4309317188-3', 'https://http2.mlstatic.com/D_Q_NP_929537-MCO114674480234_082026-B.webp', 2),
    ('mercadolibre/MCO-4309317188-4', 'https://http2.mlstatic.com/D_Q_NP_916069-MCO116038270689_082026-B.webp', 3),
    ('mercadolibre/MCO-4309317188-5', 'https://http2.mlstatic.com/D_Q_NP_789859-MCO116037648535_082026-B.webp', 4),
    ('mercadolibre/MCO-4309317188-6', 'https://http2.mlstatic.com/D_Q_NP_768172-MCO114673917352_082026-B.webp', 5),
    ('mercadolibre/MCO-4309317188-7', 'https://http2.mlstatic.com/D_Q_NP_954851-MCO116037944371_082026-B.webp', 6),
    ('mercadolibre/MCO-4309317188-8', 'https://http2.mlstatic.com/D_Q_NP_825771-MCO116037648553_082026-B.webp', 7),
    ('mercadolibre/MCO-4309317188-9', 'https://http2.mlstatic.com/D_Q_NP_783979-MCO116039338435_082026-B.webp', 8),
    ('mercadolibre/MCO-4309317188-10', 'https://http2.mlstatic.com/D_Q_NP_750494-MCO116038300953_082026-B.webp', 9),
    ('mercadolibre/MCO-4309317188-11', 'https://http2.mlstatic.com/D_Q_NP_795984-MCO116037944423_082026-B.webp', 10),
    ('mercadolibre/MCO-4309317188-12', 'https://http2.mlstatic.com/D_Q_NP_949809-MCO116038537917_082026-B.webp', 11),
    ('mercadolibre/MCO-4309317188-13', 'https://http2.mlstatic.com/D_Q_NP_720272-MCO116037499369_082026-B.webp', 12)
) as i(pid, url, pos);

-- Toyota 4Runner Limited 2020 (MCO-4147193336)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-4runner-limited-2020', 'Toyota', '4Runner', 2020, 'suv', 208000000, 72000, 0,
    '4.0 L', 'gasolina', 'automatica', '', 'Toyota 4runner 2020 4.0 Limited Fl. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4147193336-toyota-4runner-40-limited-fl-_JM', 'activo', false,
    null, null, null, 'Limited', 2020
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4147193336-1', 'https://http2.mlstatic.com/D_Q_NP_834288-MCO113113293990_072026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Land Cruiser 200 VXS Blindada 2019 (MCO-2117141003)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-land-cruiser-200-vxs-blindada-2019', 'Toyota', 'Land Cruiser', 2019, 'suv', 379900000, 71000, 0,
    '4.5 L Diésel', 'diesel', 'automatica', '', 'Toyota Land Cruiser 2019 200 Vxs Diesel 4.5 Blindada. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2117141003-toyota-land-cruiser-200-vxs-45-diesel-blindada-_JM', 'activo', false,
    null, null, null, '200 VXS Blindada', 2019
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2117141003-1', 'https://http2.mlstatic.com/D_Q_NP_697047-MCO116034223565_082026-B.webp', 0)
) as i(pid, url, pos);

-- Porsche Boxster 718 GTS 2019 (MCO-4358805860)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'porsche-boxster-718-gts-2019', 'Porsche', 'Boxster', 2019, 'deportivo', 479900000, 20500, 0,
    '2.5 L', 'gasolina', 'automatica', '', 'Porsche Boxster 2019 718 Gts 2.5. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4358805860-porsche-boxster-718-gts-25-_JM', 'activo', false,
    null, null, null, '718 GTS', 2019
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4358805860-1', 'https://http2.mlstatic.com/D_Q_NP_976582-MCO115200286418_082026-B.webp', 0)
) as i(pid, url, pos);

-- Mercedes-Benz Clase GLC 300 4Matic Coupé 2026 (MCO-2117190713)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'mercedes-benz-clase-glc-300-4matic-coupe-2026', 'Mercedes-Benz', 'Clase GLC', 2026, 'suv', 304900000, 3800, 0,
    '2.0 L', 'gasolina', 'automatica', '', 'Mercedes-Benz Clase Glc 2026 2.0 300 4matic Coupe. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2117190713-mercedes-benz-clase-glc-20-300-4matic-coupe-_JM', 'activo', false,
    '4x4', 'Coupé', null, '300 4Matic Coupé', 2026
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2117190713-1', 'https://http2.mlstatic.com/D_Q_NP_636857-MCO114672277492_082026-B.webp', 0)
) as i(pid, url, pos);

-- Mercedes-Benz Clase A 35 AMG 4Matic 2023 (MCO-2018596135)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'mercedes-benz-clase-a-35-amg-4matic-2023', 'Mercedes-Benz', 'Clase A', 2023, 'deportivo', 169900000, 6900, 0,
    '2.0 L Turbo Híbrido', 'hibrido', 'automatica', '', 'Mercedes-Benz Clase A 2023 35 Amg 4matic Híbrido. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2018596135-mercedes-benz-clase-a-35-amg-4-matic-hibrido-_JM', 'activo', false,
    '4x4', null, null, '35 AMG 4Matic', 2023
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2018596135-1', 'https://http2.mlstatic.com/D_Q_NP_944328-MCO114462527716_082026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Fortuner SRV Blindada 2022 (MCO-2190355839)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-fortuner-srv-blindada-2022', 'Toyota', 'Fortuner', 2022, 'suv', 249000000, 15000, 0,
    '4.0 L', 'gasolina', 'automatica', '', 'Toyota Fortuner 2022 Srv 4.0 Blindada. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2190355839-toyota-fortuner-srv-40-blindada-_JM', 'activo', false,
    null, null, null, 'SRV Blindada', 2022
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2190355839-1', 'https://http2.mlstatic.com/D_Q_NP_984394-MCO117365337795_092026-B.webp', 0)
) as i(pid, url, pos);

-- Mercedes-Benz Clase GLC 43 AMG Biturbo 4Matic 2022 (MCO-2117142347)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'mercedes-benz-clase-glc-43-amg-biturbo-4matic-2022', 'Mercedes-Benz', 'Clase GLC', 2022, 'suv', 229900000, 21000, 0,
    'Biturbo', 'gasolina', 'automatica', '', 'Mercedes-Benz Clase Glc 2022 43 Amg Biturbo 4 Matic. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2117142347-mercedes-benz-clase-glc-43-amg-biturbo-4-matic-_JM', 'activo', false,
    '4x4', null, null, '43 AMG Biturbo 4Matic', 2022
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2117142347-1', 'https://http2.mlstatic.com/D_Q_NP_899546-MCO114671272624_082026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Fortuner SRX 4x4 A/T 2022 (MCO-4388444830)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-fortuner-srx-4x4-a-t-2022', 'Toyota', 'Fortuner', 2022, 'suv', 278000000, 50000, 0,
    '2.8 L Diésel', 'diesel', 'automatica', '', 'Toyota Fortuner 2022 Srx 2.8 Diesel 4x4 A/t. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4388444830-toyota-fortuner-srx-28-diesel-4x4-_JM', 'activo', false,
    '4x4', null, null, 'SRX 4x4 A/T', 2022
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4388444830-1', 'https://http2.mlstatic.com/D_Q_NP_988761-MCO115581250936_092026-B.webp', 0)
) as i(pid, url, pos);

-- Jeep Wrangler Rubicon 2020 (MCO-2117193783)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'jeep-wrangler-rubicon-2020', 'Jeep', 'Wrangler', 2020, 'suv', 299000000, 22000, 0,
    '2.0 L Turbo', 'gasolina', 'automatica', '', 'Jeep Wrangler 2020 Wrangler Rubicon 2.0 Turbo. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2117193783-jeep-wrangler-rubicon-20-turbo-_JM', 'activo', false,
    null, null, null, 'Rubicon', 2020
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2117193783-1', 'https://http2.mlstatic.com/D_Q_NP_616476-MCO114671461498_082026-B.webp', 0)
) as i(pid, url, pos);

-- Ford Fusion Titanium 2017 (MCO-2043972559)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'ford-fusion-titanium-2017', 'Ford', 'Fusion', 2017, 'sedan', 54900000, 91000, 245,
    '2.0 L', 'gasolina', 'automatica', '', 'Ford Fusion 2017 2.0 Titanium 245 Hp. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2043972559-ford-fusion-20-titanium-245-hp-_JM', 'activo', false,
    null, null, null, 'Titanium', 2017
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2043972559-1', 'https://http2.mlstatic.com/D_Q_NP_786783-MCO115813012099_082026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Hilux SRX A/T 2023 (MCO-4371741232)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-hilux-srx-a-t-2023', 'Toyota', 'Hilux', 2023, 'pickup', 258000000, 49500, 0,
    '2.8 L', 'diesel', 'automatica', '', 'Toyota Hilux 2023 2.8 Srx A/t. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4371741232-toyota-hilux-srx-28-at-_JM', 'activo', false,
    null, null, null, 'SRX A/T', 2023
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4371741232-1', 'https://http2.mlstatic.com/D_Q_NP_623650-MCO115312175492_082026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Prado First Edition Blindada 2025 (MCO-2167143639)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-prado-first-edition-blindada-2025', 'Toyota', 'Prado', 2025, 'suv', 379000000, 17500, 0,
    '2.4 L', 'gasolina', 'automatica', '', 'Toyota Prado 2025 First Edition 2.4 Blindada. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2167143639-toyota-prado-first-edition-24-blindada-_JM', 'activo', false,
    null, null, null, 'First Edition Blindada', 2025
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2167143639-1', 'https://http2.mlstatic.com/D_Q_NP_638113-MCO116920317873_082026-B.webp', 0)
) as i(pid, url, pos);

-- Mini Cooper S Cabriolet 2022 (MCO-4309376092)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'mini-cooper-s-cabriolet-2022', 'Mini', 'Cooper S', 2022, 'deportivo', 135000000, 26000, 0,
    '2.0 L Turbo', 'gasolina', 'automatica', '', 'Mini Cooper S 2022 Cabriolet 2.0 Turbo. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4309376092-mini-cooper-s-cabriolet-20-turbo-_JM', 'activo', false,
    null, 'Cabriolet', 2, 'Cabriolet', 2022
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4309376092-1', 'https://http2.mlstatic.com/D_Q_NP_751384-MCO114673919022_082026-B.webp', 0)
) as i(pid, url, pos);

-- Jeep Grand Cherokee Limited 2015 (MCO-2173931805)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'jeep-grand-cherokee-limited-2015', 'Jeep', 'Grand Cherokee', 2015, 'suv', 77000000, 47000, 0,
    '3.6 L', 'gasolina', 'automatica', '', 'Jeep Grand Cherokee 2015 3.6 Limited. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2173931805-jeep-grand-cherokee-36-limited-_JM', 'activo', false,
    null, null, null, 'Limited', 2015
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2173931805-1', 'https://http2.mlstatic.com/D_Q_NP_624274-MCO115584239258_092026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Hilux SRX A/T 2023 (MCO-2141325115)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-hilux-srx-a-t-2023-2141325115', 'Toyota', 'Hilux', 2023, 'pickup', 219900000, 10000, 0,
    '4.0 L', 'gasolina', 'automatica', '', 'Toyota Hilux 2023 Srx 4.0 A/t. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2141325115-toyota-hilux-srx-40-at-_JM', 'activo', false,
    null, null, null, 'SRX A/T', 2023
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2141325115-1', 'https://http2.mlstatic.com/D_Q_NP_694191-MCO116436942503_082026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Prado TX Blindada 2012 (MCO-2179707425)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-prado-tx-blindada-2012', 'Toyota', 'Prado', 2012, 'suv', 139900000, 160000, 0,
    '3.0 L', 'diesel', 'automatica', '', 'Toyota Prado 2012 Tx 3.0 Blindada. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-2179707425-toyota-prado-tx-30-blindada-_JM', 'activo', false,
    null, null, null, 'TX Blindada', 2012
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-2179707425-1', 'https://http2.mlstatic.com/D_Q_NP_848066-MCO117159550111_092026-B.webp', 0)
) as i(pid, url, pos);

-- Porsche Cayenne Platinum 2017 (MCO-4427562912)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'porsche-cayenne-platinum-2017', 'Porsche', 'Cayenne', 2017, 'suv', 189900000, 89000, 0,
    '3.0 L Diésel', 'diesel', 'automatica', '', 'Porsche Cayenne 2017 3.0 Diesel Platinum. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4427562912-porsche-cayenne-30-diesel-platinum-_JM', 'activo', false,
    null, null, null, 'Platinum', 2017
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4427562912-1', 'https://http2.mlstatic.com/D_Q_NP_735528-MCO116063274636_092026-B.webp', 0)
) as i(pid, url, pos);

-- Renault Zoe Ultimate 2022 (MCO-4082423332)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'renault-zoe-ultimate-2022', 'Renault', 'Zoe', 2022, 'electrico', 63000000, 19000, 0,
    'Eléctrico', 'electrico', 'automatica', '', 'Renault Zoe 2022 Ultimate. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4082423332-renault-zoe-ultimate-_JM', 'activo', false,
    null, null, null, 'Ultimate', 2022
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4082423332-1', 'https://http2.mlstatic.com/D_Q_NP_718922-MCO113774982429_062026-B.webp', 0)
) as i(pid, url, pos);

-- Toyota Prado Sumo TX 2013 (MCO-4076894416)
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    'toyota-prado-sumo-tx-2013', 'Toyota', 'Prado', 2013, 'suv', 135000000, 125000, 0,
    '', 'gasolina', 'automatica', '', 'Toyota Prado 2013 Sumo Tx. Ubicado en Bucaramanga - Santander. Publicación original en Mercado Libre: https://carro.mercadolibre.com.co/MCO-4076894416-toyota-prado-sumo-tx-_JM', 'activo', false,
    null, null, null, 'Sumo TX', 2013
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
    ('mercadolibre/MCO-4076894416-1', 'https://http2.mlstatic.com/D_Q_NP_894885-MCO113723074089_062026-B.webp', 0)
) as i(pid, url, pos);
