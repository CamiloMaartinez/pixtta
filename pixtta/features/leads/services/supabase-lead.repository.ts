import type { SupabaseClient } from "@supabase/supabase-js";
import type { Lead, LeadChannel, LeadInput, LeadType, Result } from "@/types";
import type { LeadRepository } from "./lead.repository";

interface LeadRow {
  id: string;
  vehicle_id: string | null;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  details: Record<string, unknown> | null;
  channel: string;
  created_at: string;
}

function mapRowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    vehicleId: row.vehicle_id,
    type: row.type as LeadType,
    name: row.name,
    phone: row.phone,
    email: row.email,
    message: row.message,
    details: row.details ?? {},
    channel: row.channel as LeadChannel,
    createdAt: row.created_at,
  };
}

export class SupabaseLeadRepository implements LeadRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async createLead(data: LeadInput): Promise<Result<Lead>> {
    try {
      const { data: inserted, error } = await this.supabase
        .from("leads")
        .insert({
          vehicle_id: data.vehicleId ?? null,
          type: data.type,
          name: data.name,
          phone: data.phone,
          email: data.email ?? null,
          message: data.message ?? null,
          details: data.details ?? {},
        })
        .select()
        .single();

      if (error) return { success: false, error: error.message };

      return { success: true, data: mapRowToLead(inserted as LeadRow) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async getAllLeads(): Promise<Result<Lead[]>> {
    try {
      const { data, error } = await this.supabase
        .from("leads")
        .select()
        .order("created_at", { ascending: false });

      if (error) return { success: false, error: error.message };

      return { success: true, data: (data as LeadRow[]).map(mapRowToLead) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}
