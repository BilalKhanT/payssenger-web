import { HeroCanvas } from "@/components/ui/HeroCanvas";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import styles from "./Hero.module.css";

/** Full-viewport hero with WebGL backdrop and the floating phone demo. */
export function Hero() {
  return (
    <header id="top" className={styles.hero}>
      <HeroCanvas />
      <div className={styles.vignette} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal as="div" y={28} duration={0.9} className={styles.eyebrow}>
            Offline-first digital banking
          </Reveal>
          <Reveal as="h1" delay={90} y={28} duration={0.9} className={styles.title}>
            Banking that works
            <br />
            when the signal <span className={styles.accent}>doesn&apos;t.</span>
          </Reveal>
          <Reveal as="p" delay={180} y={28} duration={0.9} className={styles.lead}>
            When the internet drops, Payssenger keeps your bank in your pocket —
            sending signed, bank-verified payments over SMS. Same app, same
            screens, no data required.
          </Reveal>
          <Reveal delay={270} y={28} duration={0.9} className={styles.actions}>
            <MagneticLink href="#cta" className={styles.primary}>
              Get early access
            </MagneticLink>
            <a href="#how" className={styles.secondary}>
              See how it works →
            </a>
          </Reveal>
        </div>

        <Reveal delay={220} y={44} duration={1} className={styles.phoneWrap}>
          <PhoneMock />
        </Reveal>
      </div>

      <div className={styles.scrollHint}>SCROLL ↓</div>
    </header>
  );
}
