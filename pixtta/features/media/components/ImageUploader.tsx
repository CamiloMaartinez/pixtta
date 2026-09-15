"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { VehicleImage } from "@/types";
import { addVehicleImageAction } from "../actions/add-vehicle-image.action";
import { deleteVehicleImageAction } from "../actions/delete-vehicle-image.action";

interface ImageUploaderProps {
  vehicleId: string;
  images: VehicleImage[];
}

interface CloudinarySignatureResponse {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

/**
 * Sube archivos directo desde el navegador a Cloudinary (usando una
 * firma generada en el servidor), y persiste cada resultado en
 * `vehicle_images` a través de una Server Action.
 */
export function ImageUploader({ vehicleId, images }: ImageUploaderProps): React.JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList): Promise<void> {
    setError(null);
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;

        const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
        if (!signRes.ok) throw new Error("No se pudo generar la firma de subida.");
        const signature: CloudinarySignatureResponse = await signRes.json();

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("api_key", signature.apiKey);
        uploadData.append("timestamp", String(signature.timestamp));
        uploadData.append("signature", signature.signature);
        uploadData.append("folder", signature.folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
          { method: "POST", body: uploadData }
        );
        if (!uploadRes.ok) throw new Error("Falló la subida a Cloudinary.");
        const uploaded = await uploadRes.json();

        const result = await addVehicleImageAction(
          vehicleId,
          uploaded.secure_url,
          uploaded.public_id,
          images.length + i
        );
        if (result.error) throw new Error(result.error);
      }

      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(imageId: string): Promise<void> {
    const confirmed = window.confirm("¿Eliminar esta fotografía?");
    if (!confirmed) return;

    const result = await deleteVehicleImageAction(imageId, vehicleId);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
        Fotografías
      </label>

      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative h-20 w-20 overflow-hidden rounded-md border border-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(image.id)}
                className="absolute right-0 top-0 bg-black/60 px-1.5 text-xs text-white"
                aria-label="Eliminar fotografía"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={isUploading}
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            void handleFiles(event.target.files);
          }
        }}
        className="text-sm"
      />

      {isUploading && <p className="mt-2 text-xs text-neutral-500">Subiendo...</p>}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
