"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { VehicleFilters } from "@/types";

/**
 * Sincroniza los filtros del catálogo con los searchParams de la URL,
 * en lugar de guardarlos en estado oculto. Así los resultados filtrados
 * son compartibles por link y la página sigue siendo Server-rendered.
 */
export function useVehicleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: VehicleFilters = {
    category: (searchParams.get("category") as VehicleFilters["category"]) || undefined,
    search: searchParams.get("search") || undefined,
    sort: (searchParams.get("sort") as VehicleFilters["sort"]) || undefined,
  };

  function setFilter(key: keyof VehicleFilters, value: string | undefined): void {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(String(key), value);
    } else {
      params.delete(String(key));
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return { filters, setFilter };
}
