// Convierte un listado extraído (import/*.json) en un SQL de supabase/seed/.
// Uso: node scripts/build-vehicles-seed.mjs [listado.json] [salida.sql]
//   carros: node scripts/build-vehicles-seed.mjs   (por defecto)
//   motos:  node scripts/build-vehicles-seed.mjs import/listing-motos.json supabase/seed/import_mercadolibre_motos.sql
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const inputPath = resolve(process.argv[2] ?? resolve(root, "import/listing.json"));
const outputPath = resolve(process.argv[3] ?? resolve(root, "supabase/seed/import_mercadolibre_vehicles.sql"));
const listing = JSON.parse(readFileSync(inputPath, "utf8"));

const slugify = (...parts) =>
  parts
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");

/**
 * Datos por publicación. El listado de ML solo trae título, año, km y precio;
 * el resto sale del título o es una suposición marcada con verify:true
 * (combustible / transmisión son obligatorios en la tabla y no vienen en el listado).
 */
const DETAILS = {
  "MCO-4309317188": { brand: "Toyota", model: "Land Cruiser", version: "GRJ79 Chasis", category: "pickup", engine: "4.0 L", fuel: "gasolina", trans: "manual", verify: ["combustible", "transmisión"] },
  "MCO-4147193336": { brand: "Toyota", model: "4Runner", version: "Limited", category: "suv", engine: "4.0 L", fuel: "gasolina", trans: "automatica" },
  "MCO-2117141003": { brand: "Toyota", model: "Land Cruiser", version: "200 VXS Blindada", category: "suv", engine: "4.5 L Diésel", fuel: "diesel", trans: "automatica" },
  "MCO-4358805860": { brand: "Porsche", model: "Boxster", version: "718 GTS", category: "deportivo", engine: "2.5 L", fuel: "gasolina", trans: "automatica", verify: ["transmisión"] },
  "MCO-2117190713": { brand: "Mercedes-Benz", model: "Clase GLC", version: "300 4Matic Coupé", category: "suv", engine: "2.0 L", fuel: "gasolina", trans: "automatica", traccion: "4x4", carroceria: "Coupé", verify: ["combustible"] },
  "MCO-2018596135": { brand: "Mercedes-Benz", model: "Clase A", version: "35 AMG 4Matic", category: "deportivo", engine: "2.0 L Turbo Híbrido", fuel: "hibrido", trans: "automatica", traccion: "4x4" },
  "MCO-2190355839": { brand: "Toyota", model: "Fortuner", version: "SRV Blindada", category: "suv", engine: "4.0 L", fuel: "gasolina", trans: "automatica", verify: ["combustible", "transmisión"] },
  "MCO-2117142347": { brand: "Mercedes-Benz", model: "Clase GLC", version: "43 AMG Biturbo 4Matic", category: "suv", engine: "Biturbo", fuel: "gasolina", trans: "automatica", traccion: "4x4" },
  "MCO-4388444830": { brand: "Toyota", model: "Fortuner", version: "SRX 4x4 A/T", category: "suv", engine: "2.8 L Diésel", fuel: "diesel", trans: "automatica", traccion: "4x4" },
  "MCO-2117193783": { brand: "Jeep", model: "Wrangler", version: "Rubicon", category: "suv", engine: "2.0 L Turbo", fuel: "gasolina", trans: "automatica", verify: ["combustible", "transmisión"] },
  "MCO-2043972559": { brand: "Ford", model: "Fusion", version: "Titanium", category: "sedan", engine: "2.0 L", fuel: "gasolina", trans: "automatica", horsepower: 245, verify: ["transmisión"] },
  "MCO-4371741232": { brand: "Toyota", model: "Hilux", version: "SRX A/T", category: "pickup", engine: "2.8 L", fuel: "diesel", trans: "automatica", verify: ["combustible"] },
  "MCO-2167143639": { brand: "Toyota", model: "Prado", version: "First Edition Blindada", category: "suv", engine: "2.4 L", fuel: "gasolina", trans: "automatica", verify: ["combustible", "transmisión"] },
  "MCO-4309376092": { brand: "Mini", model: "Cooper S", version: "Cabriolet", category: "deportivo", engine: "2.0 L Turbo", fuel: "gasolina", trans: "automatica", carroceria: "Cabriolet", puertas: 2, verify: ["transmisión"] },
  "MCO-2173931805": { brand: "Jeep", model: "Grand Cherokee", version: "Limited", category: "suv", engine: "3.6 L", fuel: "gasolina", trans: "automatica", verify: ["transmisión"] },
  "MCO-2141325115": { brand: "Toyota", model: "Hilux", version: "SRX A/T", category: "pickup", engine: "4.0 L", fuel: "gasolina", trans: "automatica", verify: ["combustible"] },
  "MCO-2179707425": { brand: "Toyota", model: "Prado", version: "TX Blindada", category: "suv", engine: "3.0 L", fuel: "diesel", trans: "automatica", verify: ["combustible", "transmisión"] },
  "MCO-4427562912": { brand: "Porsche", model: "Cayenne", version: "Platinum", category: "suv", engine: "3.0 L Diésel", fuel: "diesel", trans: "automatica" },
  "MCO-4082423332": { brand: "Renault", model: "Zoe", version: "Ultimate", category: "electrico", engine: "Eléctrico", fuel: "electrico", trans: "automatica" },
  // ---- Motos y vehículos recreativos ----
  "MCO-2125655739": { brand: "Can-Am", model: "Outlander MAX", version: "Limited 1000R", category: "moto", engine: "1000R", fuel: "gasolina", trans: "automatica", traccion: "4x4", verify: ["transmisión"] },
  "MCO-2146850543": { brand: "Ducati", model: "Panigale", version: "V4 S", category: "moto", engine: "V4", fuel: "gasolina", trans: "manual" },
  "MCO-4363593728": { brand: "KTM", model: "Super Duke", version: "1290 R", category: "moto", engine: "1290 cc", fuel: "gasolina", trans: "manual" },
  "MCO-4076894416": { brand: "Toyota", model: "Prado", version: "Sumo TX", category: "suv", engine: "", fuel: "gasolina", trans: "automatica", verify: ["combustible", "transmisión"] },
};

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v) => (v === null || v === undefined ? "null" : String(v));

