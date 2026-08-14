"use client";

import { useEffect, useState } from "react";
import { useChrome } from "@/components/providers/ChromeProvider";
import { BrandMark } from "@/components/ui/BrandMark";
import styles from "./Loader.module.css";

const MIN_VISIBLE_MS = 1400;
const MAX_VISIBLE_MS = 2600;
const EXIT_MS = 850;

/**
 * Navy intro curtain with a wordmark and a filling progress bar. Holds for a
 * minimum beat, then flips the shared `ready` flag (releasing the hero
 * reveals + scroll lock) and slides up out of view.
 */
export function Loader() {
  const { setReady } = useChrome();
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const minVisible = reduced ? 200 : MIN_VISIBLE_MS;
    window.scrollTo(0, 0);

    let finishTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      setReady(true);
      setExiting(true);
      removeTimer = setTimeout(() => setGone(true), reduced ? 0 : EXIT_MS);
    };

    const startCountdown = () => {
      finishTimer = setTimeout(finish, minVisible);
    };

    if (document.readyState === "complete") {
      startCountdown();
    } else {
      window.addEventListener("load", startCountdown, { once: true });
    }
    // Fallback so we never wait forever on a stalled `load`.
    const maxTimer = setTimeout(finish, MAX_VISIBLE_MS);

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(removeTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", startCountdown);
    };
  }, [setReady]);

  if (gone) return null;

  return (
    <div
      className={`${styles.curtain} ${exiting ? styles.exit : ""}`}
      aria-hidden="true"
      style={{ ["--exit-ms" as string]: `${EXIT_MS}ms` }}
    >
      <div className={styles.mark}>
        <BrandMark className={styles.markIcon} />
        <span className={styles.wordmark}>Payssenger</span>
      </div>
      <div className={styles.track}>
        <span className={styles.fill} />
      </div>
    </div>
  );
}
