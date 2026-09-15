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
  message: string | null;
  channel: LeadChannel;
  createdAt: string;
}

export interface LeadInput {
  vehicleId?: string | null;
  type: LeadType;
  name: string;
  phone: string;
  message?: string;
}
