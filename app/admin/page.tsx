import Link from "next/link";
import { logoutAction } from "@/features/auth/actions/logout.action";

export default function AdminDashboardPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold uppercase text-alabaster">
          Panel administrativo
        </h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/vehiculos"
          className="inline-flex border border-titanium/20 bg-ignition px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-alabaster"
        >
          Ver inventario
        </Link>
        <Link
          href="/admin/marcas-categorias"
          className="inline-flex border border-titanium/20 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition"
        >
          Marcas y categorías
        </Link>
        <Link
          href="/admin/concesionario"
          className="inline-flex border border-titanium/20 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-alabaster transition-colors duration-150 ease-out hover:border-ignition"
        >
          Concesionario y redes
        </Link>
      </div>
    </main>
  );
}
