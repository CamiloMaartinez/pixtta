interface HudFrameProps {
  children: React.ReactNode;
  accent?: "ignition" | "teal";
  className?: string;
}

const CORNER_BASE =
  "pointer-events-none absolute h-3 w-3 border-titanium/40 transition-colors duration-200";

/**
 * Elemento de firma de la marca (manual de identidad, sección 12):
 * cuatro marcas de esquina tipo retícula de visor óptico/HUD.
 * Se usa alrededor de tarjetas de vehículo y bloques de precio —
 * el único elemento decorativo permitido en toda la interfaz.
 */
export function HudFrame({
  children,
  accent = "ignition",
  className = "",
}: HudFrameProps): React.JSX.Element {
  const cornerAccent = accent === "teal" ? "group-hover:border-teal" : "group-hover:border-ignition";

  return (
    <div className={`group relative ${className}`}>
      <span className={`${CORNER_BASE} -left-px -top-px border-l border-t ${cornerAccent}`} />
      <span className={`${CORNER_BASE} -right-px -top-px border-r border-t ${cornerAccent}`} />
      <span className={`${CORNER_BASE} -left-px -bottom-px border-l border-b ${cornerAccent}`} />
      <span className={`${CORNER_BASE} -right-px -bottom-px border-r border-b ${cornerAccent}`} />
      {children}
    </div>
  );
}
