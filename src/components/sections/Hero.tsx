"use client";

import { useChrome } from "@/components/providers/ChromeProvider";
import { useParallax } from "@/hooks/useParallax";
import { useFitText } from "@/hooks/useFitText";
import { useCarousel } from "@/hooks/useCarousel";
import { Header } from "@/components/layout/Header";
import { Words } from "@/components/ui/reveal/Words";
import { StackedLines } from "@/components/ui/reveal/StackedLines";
import { Inview } from "@/components/ui/reveal/Inview";
import { CarouselDots } from "@/components/ui/CarouselDots";
import styles from "./Hero.module.css";

const FEATURES = [
  {
    img: "/images/hands.jpg",
    label: "Send money",
    title: "To anyone, instantly",
    cta: "See how",
    alt: "Hands holding a phone completing a payment with no signal",
  },
  {
    img: "/images/shopkeeper.jpg",
    label: "Pay bills",
    title: "Utilities & more",
    cta: "Explore",
    alt: "Shopkeeper paying a bill on a phone in a market",
  },
  {
    img: "/images/village.jpg",
    label: "Top up",
    title: "Airtime & data",
    cta: "Learn more",
    alt: "Person on a rooftop in a remote village using a phone",
  },
];

const AVATAR_COLORS = ["#5790e6", "#c2e029", "#0b6e97", "#ffffff"];

export function Hero() {
  const { ready } = useChrome();
  const { container, target } = useParallax<HTMLElement, HTMLDivElement>(0, 12);
  const { containerRef: titleFitRef, textRef: titleRef } = useFitText<
    HTMLDivElement,
    HTMLHeadingElement
  >();
  const { index, setIndex } = useCarousel(FEATURES.length, {
    interval: 3800,
    playing: ready,
  });

  const feature = FEATURES[index];

  return (
    <section id="top" ref={container} className={styles.hero}>
      <div className={styles.plateWrap}>
        <div ref={target} className={styles.plate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="Woman on a rural mountain road at dusk using her phone"
            className={styles.plateImg}
            fetchPriority="high"
          />
        </div>
        <div className={styles.overlay} />
      </div>

      <Header />

      <div ref={titleFitRef} className={styles.titleWrap}>
        <h1 ref={titleRef} className={styles.title}>
          <Words
            text="No Signal Needed"
            play={ready}
            stagger={140}
            duration={1100}
          />
        </h1>
      </div>

      <div className={styles.bottom}>
        <StackedLines
          className={styles.tagline}
          lines={["Your Bank,", "Always On"]}
          play={ready}
          baseDelay={350}
          stagger={110}
          duration={900}
        />

        <div className={styles.cluster}>
          <Inview
            className={styles.slider}
            delayIn={650}
            y={28}
            duration={900}
          >
            <div key={index} className={styles.featureCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.img}
                alt={feature.alt}
                className={styles.featureImg}
                loading="lazy"
              />
              <div className={styles.featureBody}>
                <span className={styles.featureLabel}>{feature.label}</span>
                <span className={styles.featureTitle}>{feature.title}</span>
                <span className={styles.featureCta}>{feature.cta} →</span>
              </div>
            </div>
            <CarouselDots
              count={FEATURES.length}
              active={index}
              onSelect={setIndex}
              tone="light"
              label="feature"
            />
          </Inview>

          <Inview
            as="article"
            className={styles.statCard}
            delayIn={780}
            y={28}
            duration={900}
          >
            <div className={styles.statLeft}>
              <span className={styles.statValue}>1st</span>
              <div className={styles.avatars}>
                {AVATAR_COLORS.map((color, i) => (
                  <span
                    key={i}
                    className={styles.avatar}
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span className={styles.statCaption}>
                Offline bank in Pakistan
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/farmer.jpg"
              alt="Farmer in a field using a phone"
              className={styles.statImg}
              loading="lazy"
            />
          </Inview>
        </div>
      </div>

      <div className={styles.scrollHint}>SCROLL ↓</div>
    </section>
  );
}
