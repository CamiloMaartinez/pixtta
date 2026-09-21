"use client";

import { useActionState } from "react";
import type { Brand, Category, Vehicle } from "@/types";
import { FUEL_OPTIONS, STATUS_OPTIONS, TRANSMISSION_OPTIONS } from "../constants";
import type { VehicleFormState } from "../types";

interface VehicleFormProps {
  action: (prevState: VehicleFormState, formData: FormData) => Promise<VehicleFormState>;
  defaultValues?: Vehicle;
  brands: Brand[];
  categories: Category[];
}

const initialState: VehicleFormState = {};

const INPUT_CLASS =
  "w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition";
const LABEL_CLASS = "mb-1 block font-body text-xs font-medium uppercase tracking-wide text-titanium";

const PLACA_OPTIONS = [
  { value: "", label: "Sin especificar" },
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
];

export function VehicleForm({
  action,
  defaultValues,
  brands,
  categories,
}: VehicleFormProps): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const fieldError = (name: string): string | undefined => state.fieldErrors?.[name]?.[0];

  const brandOptions = brands.map((b) => ({ value: b.name, label: b.name }));
  const categoryOptions = categories.map((c) => ({ value: c.slug, label: c.name }));

  return (
    <form action={formAction} className="space-y-6">
      {defaultValues && <input type="hidden" name="id" defaultValue={defaultValues.id} />}

      {state.error && (
        <p className="border border-ignition/40 px-3 py-2 font-body text-sm text-ignition">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Marca"
          name="brand"
          options={brandOptions}
          defaultValue={defaultValues?.brand}
          error={fieldError("brand")}
        />
        <Field label="Modelo" name="model" defaultValue={defaultValues?.model} error={fieldError("model")} />
        <Field
          label="Año (fabricación)"
          name="year"
          type="number"
          defaultValue={defaultValues?.year}
          error={fieldError("year")}
        />
        <SelectField
          label="Categoría"
          name="category"
          options={categoryOptions}
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
        <Field
          label="Capacidad (asientos)"
          name="seats"
          type="number"
          defaultValue={defaultValues?.seats ?? undefined}
          error={fieldError("seats")}
        />
        <SelectField
          label="Estado"
          name="status"
          options={STATUS_OPTIONS}
          defaultValue={defaultValues?.status ?? "borrador"}
          error={fieldError("status")}
        />
      </div>

      <div className="border-t border-titanium/10 pt-6">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-titanium">
          Datos adicionales (mercado colombiano)
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Modelo (año de matrícula)"
            name="modelYear"
            type="number"
            defaultValue={defaultValues?.modelYear ?? undefined}
            error={fieldError("modelYear")}
          />
          <Field
            label="Tracción"
            name="traccion"
            defaultValue={defaultValues?.traccion ?? undefined}
            error={fieldError("traccion")}
          />
          <Field
            label="Carrocería"
            name="carroceria"
            defaultValue={defaultValues?.carroceria ?? undefined}
            error={fieldError("carroceria")}
          />
          <Field
            label="Puertas"
            name="puertas"
            type="number"
            defaultValue={defaultValues?.puertas ?? undefined}
            error={fieldError("puertas")}
          />
          <Field
            label="Versión"
            name="version"
            defaultValue={defaultValues?.version ?? undefined}
            error={fieldError("version")}
          />
          <SelectField
            label="Placa terminada en"
            name="placaTerminadaEn"
            options={PLACA_OPTIONS}
            defaultValue={defaultValues?.placaTerminadaEn ?? ""}
            error={fieldError("placaTerminadaEn")}
          />
          <Field
            label="Origen de placa"
            name="origenPlaca"
            defaultValue={defaultValues?.origenPlaca ?? undefined}
            error={fieldError("origenPlaca")}
          />
          <Field
            label="Documentos vigentes hasta"
            name="documentosVigentesHasta"
            type="date"
            defaultValue={defaultValues?.documentosVigentesHasta ?? undefined}
            error={fieldError("documentosVigentesHasta")}
          />
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>Descripción</label>
        <textarea
          name="description"
          defaultValue={defaultValues?.description}
          rows={4}
          className={INPUT_CLASS}
        />
      </div>

      <label className="flex items-center gap-2 font-body text-sm text-alabaster">
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={defaultValues?.isFeatured}
          className="accent-ignition"
        />
        Marcar como destacado
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="border border-titanium/20 bg-ignition px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster disabled:opacity-40"
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
      <label className={LABEL_CLASS}>{label}</label>
      <input name={name} type={type} step={step} defaultValue={defaultValue} className={INPUT_CLASS} />
      {error && <p className="mt-1 font-body text-xs text-ignition">{error}</p>}
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
      <label className={LABEL_CLASS}>{label}</label>
      <select name={name} defaultValue={defaultValue} className={INPUT_CLASS}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 font-body text-xs text-ignition">{error}</p>}
    </div>
  );
}