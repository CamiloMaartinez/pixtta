import { MessageCircle, Music2, ShoppingBag } from "lucide-react";
import type { SocialPlatform } from "@/types";

interface SocialIconProps {
  platform: SocialPlatform;
  size?: number;
  className?: string;
}

/**
 * lucide-react ya no incluye iconos de marca, así que Facebook e
 * Instagram se dibujan aquí con el mismo trazo (stroke 2, 24×24).
 */
export function SocialIcon({ platform, size = 18, className }: SocialIconProps): React.JSX.Element {
  switch (platform) {
    case "whatsapp":
      return <MessageCircle size={size} className={className} aria-hidden />;
    case "tiktok":
      return <Music2 size={size} className={className} aria-hidden />;
    case "mercadolibre":
      return <ShoppingBag size={size} className={className} aria-hidden />;
    case "facebook":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
  }
}
