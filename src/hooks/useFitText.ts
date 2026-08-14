"use client";

import { useEffect, useRef } from "react";

/**
 * Scales a single-line text element so it fills its container's content width
 * exactly — as large as possible without overflowing. Refits on resize and
 * once web fonts have loaded. The text element must be `inline-block` with
 * `white-space: nowrap` so its measured width tracks the text, not the box.
 */
export function useFitText<
  C extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLHeadingElement,
>() {
  const containerRef = useRef<C>(null);
  const textRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const style = getComputedStyle(container);
      const padX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const available = container.clientWidth - padX;
      if (available <= 0) return;

      const BASE = 100;
      text.style.fontSize = `${BASE}px`;
      const measured = text.offsetWidth;
      if (measured > 0) {
        text.style.fontSize = `${BASE * (available / measured)}px`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => window.removeEventListener("resize", fit);
  }, []);

  return { containerRef, textRef };
}
