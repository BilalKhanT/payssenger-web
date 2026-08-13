"use client";

import { type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds before the element animates in. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
  /** Transition duration in seconds. */
  duration?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveals its children with an upward fade as they scroll into view.
 * Reproduces the reference design's `opacity 0 -> 1` + `translateY -> 0`
 * transition on the `cubic-bezier(.2,.7,.2,1)` curve.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.visible : ""} ${
        className ?? ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`,
        "--reveal-y": `${y}px`,
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
