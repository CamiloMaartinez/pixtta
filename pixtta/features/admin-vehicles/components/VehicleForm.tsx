"use client";

import { useActionState } from "react";
import { CATEGORY_OPTIONS } from "@/features/vehicles/constants";
import type { Vehicle } from "@/types";
import { FUEL_OPTIONS, STATUS_OPTIONS, TRANSMISSION_OPTIONS } from "../constants";
import type { VehicleFormState } from "../types";

interface VehicleFormProps {
  action: (prevState: VehicleFormState, formData: FormData) => Promise<VehicleFormState>;
  defaultValues?: Vehicle;
}

const initialState: VehicleFormState = {};

/**
 * Formulario único, reutilizado tanto para crear como para editar.
 * La diferencia entre ambos casos es la Server Action que recibe
 * y si trae `defaultValues` (edición) o no (creación).
 */
export function VehicleForm({ action, defaultValues }: VehicleFormProps): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="space-y-6">
      {defaultValues && <input type="hidden" name="id" defaultValue={defaultValues.id} />}

      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Marca" name="brand" defaultValue={defaultValues?.brand} error={fieldError("brand")} />
        <Field label="Modelo" name="model" defaultValue={defaultValues?.model} error={fieldError("model")} />
        <Field
          label="Año"
          name="year"
          type="number"
          defaultValue={defaultValues?.year}
          error={fieldError("year")}
        />
        <SelectField
          label="Categoría"
          name="category"
          options={CATEGORY_OPTIONS}
          defaultValue={defaultValues?.category}
          error={fieldError("category")}
        />
        <Field
          label="Precio (COP)"
          name="price"
          type="number"
          defaultValue={defaultValues?.price}
          error={fieldError("price")}
        />
        <Field
          label="Kilometraje"
          name="mileageKm"
          type="number"
          defaultValue={defaultValues?.mileageKm}
          error={fieldError("mileageKm")}
        />
        <Field
          label="Potencia (HP)"
          name="horsepower"
          type="number"
          defaultValue={defaultValues?.horsepower}
          error={fieldError("horsepower")}
        />
        <Field
          label="0–100 km/h (s)"
          name="acceleration0To100"
          type="number"
          step="0.1"
          defaultValue={defaultValues?.acceleration0To100}
          error={fieldError("acceleration0To100")}
        />
        <Field
          label="Vel. máxima (km/h)"
          name="topSpeedKmh"
          type="number"
          defaultValue={defaultValues?.topSpeedKmh}
          error={fieldError("topSpeedKmh")}
        />
        <Field label="Motor" name="engine" defaultValue={defaultValues?.engine} error={fieldError("engine")} />
        <SelectField
          label="Combustible"
          name="fuelType"
          options={FUEL_OPTIONS}
          defaultValue={defaultValues?.fuelType}
          error={fieldError("fuelType")}
        />
        <SelectField
          label="Transmisión"
          name="transmission"
          options={TRANSMISSION_OPTIONS}
          defaultValue={defaultValues?.transmission}
          error={fieldError("transmission")}
        />
        <Field label="Color" name="color" defaultValue={defaultValues?.color} error={fieldError("color")} />
        <SelectField
          label="Estado"
          name="status"
          options={STATUS_OPTIONS}
          defaultValue={defaultValues?.status ?? "borrador"}
          error={fieldError("status")}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
          Descripción
        </label>
        <textarea
          name="description"
          defaultValue={defaultValues?.description}
          rows={4}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" name="isFeatured" defaultChecked={defaultValues?.isFeatured} />
        Marcar como destacado
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  step?: string;
  defaultValue?: string | number;
  error?: string;
}

function Field({ label, name, type = "text", step, defaultValue, error }: FieldProps): React.JSX.Element {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">{label}</label>
      <input
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
  error?: string;
}

function SelectField({ label, name, options, defaultValue, error }: SelectFieldProps): React.JSX.Element {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
