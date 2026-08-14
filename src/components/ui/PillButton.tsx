import { type ReactNode } from "react";
import { ArrowIcon } from "./icons";
import styles from "./PillButton.module.css";

type Variant = "light" | "solid" | "outline";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type PillButtonProps = CommonProps &
  (
    | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  );

/** Rounded pill CTA with a trailing arrow that nudges on hover. */
export function PillButton({
  children,
  variant = "solid",
  className,
  as = "button",
  ...rest
}: PillButtonProps) {
  const cls = `${styles.pill} ${styles[variant]} ${className ?? ""}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowIcon className={styles.arrow} />
    </>
  );

  if (as === "a") {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
