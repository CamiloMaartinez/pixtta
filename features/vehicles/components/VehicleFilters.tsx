"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/types";
import { useVehicleFilters } from "../hooks/useVehicleFilters";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface VehicleFiltersProps {
  categories: Category[];
  colors: string[];
}

const SELECT_CLASS =
  "border border-titanium/20 bg-graphite px-3 py-2 text-sm text-alabaster outline-none focus:border-ignition";

export function VehicleFilters({ categories, colors }: VehicleFiltersProps): React.JSX.Element {
  const { filters, setFilter, clearFilters } = useVehicleFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
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

  const hasActiveFilters =
    filters.category ||
    filters.search ||
    filters.sort ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.yearMin !== undefined ||
    filters.yearMax !== undefined ||
    filters.mileageMax !== undefined ||
    filters.color;

  return (
    <div className="mb-6 flex flex-col gap-4 font-body">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("category", undefined)}
            className={`border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${chipClass(!filters.category)}`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter("category", category.slug)}
              className={`border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${chipClass(
                filters.category === category.slug,
                category.slug === "electrico" ? "teal" : "ignition"
              )}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Buscar marca o modelo"
            className="border border-titanium/20 bg-graphite px-3 py-2 text-sm text-alabaster placeholder-titanium outline-none focus:border-ignition"
          />
          <select
            value={filters.sort ?? ""}
            onChange={(event) => setFilter("sort", event.target.value || undefined)}
            className={SELECT_CLASS}
          >
            <option value="">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="año-desc">Año: más reciente</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3 border-t border-titanium/10 pt-4">
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Precio mín.
          </label>
          <input
            type="number"
            value={filters.priceMin ?? ""}
            onChange={(event) => setFilter("priceMin", event.target.value || undefined)}
            placeholder="$ 0"
            className={`${SELECT_CLASS} w-32`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Precio máx.
          </label>
          <input
            type="number"
            value={filters.priceMax ?? ""}
            onChange={(event) => setFilter("priceMax", event.target.value || undefined)}
            placeholder="Sin límite"
            className={`${SELECT_CLASS} w-32`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Año desde
          </label>
          <input
            type="number"
            value={filters.yearMin ?? ""}
            onChange={(event) => setFilter("yearMin", event.target.value || undefined)}
            placeholder="2015"
            className={`${SELECT_CLASS} w-24`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Año hasta
          </label>
          <input
            type="number"
            value={filters.yearMax ?? ""}
            onChange={(event) => setFilter("yearMax", event.target.value || undefined)}
            placeholder="2026"
            className={`${SELECT_CLASS} w-24`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Km máximo
          </label>
          <input
            type="number"
            value={filters.mileageMax ?? ""}
            onChange={(event) => setFilter("mileageMax", event.target.value || undefined)}
            placeholder="Sin límite"
            className={`${SELECT_CLASS} w-32`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Color
          </label>
          <select
            value={filters.color ?? ""}
            onChange={(event) => setFilter("color", event.target.value || undefined)}
            className={SELECT_CLASS}
          >
            <option value="">Todos</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-body text-[11px] font-medium uppercase tracking-wide text-titanium">
            Mostrar
          </label>
          <select
            value={filters.pageSize ?? 12}
            onChange={(event) => setFilter("pageSize", event.target.value)}
            className={SELECT_CLASS}
          >
            <option value={12}>12 por página</option>
            <option value={24}>24 por página</option>
            <option value={48}>48 por página</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-body text-xs font-medium uppercase tracking-wide text-ignition hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}