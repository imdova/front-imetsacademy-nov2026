import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Loading placeholder block — pulses on surface-alt tint. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-surface-alt", className)}
      {...props}
    />
  );
}
