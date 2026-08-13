"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/** An anchor that drifts toward the pointer on hover. */
export function MagneticLink({ children, ...props }: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a ref={ref} {...props}>
      {children}
    </a>
  );
}
