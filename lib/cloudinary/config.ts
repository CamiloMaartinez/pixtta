import { v2 as cloudinary } from "cloudinary";

/**
 * Cliente de Cloudinary — solo para uso en el servidor.
 * Nunca se importa desde un Client Component.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
