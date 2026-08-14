import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

/** Small uppercase label with a leading dot. */
export function Eyebrow({ children, tone = "dark", className }: EyebrowProps) {
  return (
    <span className={`${styles.eyebrow} ${styles[tone]} ${className ?? ""}`}>
      <span className={styles.dot} />
      {children}
    </span>
  );
}
