import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Bare textarea — sits inside a <FieldFrame shape="area"> (no border of its own). */
export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "min-h-24 w-full flex-1 resize-y border-0 bg-transparent p-0 text-[15px] leading-5 text-ink outline-none placeholder:text-ink-subtle disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
