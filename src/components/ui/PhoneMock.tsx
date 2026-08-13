"use client";

import { useEffect, useState } from "react";
import styles from "./PhoneMock.module.css";

type SendState = 0 | 1 | 2;

/** Timeline of [state, dwell-ms] pairs the phone loops through. */
const SEQUENCE: [SendState, number][] = [
  [0, 2600],
  [1, 2200],
  [2, 3400],
];

const STATUS_LABEL: Record<SendState, string> = {
  0: "Ready to send",
  1: "Sending over SMS",
  2: "Sent · verified by bank",
};

const BUTTON_LABEL: Record<SendState, string> = {
  0: "Approve & send",
  1: "Sending…",
  2: "Sent",
};

/** Floating phone that cycles through the offline "send money" flow. */
export function PhoneMock() {
  const [step, setStep] = useState(0);
  const sendState = SEQUENCE[step][0];

  useEffect(() => {
    const dwell = SEQUENCE[step][1];
    const timer = setTimeout(
      () => setStep((prev) => (prev + 1) % SEQUENCE.length),
      dwell
    );
    return () => clearTimeout(timer);
  }, [step]);

  const dotColor =
    sendState === 1
      ? "var(--signal)"
      : sendState === 2
        ? "var(--wire)"
        : "rgba(19,16,23,.35)";
  const buttonBg = sendState === 2 ? "var(--wire)" : "var(--signal)";

  return (
    <div className={styles.device}>
      <span className={styles.notch} />
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.noInternet}>
            <span className={styles.noInternetDot} />
            NO INTERNET
          </span>
        </div>

        <div className={styles.heading}>
          <div className={styles.mode}>Payssenger mode</div>
          <div className={styles.title}>Send money</div>
        </div>

        <div className={styles.card}>
          <div className={styles.row}>
            <span>To</span>
            <span className={styles.rowValue}>Ayesha K.</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.row}>
            <span>Amount</span>
            <span className={styles.rowValue}>Rs 500</span>
          </div>
          <div className={`${styles.row} ${styles.rowTight}`}>
            <span>Service fee</span>
            <span className={styles.rowValue}>Rs 10</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>Rs 510</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.status}>
            <span
              className={styles.statusDot}
              style={{ background: dotColor }}
            />
            {STATUS_LABEL[sendState]}
          </div>
          <div className={styles.button} style={{ background: buttonBg }}>
            {BUTTON_LABEL[sendState]}
          </div>
        </div>
      </div>
    </div>
  );
}
