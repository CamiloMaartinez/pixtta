import type { Metadata } from "next";
import { ContactForm } from "@/features/leads/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Pixtta",
  description: "Escríbenos y un asesor de Pixtta te contactará.",
};

export default function ContactoPage(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-3xl text-alabaster">Contáctanos</h1>
      <p className="mt-2 text-sm text-titanium">
        Cuéntanos qué buscas y te contactaremos a la brevedad.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}
