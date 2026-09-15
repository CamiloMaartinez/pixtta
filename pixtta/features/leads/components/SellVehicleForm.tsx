"use client";

import { useActionState, useRef, useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { createSellLeadAction } from "../actions/create-lead.action";
import { MAX_SELL_PHOTOS } from "../schemas/lead.schema";
import type { LeadFormState } from "../types";

interface CloudinarySignatureResponse {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

const initialState: LeadFormState = {};

export function SellVehicleForm(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(createSellLeadAction, initialState);
  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList): Promise<void> {
    setUploadError(null);
    const remainingSlots = MAX_SELL_PHOTOS - photos.length;

    if (remainingSlots <= 0) {
      setUploadError(`Ya alcanzaste el máximo de ${MAX_SELL_PHOTOS} fotos.`);
      return;
    }

    setIsUploading(true);

    try {
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      for (const file of filesToUpload) {
        const signRes = await fetch("/api/cloudinary/sign-lead", { method: "POST" });
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
        if (!uploadRes.ok) throw new Error("Falló la subida de una foto.");
        const uploaded = await uploadRes.json();

        setPhotos((prev) => [...prev, uploaded.secure_url as string]);
      }
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removePhoto(url: string): void {
    setPhotos((prev) => prev.filter((p) => p !== url));
  }

  if (state.success) {
    return (
      <div className="rounded-lg border border-teal bg-teal/10 px-6 py-8 text-center">
        <p className="font-display text-xl text-alabaster">¡Gracias!</p>
        <p className="mt-2 text-sm text-titanium">
          Recibimos los datos de tu vehículo. Un asesor de Pixtta te contactará con una oferta.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="group relative space-y-5 rounded-lg border border-titanium/30 bg-graphite p-8"
    >
      <HudFrame />

      {photos.map((url) => (
        <input key={url} type="hidden" name="photos" value={url} />
      ))}

      {state.error && (
        <p className="rounded-md border border-ignition bg-ignition/10 px-3 py-2 text-sm text-ignition">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" name="name" error={fieldError("name")} />
        <Field label="Teléfono" name="phone" type="tel" error={fieldError("phone")} />
        <Field label="Correo electrónico" name="email" type="email" error={fieldError("email")} />
        <Field label="Marca" name="brand" error={fieldError("brand")} />
        <Field label="Modelo" name="model" error={fieldError("model")} />
        <Field label="Año" name="year" type="number" error={fieldError("year")} />
        <Field
          label="Kilometraje"
          name="mileageKm"
          type="number"
          error={fieldError("mileageKm")}
        />
        <Field
          label="Precio esperado (COP)"
          name="expectedPrice"
          type="number"
          error={fieldError("expectedPrice")}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-titanium">
          Fotos (opcional, máximo {MAX_SELL_PHOTOS})
        </label>

        {photos.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {photos.map((url) => (
              <div
                key={url}
                className="relative h-20 w-20 overflow-hidden rounded-md border border-titanium/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(url)}
                  className="absolute right-0 top-0 bg-carbon/80 px-1.5 text-xs text-alabaster"
                  aria-label="Quitar foto"
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
          disabled={isUploading || photos.length >= MAX_SELL_PHOTOS}
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              void handleFiles(event.target.files);
            }
          }}
          className="text-sm text-titanium"
        />

        {isUploading && <p className="mt-2 text-xs text-titanium">Subiendo fotos...</p>}
        {uploadError && <p className="mt-2 text-xs text-ignition">{uploadError}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending || isUploading}
        className="rounded-md bg-ignition px-6 py-2.5 text-sm font-semibold text-alabaster transition-colors hover:bg-ignition/90 disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
}

function Field({ label, name, type = "text", error }: FieldProps): React.JSX.Element {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-titanium">{label}</label>
      <input
        name={name}
        type={type}
        min={type === "number" ? 0 : undefined}
        className="w-full rounded-md border border-titanium/40 bg-carbon px-3 py-2 text-sm text-alabaster outline-none transition-colors focus:border-teal"
      />
      {error && <p className="mt-1 text-xs text-ignition">{error}</p>}
    </div>
  );
}
