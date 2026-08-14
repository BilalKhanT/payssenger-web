import { ArrowIcon } from "./icons";
import styles from "./ArrowButton.module.css";

interface ArrowButtonProps {
  direction?: "next" | "prev";
  variant?: "solid" | "outline";
  onClick?: () => void;
  label: string;
}

/** Circular carousel control; the inner arrow scales on hover. */
export function ArrowButton({
  direction = "next",
  variant = "solid",
  onClick,
  label,
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`${styles.button} ${styles[variant]}`}
    >
      <ArrowIcon
        className={`${styles.icon} ${direction === "prev" ? styles.flip : ""}`}
      />
    </button>
  );
}
