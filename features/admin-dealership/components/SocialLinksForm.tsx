"use client";

import { useActionState } from "react";
import { updateSocialLinksAction } from "../actions/update-social-links.action";
import { SOCIAL_PLATFORMS } from "../schemas/dealership.schema";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { DealershipFormState } from "../types";
import type { SocialPlatform } from "@/types";

const initialState: DealershipFormState = {};

const INPUT_CLASS =
  "w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition";

export interface SocialLinkValue {
  url: string;
  isActive: boolean;
}

interface SocialLinksFormProps {
  values: Record<SocialPlatform, SocialLinkValue>;
}

export function SocialLinksForm({ values }: SocialLinksFormProps): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(updateSocialLinksAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p role="alert" className="border border-ignition/40 px-3 py-2 font-body text-sm text-ignition">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="border border-teal/40 px-3 py-2 font-body text-sm text-alabaster">
          Redes guardadas.
        </p>
      )}

      {SOCIAL_PLATFORMS.map(({ platform, label }) => {
        const error = state.fieldErrors?.[platform]?.[0];
        return (
          <div key={platform}>
            <label
              htmlFor={`url_${platform}`}
              className="mb-1 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide text-titanium"
            >
              <SocialIcon platform={platform} size={14} /> {label}
            </label>
            <div className="flex items-center gap-3">
              <input
                id={`url_${platform}`}
                name={`url_${platform}`}
                type="url"
                defaultValue={values[platform].url}
                className={INPUT_CLASS}
              />
              <label className="flex shrink-0 items-center gap-2 font-body text-xs text-titanium">
                <input
                  type="checkbox"
                  name={`active_${platform}`}
                  defaultChecked={values[platform].isActive}
                  className="accent-ignition"
                />
                Visible
              </label>
            </div>
            {error && <p className="mt-1 font-body text-xs text-ignition">{error}</p>}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isPending}
        className="border border-titanium/20 bg-ignition px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster disabled:opacity-40"
      >
        {isPending ? "Guardando..." : "Guardar redes"}
      </button>
    </form>
  );
}
