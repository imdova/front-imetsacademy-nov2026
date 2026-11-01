import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Icon-only button — maps `.im-btn-circle` / `.im-btn-square`.
 * Always pass an `aria-label` (no visible text).
 */
const iconButtonVariants = cva(
  "inline-flex items-center justify-center border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      shape: {
        circle: "size-9 rounded-pill",
        square: "size-11 rounded-md",
      },
      tone: {
        default: "bg-surface text-ink border-border hover:border-primary hover:text-primary",
        accent: "bg-accent text-ink border-accent hover:bg-accent-hover",
      },
    },
    compoundVariants: [
      { shape: "square", tone: "default", class: "border-border-input" },
    ],
    defaultVariants: { shape: "circle", tone: "default" },
  },
);

export type IconButtonProps = ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
    "aria-label": string;
  };

export function IconButton({
  className,
  shape,
  tone,
  asChild = false,
  type,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(iconButtonVariants({ shape, tone }), className)}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}

export { iconButtonVariants };
