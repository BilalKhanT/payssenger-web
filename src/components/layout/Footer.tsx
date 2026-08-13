import styles from "./Footer.module.css";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#security", label: "Security" },
      { href: "#stats", label: "Technology" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#cta", label: "Early access" },
      { href: "#top", label: "Contact" },
    ],
  },
];

/** Footer navigation and legal line, nested inside the CTA section. */
export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandDot} />
            Payssenger
          </div>
          <p className={styles.tagline}>
            Offline-first digital banking. If your phone can SMS, Payssenger can
            bank.
          </p>
        </div>

        <div className={styles.columns}>
          {COLUMNS.map((column) => (
            <div key={column.heading} className={styles.column}>
              <div className={styles.columnHeading}>{column.heading}</div>
              {column.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>

      <div className={styles.legal}>
        <span>© 2026 Payssenger</span>
        <span>Made for a signal-first world</span>
      </div>
    </>
  );
}
