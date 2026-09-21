import Image from "next/image";

interface LogoProps {
  className?: string;
  /** "wordmark": solo PIXTTA (barra de navegación). "full": con "AUTOS PREMIUM". "icon": la X con la puerta roja. */
  variant?: "wordmark" | "full" | "icon";
  /** Alto en píxeles; el ancho se calcula por la proporción del archivo. */
  height?: number;
  priority?: boolean;
}

// Dimensiones reales de los archivos generados por scripts/build-brand-assets.mjs
const VARIANTS = {
  wordmark: { src: "/brand/logo-wordmark.png", ratio: 716 / 112 },
  full: { src: "/brand/logo-pixtta.png", ratio: 716 / 164 },
  icon: { src: "/brand/logo-x.png", ratio: 114 / 104 },
} as const;

/**
 * Logo oficial de Pixtta (PNG con fondo transparente, extraído del perfil de
 * Instagram). El texto alternativo es "Pixtta" porque el logotipo ES el nombre.
 */
export function Logo({
  className = "",
  variant = "wordmark",
  height = 28,
  priority = false,
}: LogoProps): React.JSX.Element {
  const { src, ratio } = VARIANTS[variant];

  return (
    <Image
      src={src}
      alt="Pixtta"
      width={Math.round(height * ratio)}
      height={height}
      priority={priority}
      className={`w-auto shrink-0 ${className}`}
      style={{ height }}
    />
  );
}
