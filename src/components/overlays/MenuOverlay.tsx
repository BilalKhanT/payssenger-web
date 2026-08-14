"use client";

import { useEffect } from "react";
import { useChrome } from "@/components/providers/ChromeProvider";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { BrandMark } from "@/components/ui/BrandMark";
import { CloseIcon } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./MenuOverlay.module.css";

const LINKS = [
  { href: "#why", label: "Why Payssenger" },
  { href: "#do", label: "What you can do" },
  { href: "#stories", label: "Stories" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  { href: "#instagram", label: "Instagram" },
  { href: "#x", label: "X" },
  { href: "#youtube", label: "YouTube" },
  { href: "#linkedin", label: "LinkedIn" },
];

/** Fullscreen navigation overlay opened from the burger. */
export function MenuOverlay() {
  const { menuOpen, closeMenu, openContact } = useChrome();
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
    requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (target) lenis?.scrollTo(target as HTMLElement, { duration: 1.4 });
      else window.location.hash = href;
    });
  };

  return (
    <div
      className={`${styles.overlay} ${menuOpen ? styles.open : ""}`}
      aria-hidden={!menuOpen}
    >
      <div className={styles.backdrop} onClick={closeMenu} />
      <div className={styles.panel} role="dialog" aria-modal="true">
        <div className={styles.top}>
          <span className={styles.brand}>
            <BrandMark className={styles.mark} />
            Payssenger
          </span>
          <button
            type="button"
            className={styles.close}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        <nav className={styles.nav}>
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={goTo(link.href)}
              className={styles.link}
              style={{ ["--i" as string]: i }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.bottom}>
          <PillButton
            variant="light"
            onClick={() => {
              closeMenu();
              openContact();
            }}
          >
            Get early access
          </PillButton>
          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a key={s.href} href={s.href}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
