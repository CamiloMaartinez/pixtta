"use client";

import { useEffect, useState } from "react";

/**
 * Retrasa la propagación de un valor hasta que dejan de llegar cambios
 * durante `delay` ms. Útil para inputs de búsqueda.
 */
export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
