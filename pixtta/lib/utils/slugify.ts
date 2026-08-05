/**
 * Convierte partes de texto/número en un slug URL-safe.
 * Ej: slugify("Lamborghini", "Huracán STO", 2024) -> "lamborghini-huracan-sto-2024"
 */
export function slugify(...parts: Array<string | number>): string {
  return parts
    .join(" ")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}
