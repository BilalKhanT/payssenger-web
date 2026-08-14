import { Eyebrow } from "@/components/ui/Eyebrow";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Inview } from "@/components/ui/reveal/Inview";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Actions.module.css";

const ROWS = [
  {
    num: "01",
    name: "Send & receive money",
    desc: "Move money to anyone in the country — even with no internet.",
    href: "#send",
  },
  {
    num: "02",
    name: "Pay your bills",
    desc: "Electricity, gas, water and more, on time, every time.",
    href: "#bills",
  },
  {
    num: "03",
    name: "Buy airtime & data",
    desc: "Top up any number in seconds, wherever you are.",
    href: "#topup",
  },
  {
    num: "04",
    name: "Check your balance",
    desc: "See exactly where you stand, any time of day.",
    href: "#balance",
  },
];

export function Actions() {
  return (
    <section id="do" className={styles.section}>
      <div className={styles.head}>
        <Eyebrow>Everyday banking</Eyebrow>
        <StackedLines
          className={styles.title}
          lines={["Everything you need,", "no signal required"]}
        />
      </div>

      <ul className={styles.list}>
        {ROWS.map((row, i) => (
          <li key={row.num}>
            <Inview delayIn={i * 90} y={26}>
              <a href={row.href} className={styles.row}>
                <span className={styles.num}>{row.num}</span>
                <span className={styles.body}>
                  <span className={styles.name}>{row.name}</span>
                  <span className={styles.desc}>{row.desc}</span>
                </span>
                <span className={styles.arrow}>
                  <ArrowIcon className={styles.arrowIcon} />
                </span>
              </a>
            </Inview>
          </li>
        ))}
      </ul>
    </section>
  );
}
