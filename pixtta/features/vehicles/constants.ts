import type { VehicleCategory } from "@/types";

export const CATEGORY_OPTIONS: Array<{ value: VehicleCategory; label: string }> = [
  { value: "sedan", label: "Sedán" },
  { value: "suv", label: "SUV" },
  { value: "deportivo", label: "Deportivo" },
  { value: "electrico", label: "Eléctrico" },
  { value: "moto", label: "Moto" },
  { value: "pickup", label: "Pickup" },
];
