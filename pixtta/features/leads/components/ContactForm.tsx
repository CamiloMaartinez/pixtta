"use client";

import { useActionState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { createContactLeadAction } from "../actions/create-lead.action";
import type { LeadFormState } from "../types";

interface ContactFormProps {
  vehicleId?: string;
}

const initialState: LeadFormState = {};

export function ContactForm({ vehicleId }: ContactFormProps): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(createContactLeadAction, initialState);
  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  if (state.success) {
    return (
      <div className="rounded-lg border border-teal bg-teal/10 px-6 py-8 text-center">
        <p className="font-display text-xl text-alabaster">¡Gracias por escribirnos!</p>
        <p className="mt-2 text-sm text-titanium">Un asesor de Pixtta te contactará pronto.</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="group relative space-y-5 rounded-lg border border-titanium/30 bg-graphite p-8"
    >
      <HudFrame />

      {vehicleId && <input type="hidden" name="vehicleId" defaultValue={vehicleId} />}

      {state.error && (
        <p className="rounded-md border border-ignition bg-ignition/10 px-3 py-2 text-sm text-ignition">
          {state.error}
        </p>
      )}

      <Field label="Nombre" name="name" error={fieldError("name")} />
      <Field label="Teléfono" name="phone" type="tel" error={fieldError("phone")} />

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-titanium">
          Mensaje
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-titanium/40 bg-carbon px-3 py-2 text-sm text-alabaster outline-none transition-colors focus:border-teal"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-ignition px-6 py-2.5 text-sm font-semibold text-alabaster transition-colors hover:bg-ignition/90 disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar mensaje"}
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
        className="w-full rounded-md border border-titanium/40 bg-carbon px-3 py-2 text-sm text-alabaster outline-none transition-colors focus:border-teal"
      />
      {error && <p className="mt-1 text-xs text-ignition">{error}</p>}
    </div>
  );
}