const usedSlugs = new Set();
const blocks = [];
const toVerify = [];
const brands = new Map();

for (const item of listing) {
  const d = DETAILS[item.mlId];
  if (!d) {
    console.warn(`Sin detalles para ${item.mlId} (${item.title}) — se omite`);
    continue;
  }

  const attrs = item.attributes;
  const year = Number(attrs.find((a) => /^\d{4}$/.test(a)));
  const kmText = attrs.find((a) => /km$/i.test(a)) ?? "0 Km";
  const km = Number(kmText.replace(/[^\d]/g, ""));

  let slug = slugify(d.brand, d.model, d.version, year);
  if (usedSlugs.has(slug)) slug = `${slug}-${item.mlId.replace("MCO-", "")}`;
  usedSlugs.add(slug);

  brands.set(slugify(d.brand), d.brand);
  if (d.verify) toVerify.push(`${d.brand} ${d.model} ${year}: ${d.verify.join(", ")}`);

  const description = `${item.title}. Ubicado en ${item.location ?? "Bucaramanga - Santander"}. Publicación original en Mercado Libre: ${item.url}`;

  const imageRows = item.images
    .map((url, i) => `    (${q(`mercadolibre/${item.mlId}-${i + 1}`)}, ${q(url)}, ${i})`)
    .join(",\n");

  blocks.push(`-- ${d.brand} ${d.model} ${d.version} ${year} (${item.mlId})
with v as (
  insert into public.vehicles (
    slug, brand, model, year, category, price, mileage_km, horsepower,
    engine, fuel_type, transmission, color, description, status, is_featured,
    traccion, carroceria, puertas, version, model_year
  ) values (
    ${q(slug)}, ${q(d.brand)}, ${q(d.model)}, ${year}, ${q(d.category)}, ${item.price}, ${km}, ${d.horsepower ?? 0},
    ${q(d.engine)}, ${q(d.fuel)}, ${q(d.trans)}, '', ${q(description)}, 'activo', false,
    ${q(d.traccion ?? null)}, ${q(d.carroceria ?? null)}, ${n(d.puertas ?? null)}, ${q(d.version)}, ${year}
  )
  on conflict (slug) do nothing
  returning id
)
insert into public.vehicle_images (vehicle_id, cloudinary_public_id, url, position)
select v.id, i.pid, i.url, i.pos
from v, (values
${imageRows}
) as i(pid, url, pos);
`);
}

const header = `-- =============================================================
-- Pixtta — Importación de vehículos desde Mercado Libre (${blocks.length} publicaciones)
-- Generado por scripts/build-vehicles-seed.mjs desde ${inputPath.replace(root, "").split("\\").join("/")}.
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
${toVerify.map((line) => `--   · ${line}`).join("\n")}
-- =============================================================

-- Marcas nuevas para el filtro de catálogo
insert into public.brands (slug, name) values
${[...brands].map(([slug, name]) => `  (${q(slug)}, ${q(name)})`).join(",\n")}
on conflict (slug) do nothing;

`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, header + blocks.join("\n"));
console.log(`${blocks.length} vehículos -> ${outputPath}`);
console.log(`${toVerify.length} con datos por verificar`);
