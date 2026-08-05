"use client";

import { useEffect, useState } from "react";
import { useVehicleFilters } from "../hooks/useVehicleFilters";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { CATEGORY_OPTIONS } from "../constants";

/**
 * Controles de filtrado del catálogo: categoría, búsqueda y orden.
 * Escribe los cambios en la URL a través de useVehicleFilters;
 * no mantiene el resultado filtrado, eso lo hace la página (Server Component).
 */
export function VehicleFilters(): React.JSX.Element {
  const { filters, setFilter } = useVehicleFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  useEffect(() => {
    setFilter("search", debouncedSearch || undefined);
    // Solo debe dispararse cuando cambia el valor debounced, no en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("category", undefined)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
            !filters.category
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-600"
          }`}
        >
          Todos
        </button>
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter("category", option.value)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              filters.category === option.value
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Buscar marca o modelo"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        <select
          value={filters.sort ?? ""}
          onChange={(event) => setFilter("sort", event.target.value || undefined)}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        >
          <option value="">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="año-desc">Año: más reciente</option>
        </select>
      </div>
    </div>
  );
}
