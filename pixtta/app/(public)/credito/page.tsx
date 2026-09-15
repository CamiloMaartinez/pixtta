import type { Metadata } from "next";
import { CreditForm } from "@/features/leads/components/CreditForm";

export const metadata: Metadata = {
  title: "Solicita tu crédito | Pixtta",
  description: "Solicita tu crédito para adquirir tu próximo vehículo con Pixtta.",
};

export default function CreditoPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl text-alabaster">Solicita tu crédito</h1>
      <p className="mt-2 text-sm text-titanium">
        Completa tus datos y un asesor te ayudará a estructurar tu crédito.
      </p>
      <div className="mt-8">
        <CreditForm />
      </div>
    </main>
  );
}
