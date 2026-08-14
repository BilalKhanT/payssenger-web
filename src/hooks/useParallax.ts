"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Maps a container's scroll position (top-at-bottom = 0, bottom-at-top = 1)
 * onto a percentage transform applied to a target element each frame.
 */
export function useParallax<
  C extends HTMLElement = HTMLElement,
  T extends HTMLElement = HTMLElement,
>(from: number, to: number, axis: "x" | "y" = "y") {
  const container = useRef<C>(null);
  const target = useRef<T>(null);

  useEffect(() => {
    const c = container.current;
    const t = target.current;
    if (!c || !t) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = c.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const value = from + (to - from) * progress;
      t.style.transform =
        axis === "x" ? `translateX(${value}%)` : `translateY(${value}%)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [from, to, axis]);

  return { container, target };
}
