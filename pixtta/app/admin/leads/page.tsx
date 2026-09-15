import Link from "next/link";
import { getLeadRepository } from "@/features/leads/services";
import { LeadTable } from "@/features/admin-leads/components/LeadTable";

export default async function AdminLeadsPage(): Promise<React.JSX.Element> {
  const repository = await getLeadRepository();
  const result = await repository.getAllLeads();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-neutral-500 underline">
          ← Panel administrativo
        </Link>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">Leads</h1>
      </div>

      {!result.success ? (
        <p className="text-sm text-red-600">No se pudieron cargar los leads: {result.error}</p>
      ) : (
        <LeadTable leads={result.data} />
      )}
    </main>
  );
}
