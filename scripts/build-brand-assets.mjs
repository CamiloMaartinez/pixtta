// Genera los recursos de marca de Pixtta a partir de la página de Instagram guardada
// (import/mercadolibre/Instagram_files): logo con fondo transparente, iconos,
// imagen para compartir en redes y fotos optimizadas del sitio.
// Uso: node scripts/build-brand-assets.mjs
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const src = resolve(root, "import/mercadolibre/Instagram_files");
const out = (p) => {
  const full = resolve(root, p);
  mkdirSync(dirname(full), { recursive: true });
  return full;
};

// Colores oficiales, muestreados del logo de Instagram.
const BG = { r: 0x19, g: 0x16, b: 0x1d }; // #19161D
const WHITE = { r: 255, g: 255, b: 255 };
const RED = { r: 0xe6, g: 0x30, b: 0x3d }; // #E6303D

const dist = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);

// ---------------------------------------------------------------
// 1) Logo: quita el fondo oscuro y conserva blanco + rojo con alfa suave.
// ---------------------------------------------------------------
const logoFile = readdirSync(src).find((f) => f.startsWith("313789806_"));
if (!logoFile) throw new Error("No encuentro el logo (313789806_*.jpg) en Instagram_files");

const { data, info } = await sharp(resolve(src, logoFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const rgba = Buffer.alloc(W * H * 4);

for (let i = 0; i < W * H; i++) {
  const p = { r: data[i * 4], g: data[i * 4 + 1], b: data[i * 4 + 2] };
  const isRed = p.r - p.g > 60;
  const target = isRed ? RED : WHITE;
  const a = Math.min(1, dist(p, BG) / dist(target, BG));
  const alpha = a < 0.06 ? 0 : a;
  rgba[i * 4] = target.r;
  rgba[i * 4 + 1] = target.g;
  rgba[i * 4 + 2] = target.b;
  rgba[i * 4 + 3] = Math.round(alpha * 255);
}

const alphaAt = (x, y) => rgba[(y * W + x) * 4 + 3];
const rowHasInk = (y) => { for (let x = 0; x < W; x++) if (alphaAt(x, y) > 40) return true; return false; };
const colHasInk = (x, y0, y1) => { for (let y = y0; y <= y1; y++) if (alphaAt(x, y) > 40) return true; return false; };

// Filas con tinta → bloques (wordmark, tagline)
const bands = [];
for (let y = 0, start = -1; y <= H; y++) {
  const ink = y < H && rowHasInk(y);
  if (ink && start < 0) start = y;
  if (!ink && start >= 0) { bands.push([start, y - 1]); start = -1; }
}
const [wordY0, wordY1] = bands[0];
const [, tagY1] = bands[bands.length - 1];

// Columnas con tinta dentro del wordmark → glifos (P I X T T A)
const glyphs = [];
for (let x = 0, start = -1; x <= W; x++) {
  const ink = x < W && colHasInk(x, wordY0, wordY1);
  if (ink && start < 0) start = x;
  if (!ink && start >= 0) { glyphs.push([start, x - 1]); start = -1; }
}
console.log("bandas:", bands, "glifos:", glyphs.length, glyphs);

let xMin = Math.min(...glyphs.map((g) => g[0]));
let xMax = Math.max(...glyphs.map((g) => g[1]));
const pad = 6;
const full = { left: Math.max(0, xMin - pad), top: Math.max(0, wordY0 - pad), width: xMax - xMin + 1 + pad * 2, height: tagY1 - wordY0 + 1 + pad * 2 };
const wordmark = { left: full.left, top: full.top, width: full.width, height: wordY1 - wordY0 + 1 + pad * 2 };

const rawLogo = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
await rawLogo.clone().extract(full).png().toFile(out("public/brand/logo-pixtta.png"));
await rawLogo.clone().extract(wordmark).png().toFile(out("public/brand/logo-wordmark.png"));

// Isotipo: la "X" con la puerta roja (tercer glifo)
const xGlyph = glyphs[2];
const xw = xGlyph[1] - xGlyph[0] + 1;
const xh = wordY1 - wordY0 + 1;
const iconGlyph = await rawLogo
  .clone()
  .extract({ left: xGlyph[0] - 2, top: wordY0 - 2, width: xw + 4, height: xh + 4 })
  .png()
  .toBuffer();
await sharp(iconGlyph).toFile(out("public/brand/logo-x.png"));

async function iconOnBg(size, file, ratio = 0.56) {
  const inner = Math.round(size * ratio);
  const glyph = await sharp(iconGlyph).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...BG, alpha: 1 } } })
    .composite([{ input: glyph, gravity: "center" }])
    .png()
    .toFile(out(file));
}
await iconOnBg(512, "app/icon.png");
await iconOnBg(180, "app/apple-icon.png");

