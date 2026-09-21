# Pixtta · Autos Premium

Sitio web y panel administrativo de **Pixtta**, concesionario en Bucaramanga (Santander, Colombia): catálogo de vehículos, motos y recreativos, distribuidor autorizado Can-Am · Sea-Doo.

## Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** con la paleta oficial de la marca
- **Supabase** (base de datos, autenticación y políticas RLS)
- **Cloudinary** (fotos de vehículos subidas desde el admin)

## Ejecutar en local

```bash
npm install
cp .env.example .env.local   # completa tus claves (ver abajo)
npm run dev                  # http://localhost:3000
```

### Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Conexión a Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor, tareas administrativas |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Subida de fotos |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Respaldo del número de WhatsApp |
| `NEXT_PUBLIC_SITE_URL` | URL pública (sitemap, Open Graph) |

Nunca subas `.env.local` al repositorio.

## Base de datos

Las migraciones están en [`supabase/migrations`](supabase/migrations) y se aplican en orden. Los datos de arranque (vehículos importados, ajustes) están en [`supabase/seed`](supabase/seed). Guía completa en [`supabase/README.md`](supabase/README.md).

## Estructura

```
app/         Rutas: sitio público, /admin y API
components/  Componentes de interfaz (layout, ui, seo)
features/    Lógica por módulo (vehículos, leads, media, admin, concesionario)
lib/         Utilidades, constantes y clientes (Supabase, Cloudinary)
public/      Logo, logos de marcas y fotografías
scripts/     Generación de logos, fotos optimizadas y SQL de importación
```

## Despliegue

Ver [`DEPLOYMENT.md`](DEPLOYMENT.md) (GitHub + Vercel).

---

Diseño y desarrollo: Camilo Martínez.
