"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Problem.module.css";

/** Contrasts a regular app going dark against Payssenger staying live. */
export function Problem() {
  const [online, setOnline] = useState(true);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.eyebrow}>
          The problem
        </Reveal>
        <Reveal as="h2" delay={80} className={styles.heading}>
          The bars disappear. So does your money.
        </Reveal>

        <div className={styles.grid}>
          <Reveal as="p" className={styles.copy}>
            Tens of millions of people bank entirely through an app. The instant
            the connection drops — an outage, a flood, a dead zone on a mountain
            road — the app simply stops. The money is still sitting in the
            account. There is just no way to reach it. That single point of
            failure is the problem Payssenger removes.
          </Reveal>

          <Reveal delay={120}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                Internet: {online ? "ON" : "OFF"}
              </span>
              <button
                type="button"
                className={styles.switch}
                data-on={online}
                onClick={() => setOnline((prev) => !prev)}
                aria-pressed={online}
                aria-label="Toggle internet connection"
              >
                <span className={styles.knob} data-on={online} />
              </button>
              <span className={styles.hint}>try switching it off</span>
            </div>

            <div className={styles.cards}>
              {/* Regular app — blurs and locks when offline. */}
              <div className={styles.regularCard}>
                <div className={styles.cardTag}>A REGULAR APP</div>
                <div className={styles.cardBody} data-online={online}>
                  <div className={styles.balanceLabel}>Balance</div>
                  <div className={styles.balance}>Rs 84,200</div>
                  <div className={styles.cardDivider} />
                  <div className={styles.cardMeta}>Send · Pay bills · Transfer</div>
                </div>
                <div className={styles.offlineOverlay} data-online={online}>
                  <span className={styles.bang}>!</span>
                  <span className={styles.overlayTitle}>No connection</span>
                  <span className={styles.overlaySub}>Can&apos;t reach the bank</span>
                </div>
              </div>

              {/* Payssenger — keeps working over SMS. */}
              <div className={styles.payssengerCard}>
                <div className={styles.cardTagSignal}>WITH PAYSSENGER</div>
                <div className={styles.cardBody}>
                  <div className={styles.balanceLabelDark}>Balance</div>
                  <div className={styles.balance}>Rs 84,200</div>
                  <div className={styles.cardDividerDark} />
                  <div className={styles.smsBadge}>
                    <span className={styles.smsDot} />
                    Sent over SMS
                  </div>
                </div>
                <div className={styles.footnote}>
                  Still banking · 0 bytes of data
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
