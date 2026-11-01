import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Form label — body-sm, medium weight. Pair with `htmlFor`. */
export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("text-body-sm font-medium text-ink select-none", className)}
      {...props}
    />
  );
}
