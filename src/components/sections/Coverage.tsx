import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Words } from "@/components/ui/reveal/Words";
import { Inview } from "@/components/ui/reveal/Inview";
import styles from "./Coverage.module.css";

const TILES = [
  {
    img: "/images/shopkeeper.jpg",
    tone: "clay",
    name: "Every network",
    desc: "Works on any SIM and any phone you already own.",
    alt: "Shopkeeper using a phone in a market",
  },
  {
    img: "/images/commuter.jpg",
    tone: "blue",
    name: "Every corner",
    desc: "From city markets to the most remote mountain villages.",
    alt: "Commuter on a bus using a phone",
  },
] as const;

export function Coverage() {
  return (
    <section id="coverage" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <Inview className={styles.iconWrap} scale={0.85} duration={700}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hands.jpg"
              alt="Hands holding a phone showing a payment"
              className={styles.icon}
              loading="lazy"
            />
          </Inview>
          <StackedLines
            className={styles.title}
            lines={["Banking that", "reaches", "everywhere"]}
            stagger={120}
          />
          <p className={styles.body}>
            <Words
              text="Wherever you are and whatever the signal, Payssenger keeps your money within reach — no data plan, no branch, and no queue."
              mode="fade"
              stagger={28}
              baseDelay={250}
              duration={700}
            />
          </p>
        </div>

        <div className={styles.tiles}>
          {TILES.map((tile, i) => (
            <Inview
              key={tile.name}
              as="figure"
              className={`${styles.tile} ${i === 1 ? styles.tileLower : ""}`}
              delayIn={i * 140}
              y={48}
              duration={900}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.img}
                alt={tile.alt}
                className={styles.tileImg}
                loading="lazy"
              />
              <figcaption
                className={`${styles.caption} ${
                  tile.tone === "blue" ? styles.captionBlue : styles.captionClay
                }`}
              >
                <span className={styles.captionName}>{tile.name}</span>
                <span className={styles.captionDesc}>{tile.desc}</span>
              </figcaption>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
}
