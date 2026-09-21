"use client";

import { useActionState } from "react";
import { updateDealershipAction } from "../actions/update-dealership.action";
import type { DealershipFormState } from "../types";
import type { DealershipProfile } from "@/types";

const initialState: DealershipFormState = {};

const INPUT_CLASS =
  "w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition";
const LABEL_CLASS =
  "mb-1 block font-body text-xs font-medium uppercase tracking-wide text-titanium";

interface DealershipFormProps {
  profile: Omit<DealershipProfile, "socialLinks">;
}

export function DealershipForm({ profile }: DealershipFormProps): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(updateDealershipAction, initialState);
  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  const field = (
    name: string,
    label: string,
    value: string | number,
    options: { type?: string; step?: string; hint?: string } = {}
  ): React.JSX.Element => (
    <div>
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={options.type ?? "text"}
        step={options.step}
        defaultValue={value}
        className={INPUT_CLASS}
      />
      {options.hint && <p className="mt-1 font-body text-xs text-titanium/70">{options.hint}</p>}
      {fieldError(name) && <p className="mt-1 font-body text-xs text-ignition">{fieldError(name)}</p>}
    </div>
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p role="alert" className="border border-ignition/40 px-3 py-2 font-body text-sm text-ignition">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="border border-teal/40 px-3 py-2 font-body text-sm text-alabaster">
          Información guardada. El sitio público ya la muestra.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {field("name", "Nombre", profile.name)}
        {field("slogan", "Lema", profile.slogan)}
      </div>

      <div>
        <label htmlFor="description" className={LABEL_CLASS}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={profile.description}
          className={INPUT_CLASS}
        />
        {fieldError("description") && (
          <p className="mt-1 font-body text-xs text-ignition">{fieldError("description")}</p>
        )}
      </div>

      {field("address", "Dirección", profile.address)}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {field("city", "Ciudad", profile.city)}
        {field("region", "Departamento", profile.region)}
        {field("country", "País", profile.country)}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {field("latitude", "Latitud", profile.latitude, { type: "number", step: "any" })}
        {field("longitude", "Longitud", profile.longitude, { type: "number", step: "any" })}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {field("phone", "Teléfono (como se muestra)", profile.phone, { hint: "Ej. +57 316 798 9657" })}
        {field("whatsappNumber", "WhatsApp (solo dígitos)", profile.whatsappNumber, {
          hint: "Con indicativo, sin +. Ej. 573167989657",
        })}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="border border-titanium/20 bg-ignition px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster disabled:opacity-40"
      >
        {isPending ? "Guardando..." : "Guardar información"}
      </button>
    </form>
  );
}
