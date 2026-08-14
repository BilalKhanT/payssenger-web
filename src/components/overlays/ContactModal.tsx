"use client";

import { useEffect, useRef, useState } from "react";
import { useChrome } from "@/components/providers/ChromeProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { CloseIcon, CheckIcon } from "@/components/ui/icons";
import styles from "./ContactModal.module.css";

/** Early-access waitlist modal. Submit is a local stub — no network. */
export function ContactModal() {
  const { contactOpen, closeContact } = useChrome();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [where, setWhere] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Focus on open; reset after close animation.
  useEffect(() => {
    if (contactOpen) {
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setSubmitted(false);
      setSubmitting(false);
      setName("");
      setEmail("");
      setWhere("");
    }, 350);
    return () => clearTimeout(t);
  }, [contactOpen]);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, closeContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stub: pretend to send, then show success. Wire to a real waitlist later.
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const firstName = name.trim().split(" ")[0] || "there";

  return (
    <div
      className={`${styles.overlay} ${contactOpen ? styles.open : ""}`}
      aria-hidden={!contactOpen}
    >
      <div className={styles.backdrop} onClick={closeContact} />
      <div className={styles.panel} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <div>
            <Eyebrow>Get early access</Eyebrow>
            <StackedLines
              className={styles.title}
              lines={["Join the", "waitlist"]}
              play={contactOpen}
              stagger={90}
              duration={800}
            />
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={closeContact}
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        {submitted ? (
          <div className={styles.success}>
            <span className={styles.check}>
              <CheckIcon className={styles.checkIcon} />
            </span>
            <p className={styles.successTitle}>Request received</p>
            <p className={styles.successSub}>
              Thanks, {firstName} — our team will be in touch as we open
              Payssenger in more regions.
            </p>
            <button
              type="button"
              className={styles.submit}
              onClick={closeContact}
            >
              Done
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Full name</span>
              <input
                ref={nameRef}
                type="text"
                className={styles.input}
                placeholder="Ayesha Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                className={styles.input}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Where are you based?</span>
              <textarea
                rows={3}
                className={styles.input}
                placeholder="Tell us your city or town so we can prioritise your area."
                value={where}
                onChange={(e) => setWhere(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
              data-busy={submitting}
            >
              {submitting ? "Sending…" : "Request access"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
