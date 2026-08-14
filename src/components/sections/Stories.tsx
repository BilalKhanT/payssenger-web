import { Eyebrow } from "@/components/ui/Eyebrow";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Inview } from "@/components/ui/reveal/Inview";
import styles from "./Stories.module.css";

const STORIES = [
  {
    quote:
      "The signal drops in my village all the time. It never stops me from paying anyone now.",
    name: "Rukhsana Bibi",
    role: "Chitral",
  },
  {
    quote:
      "My whole shop runs on it. Customers pay and my bills clear, even when the internet is down.",
    name: "Imran Shah",
    role: "Karachi",
  },
  {
    quote:
      "I sent money to my mother during a blackout. It just worked, first time.",
    name: "Bilal Ahmed",
    role: "Lahore",
  },
];

export function Stories() {
  return (
    <section id="stories" className={styles.section}>
      <div className={styles.head}>
        <Eyebrow>What people say</Eyebrow>
        <StackedLines
          className={styles.title}
          lines={["Loved right across", "Pakistan"]}
        />
      </div>

      <ul className={styles.grid}>
        {STORIES.map((story, i) => (
          <li key={story.name}>
            <Inview delayIn={i * 120} y={40} duration={900}>
              <figure className={styles.card}>
                <span className={styles.mark}>&ldquo;</span>
                <blockquote className={styles.quote}>{story.quote}</blockquote>
                <figcaption className={styles.caption}>
                  <span className={styles.name}>{story.name}</span>
                  <span className={styles.role}>{story.role}</span>
                </figcaption>
              </figure>
            </Inview>
          </li>
        ))}
      </ul>
    </section>
  );
}
