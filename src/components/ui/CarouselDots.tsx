import styles from "./CarouselDots.module.css";

interface CarouselDotsProps {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  tone?: "dark" | "light";
  label?: string;
}

/** Row of pill dots; the active one stretches wide. */
export function CarouselDots({
  count,
  active,
  onSelect,
  tone = "dark",
  label = "slide",
}: CarouselDotsProps) {
  return (
    <div className={`${styles.dots} ${styles[tone]}`} role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={styles.dotButton}
          aria-label={`Go to ${label} ${i + 1}`}
          aria-current={i === active}
          onClick={() => onSelect(i)}
        >
          <span
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
          />
        </button>
      ))}
    </div>
  );
}
