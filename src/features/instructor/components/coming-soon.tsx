import type { ReactNode } from "react";

/** Lightweight placeholder for instructor portal sections not yet built out. */
export function InstructorComingSoon({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-h1 text-ink">{title}</h1>
        <p className="mt-1 text-body text-ink-muted">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">{icon}</span>
        <p className="mt-2 text-h4 text-ink">{title}</p>
        <p className="max-w-md text-body-sm text-ink-subtle">
          This part of the instructor portal is coming soon. The quiz builder is ready to try from
          the sidebar.
        </p>
      </div>
    </div>
  );
}
