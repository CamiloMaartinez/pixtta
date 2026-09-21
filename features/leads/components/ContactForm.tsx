"use client";

import { useActionState } from "react";
import { createContactLeadAction } from "../actions/create-contact-lead.action";
import type { LeadFormState } from "../types";

const initialState: LeadFormState = {};

const INPUT_CLASS =
  "w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition";
const LABEL_CLASS = "mb-1 block font-body text-xs font-medium uppercase tracking-wide text-titanium";

export function ContactForm(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(createContactLeadAction, initialState);

  if (state.success) {
    return (
      <div className="border border-teal/40 px-4 py-6 text-center">
        <p className="font-display text-lg font-bold uppercase text-alabaster">¡Mensaje enviado!</p>
        <p className="mt-2 font-body text-sm text-titanium">
          Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    );
  }

  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="border border-ignition/40 px-3 py-2 font-body text-sm text-ignition">
          {state.error}
        </p>
      )}

      <div>
        <label className={LABEL_CLASS}>Nombre</label>
        <input name="name" className={INPUT_CLASS} />
        {fieldError("name") && <p className="mt-1 font-body text-xs text-ignition">{fieldError("name")}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS}>Teléfono</label>
        <input name="phone" className={INPUT_CLASS} />
        {fieldError("phone") && <p className="mt-1 font-body text-xs text-ignition">{fieldError("phone")}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS}>Correo (opcional)</label>
        <input name="email" type="email" className={INPUT_CLASS} />
        {fieldError("email") && <p className="mt-1 font-body text-xs text-ignition">{fieldError("email")}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS}>Mensaje</label>
        <textarea name="message" rows={4} className={INPUT_CLASS} />
        {fieldError("message") && <p className="mt-1 font-body text-xs text-ignition">{fieldError("message")}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="press border border-titanium/20 bg-ignition px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster disabled:opacity-40"
      >
        {isPending ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}