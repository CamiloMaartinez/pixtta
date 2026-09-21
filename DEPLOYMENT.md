# Pixtta — Guía de despliegue (GitHub + Vercel)

Sigue esto en orden, tal como hicimos con Supabase y Cloudinary. No saltes pasos aunque parezcan obvios.

---

## Parte 1 — Subir el proyecto a GitHub

### 1.1 Crear cuenta en GitHub (si no tienes)

1. Ve a [github.com](https://github.com) → **Sign up**.
2. Completa el registro con tu correo.

### 1.2 Crear el repositorio vacío

1. Ya con sesión iniciada, click en el **+** arriba a la derecha → **New repository**.
2. **Repository name:** `pixtta`
3. **Visibility:** Private (recomendado, mientras el proyecto no sea público) o Public, como prefieras.
4. **No marques** "Add a README", "Add .gitignore" ni "Choose a license" — el proyecto ya tiene sus propios archivos, no queremos que choquen.
5. Click en **Create repository**.
6. GitHub te muestra una pantalla con comandos y una URL como:
   ```
   https://github.com/tu-usuario/pixtta.git
   ```
   Copia esa URL, la necesitas en el siguiente paso.

### 1.3 Subir el código desde tu computador

En VS Code, terminal, dentro de la carpeta `pixtta` (la de tu último zip):

```powershell
git init
git add .
git commit -m "Primera versión de Pixtta"
git branch -M main
git remote add origin https://github.com/tu-usuario/pixtta.git
git push -u origin main
```

**Si `git` no está instalado**, Windows te mostrará un error como `git no se reconoce como un comando`. En ese caso:
1. Descarga Git desde [git-scm.com/download/win](https://git-scm.com/download/win).
2. Instálalo con las opciones por defecto (Next, Next, Next).
3. **Cierra y vuelve a abrir** la terminal de VS Code.
4. Repite los comandos de arriba.

**Verificación importante antes de subir:** confirma que tu `.env.local` **no** se vaya a subir (contiene tus claves secretas). Ejecuta:
```powershell
git status
```
Si en la lista aparece `.env.local`, **detente** y avísame — no debe subirse. Si no aparece (porque `.gitignore` ya lo excluye, como debería), continúa sin problema.

### 1.4 Confirmar en GitHub

Recarga la página de tu repositorio en GitHub — deberías ver todas las carpetas (`app`, `features`, `lib`, etc.) ya ahí.

---

## Parte 2 — Conectar Vercel

### 2.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Sign Up**.
2. Elige **Continue with GitHub** — así quedan conectados automáticamente, sin pasos adicionales.
3. Autoriza el acceso cuando GitHub te lo pida.

### 2.2 Importar el proyecto

1. En el dashboard de Vercel, click en **Add New...** → **Project**.
2. En la lista de repositorios, busca `pixtta` y click en **Import**.
3. Vercel detecta automáticamente que es un proyecto Next.js — no necesitas cambiar nada en "Build and Output Settings".

### 2.3 Configurar las variables de entorno

**Este es el paso que no debes olvidar** — como `.env.local` nunca se subió a GitHub (a propósito, por seguridad), Vercel no tiene tus credenciales. Antes de darle a "Deploy":

1. En la misma pantalla de importación, busca la sección **"Environment Variables"**.
2. Agrega, una por una, las mismas variables que tienes en tu `.env.local`:

   | Nombre | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | el que ya usas |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | el que ya usas |
   | `SUPABASE_SERVICE_ROLE_KEY` | (déjalo vacío si no lo has usado) |
   | `CLOUDINARY_CLOUD_NAME` | el que ya usas |
   | `CLOUDINARY_API_KEY` | el que ya usas |
   | `CLOUDINARY_API_SECRET` | el que ya usas |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | tu número real, si ya lo tienes |
   | `NEXT_PUBLIC_SITE_URL` | déjalo vacío por ahora — lo llenamos en el paso 2.5, una vez sepamos la URL final |

3. Click en **Deploy**.

### 2.4 Esperar el primer despliegue

Vercel va a instalar dependencias y construir el proyecto — toma 1-3 minutos. Si todo sale bien, verás una pantalla de éxito con un botón para visitar el sitio, y una URL como:
```
https://pixtta.vercel.app
```

**Si el despliegue falla** (pantalla roja con "Build Failed"), click en **"View Logs"** y cópiame el error — es normalmente una variable de entorno mal escrita o faltante.

### 2.5 Completar `NEXT_PUBLIC_SITE_URL`

Ahora que ya tienes tu URL real:
1. En el proyecto dentro de Vercel, ve a **Settings → Environment Variables**.
2. Edita `NEXT_PUBLIC_SITE_URL` y pon tu URL real, por ejemplo:
   ```
   https://pixtta.vercel.app
   ```
   (sin `/` al final).
3. Guarda.
4. Ve a la pestaña **Deployments**, en el despliegue más reciente click en los tres puntos `⋮` → **Redeploy** (para que tome la variable nueva).

---

## Parte 3 — Verificación final

Repite una versión corta del checklist que ya usamos, pero ahora sobre tu URL real en vez de `localhost:3000`:

1. Abre `https://tu-proyecto.vercel.app` → debe cargar el home con el diseño de marca.
2. `/catalogo` → deben verse tus vehículos activos, con foto si ya subiste alguna.
3. `/admin/login` → inicia sesión con tu usuario admin real.
4. `/sitemap.xml` → debe mostrar URLs con tu dominio real de Vercel (no `localhost`).
5. Desde tu celular (datos móviles, no wifi de tu casa, para confirmar que es realmente público), abre esa misma URL.

---

## Parte 4 — Cómo actualizar el sitio después de este despliegue

A partir de ahora, cada vez que quieras publicar un cambio:

```powershell
git add .
git commit -m "Describe aquí qué cambiaste"
git push
```

Vercel detecta el `push` automáticamente y vuelve a desplegar solo — no necesitas volver a tocar nada en Vercel. Esto también significa que, de aquí en adelante, en vez de que yo te entregue un `.zip` en cada paso, puedo darte el código para que lo agregues directamente a tu proyecto local, y tú lo subes con estos 3 comandos.

---

## Parte 5 — Dominio propio (opcional, no obligatorio ahora)

Si más adelante compras un dominio real (ej. `pixtta.com`):
1. En Vercel → tu proyecto → **Settings → Domains** → agrega el dominio.
2. Vercel te muestra registros DNS para configurar en donde compraste el dominio (GoDaddy, Namecheap, etc.).
3. Una vez propagado (puede tardar hasta 24h), actualiza `NEXT_PUBLIC_SITE_URL` a ese dominio y vuelve a desplegar.

No es necesario hacerlo ahora — `pixtta.vercel.app` (o el subdominio que te asigne) funciona perfectamente para probar con usuarios reales mientras decides si quieres un dominio propio.
