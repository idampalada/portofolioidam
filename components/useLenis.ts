"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Global singleton
let globalLenis: Lenis | null = null;

export function setGlobalLenis(lenis: Lenis | null) {
  globalLenis = lenis;
}

export function getLenis(): Lenis | null {
  return globalLenis;
}

/**
 * Stop Lenis saat shouldStop = true (misal saat modal/chat terbuka)
 */
export function useLenisStop(shouldStop: boolean) {
  useEffect(() => {
    const lenis = globalLenis;
    if (!lenis) return;
    if (shouldStop) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [shouldStop]);
}
