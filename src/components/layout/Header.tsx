"use client";

import { useChrome } from "@/components/providers/ChromeProvider";
import { BrandMark } from "@/components/ui/BrandMark";
import styles from "./Header.module.css";

/** Transparent header sitting over the hero photo. */
export function Header() {
  const { openContact, openMenu } = useChrome();

  return (
    <header className={styles.header}>
      <nav className={styles.leftNav}>
        <a href="#why">Why Payssenger</a>
        <a href="#do">What you can do</a>
      </nav>

      <a href="#top" className={styles.brand}>
        <BrandMark className={styles.mark} />
        <span>Payssenger</span>
      </a>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.bookLink}
          onClick={openContact}
        >
          Get early access
        </button>
        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          onClick={openMenu}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
