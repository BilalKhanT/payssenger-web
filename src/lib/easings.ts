/**
 * Named easing curves used across the site's reveals and motion.
 * Cubic-bezier approximations of the spring/text-engine feel.
 */
export const EASE = {
  /** Word/line clip-mask reveals (hero title, stacked lines, ghost words). */
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Facilities body word fade. */
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  /** Loader progress fill + curtain slide-up. */
  inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** Spring-like settle for hover / carousel / rise-ins. */
  spring: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;
