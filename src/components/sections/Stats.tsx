import { Eyebrow } from "@/components/ui/Eyebrow";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Inview } from "@/components/ui/reveal/Inview";
import styles from "./Stats.module.css";

const STATS = [
  { value: "1st", label: "Offline bank in Pakistan" },
  { value: "0", label: "Internet needed to bank" },
  { value: "100M+", label: "Pakistanis it's built for" },
  { value: "24/7", label: "Always within reach" },
];

export function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow tone="light">By the numbers</Eyebrow>
        <StackedLines
          className={styles.title}
          lines={["A bank for", "the other half"]}
        />
      </div>

      <dl className={styles.grid}>
        {STATS.map((stat, i) => (
          <Inview
            key={stat.label}
            className={styles.cell}
            delayIn={i * 110}
            y={30}
            duration={800}
          >
            <dt className={styles.srOnly}>{stat.label}</dt>
            <dd className={styles.dd}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </dd>
          </Inview>
        ))}
      </dl>
    </section>
  );
}
