import type { FuelType, Transmission, VehicleStatus } from "@/types";

export const FUEL_OPTIONS: Array<{ value: FuelType; label: string }> = [
  { value: "gasolina", label: "Gasolina" },
  { value: "diesel", label: "Diésel" },
  { value: "electrico", label: "Eléctrico" },
  { value: "hibrido", label: "Híbrido" },
];

export const TRANSMISSION_OPTIONS: Array<{ value: Transmission; label: string }> = [
  { value: "automatica", label: "Automática" },
  { value: "manual", label: "Manual" },
];

export const STATUS_OPTIONS: Array<{ value: VehicleStatus; label: string }> = [
  { value: "activo", label: "Activo" },
  { value: "vendido", label: "Vendido" },
  { value: "borrador", label: "Borrador" },
  { value: "reservado", label: "Reservado" },
];
