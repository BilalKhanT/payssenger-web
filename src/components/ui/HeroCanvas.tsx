"use client";

import { useEffect, useRef } from "react";
import { createHeroNetwork } from "@/lib/heroNetwork";
import styles from "./HeroCanvas.module.css";

/** WebGL particle-network backdrop for the hero section. */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Gracefully skip the effect where WebGL is unavailable (older devices,
    // GPU-less/headless browsers) — the ink hero background stands in for it.
    try {
      const handle = createHeroNetwork(canvas, reduced);
      return () => handle.destroy();
    } catch (error) {
      console.warn("Hero network disabled — WebGL unavailable.", error);
      canvas.style.display = "none";
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
