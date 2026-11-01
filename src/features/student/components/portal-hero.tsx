import type { ReactNode } from "react";

/** Gradient page header used across the student portal pages. */
export function PortalHero({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-50 to-surface p-6 md:p-8">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-h1 text-ink">{title}</h1>
        <p className="mt-1 text-body text-ink-muted">{subtitle}</p>
      </div>
      <span
        className="pointer-events-none absolute end-6 top-1/2 hidden -translate-y-1/2 text-primary/15 sm:block"
        aria-hidden="true"
      >
        {icon}
      </span>
    </div>
  );
}
