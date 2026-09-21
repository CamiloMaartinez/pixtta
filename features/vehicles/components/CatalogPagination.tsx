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
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
      <span className="order-first w-full text-center font-mono text-xs text-titanium sm:order-none sm:w-auto">
        Página {page} de {totalPages}
      </span>
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={isFirst}
        className={`flex-1 border border-titanium/20 px-4 py-3 text-center font-body text-xs font-medium uppercase tracking-wide sm:order-first sm:flex-none sm:py-2 ${
          isFirst ? "pointer-events-none text-titanium/30" : "text-alabaster hover:border-ignition"
        }`}
      >
        Anterior
      </Link>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={isLast}
        className={`flex-1 border border-titanium/20 px-4 py-3 text-center font-body text-xs font-medium uppercase tracking-wide sm:flex-none sm:py-2 ${
          isLast ? "pointer-events-none text-titanium/30" : "text-alabaster hover:border-ignition"
        }`}
      >
        Siguiente
      </Link>
    </div>
  );
}