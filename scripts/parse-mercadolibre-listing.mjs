// Lee el HTML guardado del listado de MercadoLibre y escribe import/listing.json.
// Uso: node scripts/parse-mercadolibre-listing.mjs "<ruta al .html>" [salida.json]
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const file = process.argv[2];
if (!file) {
  console.error('Uso: node scripts/parse-mercadolibre-listing.mjs "<archivo.html>"');
  process.exit(1);
}

const html = readFileSync(file, "utf8");
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const cards = html.split('<li class="ui-search-layout__item"').slice(1);
const items = [];

for (const card of cards) {
  const link = card.match(/class="poly-component__title"[^>]*>([^<]*)</) ;
  const href = card.match(/<a href="(https:\/\/[^"]*mercadolibre\.com\.co\/MCO-(\d+)[^"]*)"[^>]*class="poly-component__title"/);
  if (!link || !href) continue;

  const price = card.match(/aria-label="(\d+) pesos colombianos"/);
  const attrs = [...card.matchAll(/poly-attributes_list__item[^>]*>([^<]*)</g)].map((m) => decode(m[1]).trim());
  const location = card.match(/poly-component__location">([^<]*)</);

  // Cada foto viene en varios tamaños (srcset); nos quedamos con la de 800 px (-B).
  const images = new Set(
    [...card.matchAll(/https:\/\/http2\.mlstatic\.com\/D_[A-Za-z0-9_-]+-B\.webp/g)].map((m) => m[0])
  );

  items.push({
    mlId: `MCO-${href[2]}`,
    title: decode(link[1]).trim(),
    url: decode(href[1]).split("#")[0],
    price: price ? Number(price[1]) : null,
    attributes: attrs,
    location: location ? decode(location[1]).trim() : null,
    images: [...images],
  });
}

const out = process.argv[3]
  ? resolve(process.argv[3])
  : fileURLToPath(new URL("../import/listing.json", import.meta.url));
writeFileSync(out, JSON.stringify(items, null, 2));
console.log(`${items.length} publicaciones -> ${out}`);
