import Link from "next/link";
import { getBrandRepository, getCategoryRepository } from "@/features/vehicles/services";
import { createBrandAction } from "@/features/admin-catalog/actions/create-brand.action";
import { deleteBrandAction } from "@/features/admin-catalog/actions/delete-brand.action";
import { createCategoryAction } from "@/features/admin-catalog/actions/create-category.action";
import { deleteCategoryAction } from "@/features/admin-catalog/actions/delete-category.action";
import { DeleteEntryButton } from "@/features/admin-catalog/components/DeleteEntryButton";

const INPUT_CLASS =
  "flex-1 border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition";

export default async function MarcasCategoriasPage(): Promise<React.JSX.Element> {
  const brandRepository = await getBrandRepository();
  const categoryRepository = await getCategoryRepository();

  const [brandsResult, categoriesResult] = await Promise.all([
    brandRepository.getAllBrands(),
    categoryRepository.getAllCategories(),
  ]);

  const brands = brandsResult.success ? brandsResult.data : [];
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/admin"
        className="font-body text-xs font-medium uppercase tracking-wide text-titanium hover:text-alabaster hover:underline"
      >
        ← Panel administrativo
      </Link>
      <h1 className="mt-1 mb-2 font-display text-2xl font-extrabold uppercase text-alabaster">
        Marcas y categorías
      </h1>
      <p className="mb-8 font-body text-xs text-titanium">
        Eliminar una marca o categoría solo la quita de la lista para vehículos nuevos — no afecta
        a los vehículos que ya la tengan asignada.
      </p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-alabaster">Marcas</h2>
          <form action={createBrandAction} className="mb-4 flex gap-2">
            <input name="name" placeholder="Nueva marca" required className={INPUT_CLASS} />
            <button
              type="submit"
              className="border border-titanium/20 bg-ignition px-4 py-2 font-body text-sm font-semibold uppercase text-alabaster"
            >
              Agregar
            </button>
          </form>
          <ul className="divide-y divide-titanium/10 border border-titanium/15">
            {brands.map((brand) => (
              <li key={brand.id} className="flex items-center justify-between px-4 py-2.5">
                <span className="font-body text-sm text-alabaster">{brand.name}</span>
                <DeleteEntryButton action={deleteBrandAction} id={brand.id} label={brand.name} />
              </li>
            ))}
            {brands.length === 0 && (
              <li className="px-4 py-6 text-center font-body text-sm text-titanium">
                Sin marcas todavía.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-alabaster">Categorías</h2>
          <form action={createCategoryAction} className="mb-4 flex gap-2">
            <input name="name" placeholder="Nueva categoría" required className={INPUT_CLASS} />
            <button
              type="submit"
              className="border border-titanium/20 bg-ignition px-4 py-2 font-body text-sm font-semibold uppercase text-alabaster"
            >
              Agregar
            </button>
          </form>
          <ul className="divide-y divide-titanium/10 border border-titanium/15">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between px-4 py-2.5">
                <span className="font-body text-sm text-alabaster">{category.name}</span>
                <DeleteEntryButton action={deleteCategoryAction} id={category.id} label={category.name} />
              </li>
            ))}
            {categories.length === 0 && (
              <li className="px-4 py-6 text-center font-body text-sm text-titanium">
                Sin categorías todavía.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}