"use client";

import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#security", label: "Security" },
  { href: "#stats", label: "Technology" },
];

/** Fixed navigation that fades from transparent to frosted glass on scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.82);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#top" className={styles.brand}>
        <span className={styles.brandDot} />
        Payssenger
      </a>
      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
        <MagneticLink href="#cta" className={styles.cta}>
          Get early access
        </MagneticLink>
      </div>
    </nav>
  );
}
