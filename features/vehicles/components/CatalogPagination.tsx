import Link from "next/link";

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

/**
 * Navegación entre páginas del catálogo. No se renderiza si solo hay
 * una página de resultados.
 */
export function CatalogPagination({
  page,
  totalPages,
  buildHref,
}: CatalogPaginationProps): React.JSX.Element | null {
  if (totalPages <= 1) {
    return null;
  }

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={isFirst}
        className={`border border-titanium/20 px-4 py-2 font-body text-xs font-medium uppercase tracking-wide ${
          isFirst ? "pointer-events-none text-titanium/30" : "text-alabaster hover:border-ignition"
        }`}
      >
        Anterior
      </Link>
      <span className="font-mono text-xs text-titanium">
        Página {page} de {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={isLast}
        className={`border border-titanium/20 px-4 py-2 font-body text-xs font-medium uppercase tracking-wide ${
          isLast ? "pointer-events-none text-titanium/30" : "text-alabaster hover:border-ignition"
        }`}
      >
        Siguiente
      </Link>
    </div>
  );
}