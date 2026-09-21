// Normaliza los logos de marcas (import/.../RR AUTOS..._files y Marcas _ FZ Autos_files) a PNG blanco sobre
// transparente en public/logos/<slug>.png, que es lo que carga <BrandMark />.
// Solo se procesan las marcas que existen en la tabla `brands` de Pixtta.
// Uso: node scripts/build-brand-logos.mjs
import { mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const srcDir = resolve(
  root,
  "import/mercadolibre",
  readdirSync(resolve(root, "import/mercadolibre")).find((d) => d.startsWith("RR AUTOS") && d.endsWith("_files"))
);
const fzDir = resolve(
  root,
  "import/mercadolibre",
  readdirSync(resolve(root, "import/mercadolibre")).find((d) => d.startsWith("Marcas _ FZ Autos") && d.endsWith("_files"))
);
const outDir = resolve(root, "public/logos");
mkdirSync(outDir, { recursive: true });

const BOX = { width: 360, height: 180 };

/**
 * modos:
 *  - "lum":   el logo es claro sobre fondo oscuro → la luminancia pasa a ser la opacidad
 *  - "alpha": ya es una silueta con transparencia → se pinta de blanco conservando el alfa
 */
const LOGOS = [
  // Vectoriales de FZ Autos (SVG negro sobre transparente → se pinta de blanco): más nítidos
  { slug: "ktm", file: "JB5si920240203_192613.svg", mode: "alpha", dir: fzDir },
  { slug: "renault", file: "bw9OC920230801_185525.svg", mode: "alpha", dir: fzDir },
  { slug: "ford", file: "Njmo6t20230801_191146.svg", mode: "alpha", dir: fzDir },
  { slug: "ducati", file: "cXpqGN20240203_192833.svg", mode: "alpha", dir: fzDir },
  // De RR AUTOS (raster)
  { slug: "audi", file: "audi.jpg", mode: "lum" },
  { slug: "cadillac", file: "Cadillac-Logo-scaled-e1761198543638.png", mode: "lum" },
  { slug: "can-am", file: "can-can.png", mode: "alpha" },
  { slug: "chevrolet", file: "chevrolet.jpg", mode: "lum" },
  { slug: "lamborghini", file: "lambo.svg", mode: "alpha", density: 600 },
  { slug: "mercedes-benz", file: "mercedez-scaled.png", mode: "alpha" },
  { slug: "toyota", file: "toyota.png", mode: "lum" },
];

async function toWhite(input, mode) {
  const base = sharp(input, { density: 600 }).ensureAlpha();
  const { data, info } = await (mode === "lum"
    ? base.flatten({ background: "#000000" }).toColourspace("b-w").ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    : base.raw().toBuffer({ resolveWithObject: true }));

  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const alpha = mode === "lum" ? data[i * info.channels] : data[i * info.channels + info.channels - 1];
    out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = 255;
    out[i * 4 + 3] = alpha;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

for (const logo of LOGOS) {
  const img = await toWhite(resolve(logo.dir ?? srcDir, logo.file), logo.mode);
  const trimmed = await img.png().toBuffer();
  await sharp(trimmed)
    .trim({ threshold: 8 })
    .resize({ ...BOX, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, `${logo.slug}.png`));
  console.log("ok", logo.slug);
}

// Sin logo por ahora (se muestra el monograma, o se quitan de la tabla `brands`): Porsche, BMW,
// Jeep, Mini, Range Rover y Sea-Doo. Para agregar uno, súbelo como public/logos/<slug>.png (blanco sobre transparente).
console.log(`Logos en ${outDir}`);
