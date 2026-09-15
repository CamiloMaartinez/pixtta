import type { Lead, LeadType } from "@/types";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatDate } from "@/lib/utils/formatDate";
import { formatKm } from "@/lib/utils/formatKm";

interface LeadTableProps {
  leads: Lead[];
}

const TYPE_LABELS: Record<LeadType, string> = {
  contacto: "Contacto",
  credito: "Crédito",
  vender: "Vender",
};

const TYPE_STYLES: Record<LeadType, string> = {
  contacto: "bg-blue-100 text-blue-700",
  credito: "bg-green-100 text-green-700",
  vender: "bg-yellow-100 text-yellow-700",
};

/**
 * Resume el detalle relevante de un lead según su tipo, ya que cada
 * tipo guarda información distinta en `message`/`details`.
 */
function describeLead(lead: Lead): string {
  if (lead.type === "credito") {
    const details = lead.details as { cedula?: string; monthlyIncome?: number; downPayment?: number };
    return [
      details.cedula ? `CC ${details.cedula}` : null,
      details.monthlyIncome ? `Ingresos ${formatCurrency(details.monthlyIncome)}` : null,
      details.downPayment ? `Cuota inicial ${formatCurrency(details.downPayment)}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  }

  if (lead.type === "vender") {
    const details = lead.details as {
      brand?: string;
      model?: string;
      year?: number;
      mileageKm?: number;
      expectedPrice?: number;
      photos?: string[];
    };
    return [
      details.brand && details.model ? `${details.brand} ${details.model} ${details.year ?? ""}` : null,
      details.mileageKm !== undefined ? formatKm(details.mileageKm) : null,
      details.expectedPrice ? `Espera ${formatCurrency(details.expectedPrice)}` : null,
      details.photos?.length ? `${details.photos.length} foto(s)` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  }

  return lead.message || "—";
}

/**
 * Tabla de leads para el panel administrativo. Componente puro,
 * igual que VehicleTable: no consulta datos ni ejecuta acciones.
 */
export function LeadTable({ leads }: LeadTableProps): React.JSX.Element {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 p-12 text-center text-sm text-neutral-500">
        Todavía no hay leads registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200 text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Tipo</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Contacto</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Detalle</th>
            <th className="px-4 py-3 text-left font-medium text-neutral-500">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[lead.type]}`}
                >
                  {TYPE_LABELS[lead.type]}
                </span>
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-neutral-900">{lead.name}</p>
                <p className="text-xs text-neutral-500">
                  {lead.phone}
                  {lead.email ? ` · ${lead.email}` : ""}
                </p>
              </td>
              <td className="max-w-xs px-4 py-3 text-neutral-600">{describeLead(lead)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                {formatDate(lead.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
