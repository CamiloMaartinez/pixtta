import type { Lead, LeadInput, Result } from "@/types";

/**
 * Contrato de acceso a datos de leads. Ningún componente o Server Action
 * debe depender de Supabase directamente (ver `features/vehicles` para
 * el mismo patrón de inversión de dependencias).
 */
export interface LeadRepository {
  createLead(data: LeadInput): Promise<Result<Lead>>;
}
