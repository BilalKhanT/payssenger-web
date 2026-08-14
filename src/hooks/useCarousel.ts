"use client";

import { useCallback, useEffect, useState } from "react";

interface Options {
  /** Autoplay interval in ms; omit to disable autoplay. */
  interval?: number;
  /** Only autoplay while true (e.g. gated on the loader). */
  playing?: boolean;
}

/** Minimal wrap-around carousel index controller with optional autoplay. */
export function useCarousel(length: number, { interval, playing = true }: Options = {}) {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % length),
    [length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + length) % length),
    [length]
  );

  useEffect(() => {
    if (!interval || !playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [interval, playing, next, index]);

  return { index, setIndex, next, prev };
}
