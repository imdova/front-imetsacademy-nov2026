import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Container — centered max width (container token, 1280px) with the
 * design-system gutters (space-4 mobile, space-6 desktop).
 */
export function Container({
  as,
  className,
  ...props
}: ComponentProps<"div"> & { as?: ElementType }) {
  const Comp = as ?? "div";
  return (
    <Comp className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)} {...props} />
  );
}
