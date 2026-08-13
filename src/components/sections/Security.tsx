import { Reveal } from "@/components/ui/Reveal";
import styles from "./Security.module.css";

const PILLARS = [
  {
    tag: "01 / DEVICE",
    title: "Nothing stored on the phone",
    body: "Every session starts fresh and clears the moment you log out. No balances, no account details, nothing left behind to lose.",
  },
  {
    tag: "02 / IDENTITY",
    title: "Your signature is your identity",
    body: "A key that can never leave your device signs each request. The bank authenticates the key itself — not the handset it came from.",
  },
  {
    tag: "03 / FRAUD",
    title: "Fraud stopped at the source",
    body: "Unusual amounts, brand-new payees and rapid-fire transfers are challenged the moment they happen, before a rupee moves.",
  },
];

/** Dark three-column section covering the security model. */
export function Security() {
  return (
    <section id="security" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.eyebrow}>
          Security
        </Reveal>
        <Reveal as="h2" delay={80} className={styles.heading}>
          Built so there is nothing worth stealing.
        </Reveal>

        <div className={styles.grid}>
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.tag} delay={index * 120}>
              <div className={styles.tag}>{pillar.tag}</div>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardBody}>{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
