"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Footer } from "@/components/layout/Footer";
import styles from "./CTA.module.css";

/** Closing early-access call to action, with the footer nested beneath. */
export function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    // Wire this to a real waitlist endpoint when the pilot opens.
    setSubmitted(true);
  };

  return (
    <section id="cta" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Reveal as="h2" className={styles.heading}>
            Keep banking
            <br />
            when the network can&apos;t.
          </Reveal>

          <Reveal delay={120}>
            <p className={styles.copy}>
              Be first in line for the pilot. We&apos;ll reach out when
              Payssenger opens in your region.
            </p>

            {submitted ? (
              <p className={styles.thanks}>
                You&apos;re on the list — talk soon.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  className={styles.input}
                  aria-label="Email address"
                />
                <MagneticLink
                  href="#cta"
                  className={styles.submit}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit(
                      event as unknown as React.FormEvent<HTMLFormElement>
                    );
                  }}
                >
                  Request access
                </MagneticLink>
              </form>
            )}
          </Reveal>
        </div>

        <Footer />
      </div>
    </section>
  );
}
