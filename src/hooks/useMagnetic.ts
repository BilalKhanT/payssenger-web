"use client";

import { useEffect, useRef } from "react";

/**
 * Adds a magnetic pull to an element: it drifts toward the pointer while
 * hovered and springs back on leave. Mirrors the reference design's
 * `translate(x * 0.25, y * 0.4)` behaviour.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    };

    const handleLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return ref;
}
