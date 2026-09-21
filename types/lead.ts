/**
 * Leads generados desde los formularios públicos (contacto, crédito,
 * vender vehículo). `details` es JSON flexible: cada tipo de
 * formulario guarda ahí los campos que le son propios, sin necesitar
 * una columna nueva por cada uno.
 */

export type LeadType = "contacto" | "credito" | "vender";
export type LeadChannel = "form" | "whatsapp";

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  vehicleId: string | null;
  channel: LeadChannel;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface LeadInput {
  type: LeadType;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  vehicleId?: string | null;
  details?: Record<string, unknown> | null;
}