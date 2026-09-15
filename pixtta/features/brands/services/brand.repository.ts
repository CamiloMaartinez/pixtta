import type { Brand, Result } from "@/types";

/**
 * Contrato de acceso a datos de marcas. Solo lectura por ahora: la
 * gestión (CRUD) desde /admin/marcas-categorias es trabajo pendiente
 * aparte; esto cubre únicamente lo que necesita el home público.
 */
export interface BrandRepository {
  getBrands(): Promise<Result<Brand[]>>;
}
