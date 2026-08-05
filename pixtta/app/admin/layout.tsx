export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El sidebar y la navegación del panel se agregan en el módulo del
  // dashboard de inventario (Paso 9), para no mezclar auth con UI.
  return <div className="min-h-screen bg-neutral-50">{children}</div>;
}
