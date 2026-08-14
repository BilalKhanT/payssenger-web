"use client";

import { useEffect } from "react";

const FONT_BASE = 16;
const BASE_W = 1920;
const COEF = 0.6666;

/**
 * Scales the root font-size UP on viewports wider than the 1920 design width,
 * so the rem-based layout stays proportional. Below 1920 the CSS media queries
 * take over (this clears the inline size).
 */
export function AdaptiveRoot() {
  useEffect(() => {
    const html = document.documentElement;

    const apply = () => {
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) html.style.fontSize = `${size}px`;
      else html.style.removeProperty("font-size");
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return null;
}
