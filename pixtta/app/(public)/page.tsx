import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixtta | Concesionario de vehículos exclusivos",
  description:
    "Explora el catálogo de Pixtta: vehículos deportivos, SUV, sedanes, eléctricos y motos, verificados e inspeccionados.",
};

export default function HomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p className="text-sm text-neutral-500">
        Pixtta — proyecto inicializado correctamente. El catálogo y el panel
        administrativo se construirán en los siguientes módulos.
      </p>
    </main>
  );
}
