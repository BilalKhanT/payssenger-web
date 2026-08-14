"use client";

import { type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { EASE } from "@/lib/easings";

interface InviewProps {
  children: ReactNode;
  /** Starting offset (px) and scale for the hidden state. */
  y?: number;
  scale?: number;
  /** Delay before the reveal, in ms. */
  delayIn?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

/** Springs an element from a hidden offset/scale to rest the first time it
 *  scrolls into view. */
export function Inview({
  children,
  y = 28,
  scale = 1,
  delayIn = 0,
  duration = 900,
  as: Tag = "div",
  className,
  style,
}: InviewProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : `translateY(${y}px) scale(${scale})`,
        transition: `opacity ${duration}ms ${EASE.spring} ${delayIn}ms, transform ${duration}ms ${EASE.spring} ${delayIn}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
