"use client";

import { useInView } from "@/hooks/useInView";
import { EASE } from "@/lib/easings";
import styles from "./reveal.module.css";

interface StackedLinesProps {
  lines: string[];
  stagger?: number;
  baseDelay?: number;
  duration?: number;
  play?: boolean;
  className?: string;
}

/** Reveals stacked lines with a clip-mask slide-up, one after another. */
export function StackedLines({
  lines,
  stagger = 120,
  baseDelay = 0,
  duration = 950,
  play,
  className,
}: StackedLinesProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const active = play !== undefined ? play : inView;

  return (
    <span
      ref={ref}
      className={`${active ? styles.play : ""} ${className ?? ""}`}
      style={{ ["--reveal-ease"]: EASE.outExpo } as React.CSSProperties}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={`${styles.clip} ${styles.line}`}
          style={
            {
              "--reveal-delay": `${baseDelay + i * stagger}ms`,
              "--reveal-duration": `${duration}ms`,
            } as React.CSSProperties
          }
        >
          <span
            className={styles.inner}
            style={
              {
                "--reveal-delay": `${baseDelay + i * stagger}ms`,
                "--reveal-duration": `${duration}ms`,
              } as React.CSSProperties
            }
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
