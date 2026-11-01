import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Bare text input — sits inside a <FieldFrame> (no border of its own). */
export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "min-w-0 flex-1 border-0 bg-transparent p-0 text-[15px] leading-5 text-ink outline-none placeholder:text-ink-subtle disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
