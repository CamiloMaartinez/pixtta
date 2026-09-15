/**
 * Tipos de dominio relacionados con los leads generados desde el sitio
 * público (/contacto, /credito, /vender comparten la misma tabla).
 */

export type LeadType = "contacto" | "credito" | "vender";

export type LeadChannel = "form" | "whatsapp";

export interface Lead {
  id: string;
  vehicleId: string | null;
  type: LeadType;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  details: Record<string, unknown>;
  channel: LeadChannel;
  createdAt: string;
}

export interface LeadInput {
  vehicleId?: string | null;
  type: LeadType;
  name: string;
  phone: string;
  email?: string | null;
  message?: string;
  details?: Record<string, unknown>;
}

/** Forma de `details` para un lead de tipo "credito". */
export interface CreditApplicationDetails {
  cedula: string;
  monthlyIncome: number;
  downPayment: number;
}

/** Forma de `details` para un lead de tipo "vender". */
export interface SellVehicleDetails {
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  expectedPrice: number;
  photos: string[];
}