// ---------------------------------------------------------------
// 2) Fotos. Índices = orden de las fotos grandes (>=1440 px) ordenadas por nombre.
// ---------------------------------------------------------------
const bigFiles = [];
for (const f of readdirSync(src).filter((f) => /\.(jpg|heic)$/i.test(f)).sort()) {
  const m = await sharp(resolve(src, f)).metadata();
  if ((m.width ?? 0) >= 1440) bigFiles.push(f);
}
console.log("fotos grandes:", bigFiles.length);
const photo = (n) => resolve(src, bigFiles[n - 1]);

const PHOTOS = {
  "public/images/hero/1.jpg": 20, // Porsche Cayenne frente a la fachada
  "public/images/hero/2.jpg": 4, // Can-Am Outlander en el showroom BRP
  "public/images/hero/3.jpg": 8, // Sea-Doo en el showroom BRP
  "public/images/galeria/1.jpg": 15,
  "public/images/galeria/2.jpg": 16,
  "public/images/galeria/3.jpg": 19,
  "public/images/galeria/4.jpg": 13,
  "public/images/galeria/5.jpg": 14,
  "public/images/galeria/6.jpg": 7,
  "public/images/brp/aventura.jpg": 24,
  // Collage de la página principal (fotos aún no usadas en otras secciones)
  "public/images/collage/1.jpg": 1, // Can-Am Outlander en el bosque
  "public/images/collage/2.jpg": 2, // Can-Am Pulse eléctrica
  "public/images/collage/3.jpg": 5, // Can-Am en el desierto
  "public/images/collage/4.jpg": 3, // Sea-Doo 2026
  "public/images/collage/5.jpg": 10, // Toyota 4Runner blanca
  "public/images/collage/6.jpg": 18, // Toyota Prado gris
  "public/images/collage/7.jpg": 21, // Lexus blanca
  "public/images/collage/8.jpg": 17, // Toyota Land Cruiser blanca
};
for (const [file, n] of Object.entries(PHOTOS)) {
  await sharp(photo(n)).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(out(file));
}

// ---------------------------------------------------------------
// 3) Imagen para compartir (Open Graph / Twitter): 1200x630
// ---------------------------------------------------------------
const OG_W = 1200, OG_H = 630;
const ogPhoto = await sharp(photo(20)).resize(760, OG_H, { fit: "cover", position: "centre" }).jpeg({ quality: 80 }).toBuffer();
const fade = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0.35" stop-color="#19161D" stop-opacity="1"/><stop offset="0.75" stop-color="#19161D" stop-opacity="0.15"/></linearGradient></defs><rect width="${OG_W}" height="${OG_H}" fill="url(#g)"/><rect x="0" y="${OG_H - 8}" width="${OG_W}" height="8" fill="#E6303D"/></svg>`
);
const ogLogo = await sharp(out("public/brand/logo-pixtta.png")).resize({ width: 520 }).toBuffer();
await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: BG } })
  .composite([
    { input: ogPhoto, left: OG_W - 760, top: 0 },
    { input: fade, left: 0, top: 0 },
    { input: ogLogo, left: 70, gravity: undefined, top: 200 },
  ])
  .png()
  .toFile(out("app/opengraph-image.png"));

console.log("Listo: public/brand, public/images, app/icon.png, app/apple-icon.png, app/opengraph-image.png");
