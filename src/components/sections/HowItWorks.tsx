"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    num: "01",
    title: "Switch on Payssenger",
    body: "Lost your data? Flip Payssenger mode on inside your bank app. Same login, the same home screen you already know.",
  },
  {
    num: "02",
    title: "Approve the payment",
    body: "Enter the amount and payee like always. Your phone signs the request with a key that only it holds — nothing sensitive leaves the device.",
  },
  {
    num: "03",
    title: "Sent over SMS",
    body: "The signed request travels to the bank as a plain text message. The bank checks the signature, moves the money, and texts back a receipt.",
  },
];

const CYCLE_MS = 3100;

/** Three-step explainer whose active card advances on a timer or on click. */
export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % STEPS.length),
      CYCLE_MS
    );
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section id="how" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Reveal as="div" className={styles.eyebrow}>
              How it works
            </Reveal>
            <Reveal as="h2" delay={80} className={styles.heading}>
              Three taps.
              <br />
              No connection required.
            </Reveal>
          </div>
          <Reveal as="p" delay={140} className={styles.intro}>
            The screens stay exactly the same as the ones you already use. The
            plumbing underneath is the only thing that changes.
          </Reveal>
        </div>

        <div className={styles.grid}>
          {STEPS.map((step, index) => (
            <Reveal
              key={step.num}
              delay={index * 100}
              className={`${styles.card} ${active === index ? styles.active : ""}`}
              style={{ cursor: "pointer" }}
            >
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setActive(index)}
              >
                <div className={styles.num}>{step.num}</div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardBody}>{step.body}</p>
                <div className={styles.progress}>
                  <div className={styles.bar} data-active={active === index} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
