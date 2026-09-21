import type { Vehicle } from "@/types";

/**
 * Construye un link de wa.me con un mensaje prellenado.
 * Si se pasa un vehículo, el mensaje lo menciona específicamente.
 */
export function buildWhatsappLink(phone: string, vehicle?: Vehicle): string {
  const message = vehicle
    ? `Hola, estoy interesado en el ${vehicle.brand} ${vehicle.model} ${vehicle.year} publicado en Pixtta.`
    : "Hola, quiero más información sobre los vehículos de Pixtta.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Link de wa.me con un mensaje libre (para los llamados a la acción del sitio). */
export function buildWhatsappMessageLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
