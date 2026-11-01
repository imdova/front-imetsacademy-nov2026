import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type FilterChipItem = {
  label: string;
  href: string;
  active?: boolean;
  count?: number;
};

const chipVariants = cva(
  "inline-flex h-11 items-center gap-2 rounded-pill border px-5 text-body-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      soft: { true: "", false: "shadow-sm" },
      active: { true: "font-semibold", false: "bg-surface text-ink hover:border-primary" },
    },
    compoundVariants: [
      { soft: false, active: true, class: "border-primary bg-primary text-on-dark" },
      {
        soft: true,
        active: true,
        class: "border-primary-50 bg-primary-50 text-primary",
      },
      { soft: false, active: false, class: "border-border" },
      { soft: true, active: false, class: "border-border" },
    ],
    defaultVariants: { soft: false, active: false },
  },
);

/**
 * FilterChips — category filter row. Chips are links that set URL state, so the
 * active chip is driven by the current params (shareable, back-button friendly).
 * One active at a time.
 */
export function FilterChips({
  items,
  soft = false,
  ariaLabel,
  className,
}: {
  items: FilterChipItem[];
  soft?: boolean;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <nav aria-label={ariaLabel} className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "true" : undefined}
          className={chipVariants({ soft, active: item.active })}
        >
          {item.label}
          {typeof item.count === "number" && (
            <span className={item.active ? "opacity-80" : "text-ink-subtle"}>({item.count})</span>
          )}
        </Link>
      ))}
    </nav>
  );
}
