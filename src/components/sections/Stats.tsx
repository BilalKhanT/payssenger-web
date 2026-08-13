import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import styles from "./Stats.module.css";

const STATS = [
  {
    value: 28.9,
    decimals: 1,
    suffix: "M",
    copy: "people in Pakistan bank through a mobile app — and stop the second data drops.",
  },
  {
    value: 78,
    suffix: "%",
    copy: "of surveyed users rated an offline-capable app five out of five.",
  },
  {
    value: 0,
    suffix: "",
    copy: "bytes of internet needed to move real money, end to end.",
  },
];

/** Animated headline statistics that count up on scroll. */
export function Stats() {
  return (
    <section id="stats" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.eyebrow}>
          The scale of it
        </Reveal>
        <div className={styles.grid}>
          {STATS.map((stat, index) => (
            <Reveal key={stat.copy} delay={index * 120} className={styles.item}>
              <Counter
                value={stat.value}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix}
                className={styles.number}
              />
              <p className={styles.copy}>{stat.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
