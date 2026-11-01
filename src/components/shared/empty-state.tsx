import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** EmptyState — shown when a list has no results. Icon + title + message + action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex size-14 items-center justify-center rounded-pill bg-primary-50 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-h3 text-ink">{title}</h3>
      {description && <p className="text-body-sm max-w-md text-ink-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
