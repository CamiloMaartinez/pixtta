import type { SupabaseClient } from "@supabase/supabase-js";
import type { Lead, LeadInput, Result } from "@/types";

interface LeadRow {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  vehicle_id: string | null;
  channel: string;
  details: Record<string, unknown> | null;
  created_at: string;
}

function mapRowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    type: row.type as Lead["type"],
    name: row.name,
    phone: row.phone,
    email: row.email,
    message: row.message,
    vehicleId: row.vehicle_id,
    channel: row.channel as Lead["channel"],
    details: row.details,
    createdAt: row.created_at,
  };
}

export interface LeadRepository {
  createLead(data: LeadInput): Promise<Result<Lead>>;
  getAllLeads(): Promise<Result<Lead[]>>;
}

export class SupabaseLeadRepository implements LeadRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async createLead(data: LeadInput): Promise<Result<Lead>> {
    try {
      const { data: inserted, error } = await this.supabase
        .from("leads")
        .insert({
          type: data.type,
          name: data.name,
          phone: data.phone,
          email: data.email ?? null,
          message: data.message ?? null,
          vehicle_id: data.vehicleId ?? null,
          details: data.details ?? null,
          channel: "form",
        })
        .select("*")
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
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return { success: false, error: error.message };
      return { success: true, data: (data as LeadRow[]).map(mapRowToLead) };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}