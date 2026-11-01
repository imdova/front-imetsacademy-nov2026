import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

/** Raised strip of 4 value points. 4 across on desktop, 2×2 tablet, stacked mobile. */
export function FeatureStrip({
  items,
  className,
}: {
  items: FeatureItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-surface shadow-md sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-3 p-5 max-sm:border-t max-sm:border-border max-sm:first:border-t-0 lg:border-s lg:border-border lg:first:border-s-0"
        >
          <span className="flex shrink-0 text-primary [&>svg]:size-8">{item.icon}</span>
          <div>
            <p className="font-display text-[15px] leading-5 font-bold text-ink">{item.title}</p>
            <p className="text-xs leading-4 text-ink-muted">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
