"use client";

import { useChrome } from "@/components/providers/ChromeProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Inview } from "@/components/ui/reveal/Inview";
import { PillButton } from "@/components/ui/PillButton";
import { BrandMark } from "@/components/ui/BrandMark";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "#send", label: "Send money" },
      { href: "#bills", label: "Pay bills" },
      { href: "#topup", label: "Buy airtime" },
      { href: "#balance", label: "Check balance" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#about", label: "About" },
      { href: "#stories", label: "Stories" },
      { href: "#careers", label: "Careers" },
      { href: "#contact", label: "Contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "#help", label: "Help centre" },
      { href: "#coverage", label: "Coverage" },
      { href: "#safety", label: "Safety" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

const SOCIAL = [
  { href: "#instagram", label: "Instagram" },
  { href: "#x", label: "X" },
  { href: "#youtube", label: "YouTube" },
  { href: "#linkedin", label: "LinkedIn" },
];

const LEGAL = [
  { href: "#privacy", label: "Privacy" },
  { href: "#terms", label: "Terms" },
];

export function Footer() {
  const { openContact } = useChrome();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.cta}>
        <div>
          <Eyebrow tone="light">Get started</Eyebrow>
          <StackedLines
            className={styles.ctaTitle}
            lines={["Ready to", "bank anywhere?"]}
          />
        </div>
        <Inview delayIn={150} y={20} duration={700}>
          <PillButton variant="light" onClick={openContact}>
            Get early access
          </PillButton>
        </Inview>
      </div>

      <div className={styles.columns}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <BrandMark className={styles.mark} />
            <span>Payssenger</span>
          </div>
          <p className={styles.blurb}>
            Pakistan&apos;s first offline bank. If your phone can reach a network
            at all, Payssenger can bank.
          </p>
          <address className={styles.address}>
            <a href="mailto:hello@payssenger.com">hello@payssenger.com</a>
            <a href="tel:+922111100000">+92 21 111 00 00 00</a>
            <span className={styles.addressMuted}>
              Shahrah-e-Faisal, Karachi
            </span>
          </address>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.heading} className={styles.linkCol}>
            <div className={styles.colHeading}>{column.heading}</div>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Payssenger. All rights reserved.</span>
        <nav className={styles.social}>
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </nav>
        <nav className={styles.legal}>
          {LEGAL.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
