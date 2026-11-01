import type { ReactNode } from "react";
import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

/** Presentational 404 block (links supplied via `action`). */
export function NotFoundState({
  code = "404",
  title,
  description,
  action,
  className,
}: {
  code?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 text-center", className)}>
      <div className="flex size-16 items-center justify-center rounded-pill bg-primary-50 text-primary">
        <FileQuestion className="size-7" aria-hidden="true" />
      </div>
      <p className="text-overline text-primary">{code}</p>
      <h1 className="text-h2 text-ink">{title}</h1>
      {description && <p className="text-body max-w-md text-ink-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
