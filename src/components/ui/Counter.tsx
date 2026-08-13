"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  /** Final value to count up to. */
  value: number;
  /** Decimal places to display. */
  decimals?: number;
  /** Text appended after the number (e.g. "M", "%"). */
  suffix?: string;
  /** Animation duration in milliseconds. */
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts from 0 to `value` with an ease-out curve when scrolled into view. */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  duration = 1500,
  className,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.6 });
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutCubic(progress));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <div ref={ref} className={className}>
      {formatted}
      {suffix}
    </div>
  );
}
