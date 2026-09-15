import Link from "next/link";
import { logoutAction } from "@/features/auth/actions/logout.action";

/**
 * Dashboard mínimo, solo para validar el flujo de autenticación
 * de punta a punta. La tabla real de inventario es el Paso 9.
 */
export default function AdminDashboardPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Panel administrativo</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-neutral-500 underline">
            Cerrar sesión
          </button>
        </form>
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          href="/admin/vehiculos"
          className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Ver inventario
        </Link>
        <Link
          href="/admin/leads"
          className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
        >
          Ver leads
        </Link>
      </div>
    </main>
  );
}
