import { cloudinary } from "@/lib/cloudinary/config";

export interface UploadSignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

/**
 * Contrato de acceso al proveedor de imágenes. Igual que con
 * VehicleRepository, nadie fuera de esta capa importa Cloudinary
 * directamente.
 */
export interface ImageService {
  createUploadSignature(): UploadSignature;
  createLeadUploadSignature(): UploadSignature;
  deleteImage(publicId: string): Promise<void>;
}

const UPLOAD_FOLDER = "pixtta/vehicles";
const LEAD_UPLOAD_FOLDER = "pixtta/leads";

function signFolder(folder: string): UploadSignature {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET ?? ""
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    folder,
  };
}

export class CloudinaryImageService implements ImageService {
  createUploadSignature(): UploadSignature {
    return signFolder(UPLOAD_FOLDER);
  }

  /**
   * Firma para subidas públicas y anónimas (formulario /vender). Usa una
   * carpeta separada de la de vehículos publicados en el catálogo.
   */
  createLeadUploadSignature(): UploadSignature {
    return signFolder(LEAD_UPLOAD_FOLDER);
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}

export function getImageService(): ImageService {
  return new CloudinaryImageService();
}
