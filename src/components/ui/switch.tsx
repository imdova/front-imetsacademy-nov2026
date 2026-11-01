"use client";

import { cn } from "@/lib/utils";

/** Controlled toggle switch (no external dependency). Pass an accessible label. */
export function Switch({
  checked,
  onCheckedChange,
  "aria-label": ariaLabel,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  "aria-label": string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60",
        checked ? "bg-primary" : "bg-border-input",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-surface shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
