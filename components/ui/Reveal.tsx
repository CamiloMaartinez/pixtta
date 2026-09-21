"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Retraso en ms — úsalo para escalonar varios `Reveal` hermanos (30-80ms entre uno y otro). */
  delay?: number;
}

/**
 * Envoltorio de "reveal" al hacer scroll (habilidad animate: entrada por
 * fade-up + blur sutil, transform/opacity, IntersectionObserver en vez de
 * scroll listener). Se desconecta tras la primera revelación y cae a
 * visible-de-inmediato si el sistema pide movimiento reducido.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}
