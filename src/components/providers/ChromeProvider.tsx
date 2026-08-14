"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLenisInstance } from "./SmoothScroll";

interface ChromeState {
  /** True once the intro loader has finished — gates hero reveals. */
  ready: boolean;
  setReady: (value: boolean) => void;
  contactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const ChromeContext = createContext<ChromeState | null>(null);

export function useChrome(): ChromeState {
  const ctx = useContext(ChromeContext);
  if (!ctx) throw new Error("useChrome must be used within ChromeProvider");
  return ctx;
}

/**
 * Holds cross-cutting UI state (loader readiness, contact modal, menu) and
 * locks scrolling — via Lenis and a native fallback — whenever the page is
 * gated: before the loader finishes or while an overlay is open.
 */
export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenisInstance();
  const [ready, setReady] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const locked = !ready || contactOpen || menuOpen;

  useEffect(() => {
    const html = document.documentElement;
    if (locked) {
      lenis?.stop();
      html.classList.add("is-locked");
    } else {
      lenis?.start();
      html.classList.remove("is-locked");
    }
  }, [locked, lenis]);

  const value = useMemo<ChromeState>(
    () => ({
      ready,
      setReady,
      contactOpen,
      openContact: () => setContactOpen(true),
      closeContact: () => setContactOpen(false),
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
    }),
    [ready, contactOpen, menuOpen]
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}
