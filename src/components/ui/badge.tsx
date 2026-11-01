import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge — pill labels for program type, status, category and discount.
 * Status badges always carry a word (never colour alone); pair with <Dot />.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 h-[26px] px-3 rounded-pill font-sans text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        program: "bg-violet-50 text-violet",
        info: "bg-primary-50 text-primary",
        success: "bg-success-50 text-success",
        warm: "bg-orange-50 text-orange",
        teal: "bg-teal-50 text-teal",
        rose: "bg-rose-50 text-rose",
        neutral: "bg-surface-alt text-ink-muted border border-border",
        discount: "bg-accent-50 text-accent-text rounded-sm h-[30px] text-sm font-bold",
        "on-dark": "bg-white/10 text-on-dark border border-on-dark-muted",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean };

export function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** 7px status dot — inherits the badge's text colour. */
export function Dot({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-[7px] shrink-0 rounded-full bg-current", className)}
      {...props}
    />
  );
}

export { badgeVariants };
