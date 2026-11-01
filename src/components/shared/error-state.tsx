"use client";

import { RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Error UI for route error boundaries. */
export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-pill bg-danger-50 text-danger">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </div>
      <h2 className="text-h3 text-ink">{title}</h2>
      <p className="text-body-sm max-w-md text-ink-muted">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-2">
          <RotateCw className="size-4" aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  );
}
