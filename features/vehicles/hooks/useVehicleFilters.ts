"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { VehicleFilters } from "@/types";

export function useVehicleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const numberParam = (key: string): number | undefined => {
    const raw = searchParams.get(key);
    return raw ? Number(raw) : undefined;
  };

  const filters: VehicleFilters = {
    category: (searchParams.get("category") as VehicleFilters["category"]) || undefined,
    search: searchParams.get("search") || undefined,
    sort: (searchParams.get("sort") as VehicleFilters["sort"]) || undefined,
    priceMin: numberParam("priceMin"),
    priceMax: numberParam("priceMax"),
    yearMin: numberParam("yearMin"),
    yearMax: numberParam("yearMax"),
    mileageMax: numberParam("mileageMax"),
    color: searchParams.get("color") || undefined,
    pageSize: numberParam("pageSize"),
  };

  function setFilter(key: keyof VehicleFilters, value: string | undefined): void {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters(): void {
    router.push(pathname);
  }

  return { filters, setFilter, clearFilters };
}