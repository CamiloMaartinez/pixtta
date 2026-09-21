import { getBrandRepository } from "@/features/vehicles/services";
import { BrandMark } from "@/components/ui/BrandMark";

/**
 * Franja horizontal con las marcas reales (tabla `brands`), en scroll
 * animado. Server Component async: consulta la base de datos directo,
 * sin pasar por una página intermedia.
 */
export async function BrandsMarquee(): Promise<React.JSX.Element> {
  const repository = await getBrandRepository();
  const result = await repository.getAllBrands();
  const brands = result.success ? result.data : [];

  if (brands.length === 0) {
    return <></>;
  }

  const loop = [...brands, ...brands];

  return (
    <section className="pixtta-brands-mask overflow-hidden border-t border-titanium/10 bg-graphite py-8">
      <div className="pixtta-brands-track flex items-center gap-6">
        {loop.map((brand, index) => (
          <BrandMark key={`${brand.id}-${index}`} brand={brand} />
        ))}
      </div>

      <style>{`
        @keyframes pixtta-brands-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .pixtta-brands-track {
          width: max-content;
          animation: pixtta-brands-scroll 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pixtta-brands-track { animation: none; }
        }
      `}</style>
    </section>
  );
}