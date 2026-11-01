import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** SectionHeading — section title + optional description and trailing action. */
export function SectionHeading({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="space-y-1">
        <h2 className="text-h2 text-ink">{title}</h2>
        {description && <p className="text-body text-ink-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
