import { Reveal } from "@/components/ui/Reveal";
import styles from "./Statement.module.css";

/** Full-bleed accent band with the headline promise. */
export function Statement() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="h2" y={28} duration={0.9} className={styles.heading}>
          If your phone can text,
          <br />
          it can bank.
        </Reveal>
      </div>
    </section>
  );
}
