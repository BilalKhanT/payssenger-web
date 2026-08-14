"use client";

import { useInView } from "@/hooks/useInView";
import { EASE } from "@/lib/easings";
import styles from "./reveal.module.css";

interface WordsProps {
  text: string;
  /** "clip" = slide up from behind a mask; "fade" = fade + rise. */
  mode?: "clip" | "fade";
  /** Per-word stagger in ms. */
  stagger?: number;
  /** Base delay before the first word, in ms. */
  baseDelay?: number;
  /** Per-word duration in ms. */
  duration?: number;
  /** Rise distance for "fade" mode, in px. */
  fadeY?: number;
  ease?: string;
  /** Override the in-view trigger (e.g. gate on the loader). */
  play?: boolean;
  className?: string;
}

/**
 * Reveals a string word-by-word. Triggers on scroll-into-view by default, or
 * on an explicit `play` flag when the caller controls timing (hero / loader).
 */
export function Words({
  text,
  mode = "clip",
  stagger = 120,
  baseDelay = 0,
  duration = 950,
  fadeY = 18,
  ease = EASE.outExpo,
  play,
  className,
}: WordsProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const active = play !== undefined ? play : inView;
  const words = text.split(" ");

  return (
    <span
      ref={ref}
      className={`${active ? styles.play : ""} ${className ?? ""}`}
      style={
        {
          "--reveal-ease": ease,
          "--fade-y": `${fadeY}px`,
        } as React.CSSProperties
      }
    >
      {words.map((word, i) => {
        const delay = `${baseDelay + i * stagger}ms`;
        const vars = {
          "--reveal-delay": delay,
          "--reveal-duration": `${duration}ms`,
        } as React.CSSProperties;

        if (mode === "fade") {
          return (
            <span key={i} style={vars}>
              <span className={styles.fadeWord} style={vars}>
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        }

        return (
          <span
            key={i}
            className={`${styles.clip} ${styles.clipWord}`}
            style={vars}
          >
            <span className={styles.inner} style={vars}>
              {word}
            </span>
            {i < words.length - 1 ? <span>&nbsp;</span> : ""}
          </span>
        );
      })}
    </span>
  );
}
