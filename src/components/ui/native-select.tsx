import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Bare native <select> — sits inside a <FieldFrame> with a trailing chevron.
 * Native select keeps full keyboard/screen-reader support with no extra JS.
 */
export function NativeSelect({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent p-0 text-[15px] leading-5 text-ink outline-none disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
