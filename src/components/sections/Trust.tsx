"use client";

import { useEffect, useRef } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { Words } from "@/components/ui/reveal/Words";
import { Inview } from "@/components/ui/reveal/Inview";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CarouselDots } from "@/components/ui/CarouselDots";
import styles from "./Trust.module.css";

const HEADLINES = [
  ["Banking", "For", "Every", "Pakistani"],
  ["No", "Tower", "No", "Worries"],
  ["Money", "That", "Always", "Moves"],
];

const PERSONAS = [
  {
    img: "/images/farmer.jpg",
    name: "Rashid",
    role: "Farmer · Chitral",
    alt: "Farmer standing in a field using a phone",
  },
  {
    img: "/images/shopkeeper.jpg",
    name: "Imran",
    role: "Shopkeeper · Karachi",
    alt: "Shopkeeper in a market using a phone",
  },
  {
    img: "/images/commuter.jpg",
    name: "Bilal",
    role: "Commuter · Lahore",
    alt: "Commuter on a bus using a phone",
  },
];

// Opposing X drift per ghost word: [from%, to%].
const PARALLAX: [number, number][] = [
  [-3, 3],
  [3, -3],
  [-2, 4],
  [4, -3],
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function Trust() {
  const { index, setIndex, next, prev } = useCarousel(PERSONAS.length);
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const headline = HEADLINES[index];
  const persona = PERSONAS[index];

  // Opposing scroll parallax on the ghost words.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const [from, to] = PARALLAX[i];
        el.style.transform = `translateX(${from + (to - from) * p}%)`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const renderWord = (word: string, i: number) => (
    <span
      ref={(el) => {
        wordRefs.current[i] = el;
      }}
      className={`${styles.ghostWord} ${i === 2 ? styles.ink : ""}`}
    >
      <Words
        key={`${index}-${i}`}
        text={word}
        duration={700}
        stagger={0}
      />
    </span>
  );

  return (
    <section id="why" ref={sectionRef} className={styles.section}>
      <div className={styles.badges}>
        <Inview
          className={styles.percent}
          y={0}
          scale={0.9}
          duration={700}
        >
          <span className={styles.percentValue}>100%</span>
          <span className={styles.percentCaption}>
            Banking built around your life
          </span>
        </Inview>

        <Inview
          as="article"
          className={styles.badgeCard}
          delayIn={120}
          y={24}
        >
          <span className={styles.chip}>#01</span>
          <div>
            <p className={styles.badgeTitle}>Made for real life in Pakistan</p>
            <p className={styles.badgeBody}>
              From city shopkeepers to farmers off the grid, people bank with
              Payssenger because it keeps working when everything else stops.
            </p>
          </div>
        </Inview>
      </div>

      <h2 className={styles.ghost} aria-label={headline.join(" ")}>
        <span className={styles.ghostRow}>
          {renderWord(headline[0], 0)}
          {renderWord(headline[1], 1)}
        </span>
        <span className={styles.ghostRow}>
          {renderWord(headline[2], 2)}
          {renderWord(headline[3], 3)}
        </span>
      </h2>

      <Inview
        as="figure"
        className={styles.card}
        y={60}
        scale={0.92}
        duration={900}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          src={persona.img}
          alt={persona.alt}
          className={styles.cardImg}
          loading="lazy"
        />
        <figcaption className={styles.caption}>
          <span className={styles.captionName}>{persona.name}</span>
          <span className={styles.captionRole}>{persona.role}</span>
        </figcaption>
      </Inview>

      <div className={styles.controls}>
        <ArrowButton
          direction="prev"
          variant="outline"
          onClick={prev}
          label="Previous story"
        />
        <CarouselDots
          count={PERSONAS.length}
          active={index}
          onSelect={setIndex}
          label="story"
        />
        <ArrowButton
          direction="next"
          variant="solid"
          onClick={next}
          label="Next story"
        />
      </div>
    </section>
  );
}
