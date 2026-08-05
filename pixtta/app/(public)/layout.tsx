export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El Navbar y el Footer del sitio público se conectarán aquí
  // en el módulo de diseño/marca, para no mezclar estructura con estilos.
  return <>{children}</>;
}
