/** Payssenger signal-node mark: a dot broadcasting on both sides. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <path d="M7.6 7.6a6.2 6.2 0 0 0 0 8.8" />
      <path d="M16.4 7.6a6.2 6.2 0 0 1 0 8.8" />
      <path d="M4.9 4.9a10 10 0 0 0 0 14.2" />
      <path d="M19.1 4.9a10 10 0 0 1 0 14.2" />
    </svg>
  );
}
