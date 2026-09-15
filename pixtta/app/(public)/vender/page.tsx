import type { Metadata } from "next";
import { SellVehicleForm } from "@/features/leads/components/SellVehicleForm";

export const metadata: Metadata = {
  title: "Vende tu vehículo | Pixtta",
  description: "Cuéntanos sobre tu vehículo y recibe una oferta de Pixtta.",
};

export default function VenderPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl text-alabaster">Vende tu vehículo</h1>
      <p className="mt-2 text-sm text-titanium">
        Cuéntanos sobre tu vehículo y un asesor te contactará con una oferta.
      </p>
      <div className="mt-8">
        <SellVehicleForm />
      </div>
    </main>
  );
}
