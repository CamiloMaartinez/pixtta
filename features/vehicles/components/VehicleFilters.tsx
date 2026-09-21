"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Category } from "@/types";
import { useVehicleFilters } from "../hooks/useVehicleFilters";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface VehicleFiltersProps {
  categories: Category[];
  colors: string[];
}

const SELECT_CLASS =
  "border border-titanium/20 bg-graphite px-3 py-2.5 text-sm text-alabaster outline-none focus:border-ignition sm:py-2";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

/** Etiqueta + control; el <label> envuelve el campo para que quede asociado (toque y lector de pantalla). */
function Field({ label, children, className = "" }: FieldProps): React.JSX.Element {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
        {label}
      </span>
      {children}
    </label>
  );
}

/**
 * Filtros del catálogo.
 * Móvil (< 640px): categorías en una fila deslizable, buscador a ancho completo y los filtros
 * avanzados plegados detrás del botón "Filtros" (con contador de los activos).
 * Escritorio (≥ 640px): todo visible, igual que antes.
 */
export function VehicleFilters({ categories, colors }: VehicleFiltersProps): React.JSX.Element {
  const { filters, setFilter, clearFilters } = useVehicleFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  useEffect(() => {
    setFilter("search", debouncedSearch || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const chipClass = (active: boolean, accent: "ignition" | "teal" = "ignition") => {
    if (!active) {
      return "border-titanium/30 text-titanium hover:border-titanium";
    }
    return accent === "teal"
      ? "border-teal bg-teal text-alabaster"
      : "border-ignition bg-ignition text-alabaster";
  };

  const CHIP_BASE =
    "shrink-0 whitespace-nowrap border px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:py-1.5";

  const advancedCount = [
    filters.priceMin,
    filters.priceMax,
    filters.yearMin,
    filters.yearMax,
    filters.mileageMax,
    filters.color,
  ].filter((value) => value !== undefined && value !== "").length;

  const hasActiveFilters =
    filters.category ||
    filters.search ||
    filters.sort ||
    advancedCount > 0;

  return (
    <div className="mb-6 flex flex-col gap-4 font-body">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {/* Categorías: en móvil se deslizan en una sola fila hasta el borde de la pantalla. */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilter("category", undefined)}
            className={`${CHIP_BASE} ${chipClass(!filters.category)}`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter("category", category.slug)}
              className={`${CHIP_BASE} ${chipClass(
                filters.category === category.slug,
                category.slug === "electrico" ? "teal" : "ignition"
              )}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Buscar marca o modelo"
            aria-label="Buscar marca o modelo"
            className="w-full border border-titanium/20 bg-graphite px-3 py-2.5 text-sm text-alabaster placeholder-titanium outline-none focus:border-ignition sm:w-56 sm:py-2 lg:w-64"
          />
          <div className="flex gap-2">
            <select
              value={filters.sort ?? ""}
              onChange={(event) => setFilter("sort", event.target.value || undefined)}
              aria-label="Ordenar por"
              className={`${SELECT_CLASS} min-w-0 flex-1 sm:flex-none`}
            >
              <option value="">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="año-desc">Año: más reciente</option>
            </select>
            <button
              type="button"
              onClick={() => setAdvancedOpen((prev) => !prev)}
              aria-expanded={advancedOpen}
              aria-controls="catalog-advanced-filters"
              className={`press flex shrink-0 items-center gap-2 border px-3 py-2.5 text-xs font-medium uppercase tracking-wide sm:hidden ${
                advancedOpen || advancedCount > 0
                  ? "border-ignition text-alabaster"
                  : "border-titanium/30 text-titanium"
              }`}
            >
              <SlidersHorizontal size={15} aria-hidden />
              Filtros
              {advancedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center bg-ignition px-1 font-mono text-[11px] text-alabaster">
                  {advancedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filtros avanzados: plegados en móvil (grilla de 2 columnas al abrir), siempre visibles desde sm. */}
      <div
        id="catalog-advanced-filters"
        className={`${
          advancedOpen ? "grid" : "hidden"
        } grid-cols-2 gap-3 border-t border-titanium/10 pt-4 sm:flex sm:flex-wrap sm:items-end`}
      >
        <Field label="Precio mín.">
          <input
            type="number"
            inputMode="numeric"
            value={filters.priceMin ?? ""}
            onChange={(event) => setFilter("priceMin", event.target.value || undefined)}
            placeholder="$ 0"
            className={`${SELECT_CLASS} w-full sm:w-32`}
          />
        </Field>
        <Field label="Precio máx.">
          <input
            type="number"
            inputMode="numeric"
            value={filters.priceMax ?? ""}
            onChange={(event) => setFilter("priceMax", event.target.value || undefined)}
            placeholder="Sin límite"
            className={`${SELECT_CLASS} w-full sm:w-32`}
          />
        </Field>
        <Field label="Año desde">
          <input
            type="number"
            inputMode="numeric"
            value={filters.yearMin ?? ""}
            onChange={(event) => setFilter("yearMin", event.target.value || undefined)}
            placeholder="2015"
            className={`${SELECT_CLASS} w-full sm:w-24`}
          />
        </Field>
        <Field label="Año hasta">
          <input
            type="number"
            inputMode="numeric"
            value={filters.yearMax ?? ""}
            onChange={(event) => setFilter("yearMax", event.target.value || undefined)}
            placeholder="2026"
            className={`${SELECT_CLASS} w-full sm:w-24`}
          />
        </Field>
        <Field label="Km máximo">
          <input
            type="number"
            inputMode="numeric"
            value={filters.mileageMax ?? ""}
            onChange={(event) => setFilter("mileageMax", event.target.value || undefined)}
            placeholder="Sin límite"
            className={`${SELECT_CLASS} w-full sm:w-32`}
          />
        </Field>
        <Field label="Color">
          <select
            value={filters.color ?? ""}
            onChange={(event) => setFilter("color", event.target.value || undefined)}
            className={`${SELECT_CLASS} w-full`}
          >
            <option value="">Todos</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Mostrar" className="col-span-2 sm:col-span-1">
          <select
            value={filters.pageSize ?? 12}
            onChange={(event) => setFilter("pageSize", event.target.value)}
            className={`${SELECT_CLASS} w-full`}
          >
            <option value={12}>12 por página</option>
            <option value={24}>24 por página</option>
            <option value={48}>48 por página</option>
          </select>
        </Field>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="col-span-2 border border-ignition/40 px-3 py-2.5 font-body text-xs font-medium uppercase tracking-wide text-ignition hover:underline sm:border-0 sm:px-0 sm:py-0"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Móvil: con el panel cerrado, "Limpiar filtros" sigue a la mano si hay algo activo. */}
      {hasActiveFilters && !advancedOpen && (
        <button
          type="button"
          onClick={clearFilters}
          className="self-start font-body text-xs font-medium uppercase tracking-wide text-ignition hover:underline sm:hidden"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
