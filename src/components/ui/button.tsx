import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — maps design-system `.im-btn*` variants.
 * One primary action per view. Accent label is always `ink`, never white.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-sans font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-dark hover:bg-primary-hover",
        accent: "bg-accent text-ink hover:bg-accent-hover",
        outline:
          "bg-surface text-ink border-border-input hover:border-primary hover:text-primary",
        "outline-primary": "bg-surface text-primary border-primary hover:bg-primary-50",
        "outline-dark":
          "bg-transparent text-on-dark border-on-dark hover:bg-white/10",
        ghost: "bg-transparent text-primary px-2 hover:bg-primary-50",
      },
      size: {
        sm: "h-9 px-4 text-sm leading-5",
        default: "h-11 px-5 text-[15px] leading-5",
        lg: "h-[52px] px-6 text-base leading-6",
      },
      block: { true: "w-full", false: "" },
    },
    compoundVariants: [{ variant: "ghost", size: "default", class: "px-2" }],
    defaultVariants: { variant: "primary", size: "default", block: false },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the child element (e.g. a Next.js <Link>) via Radix Slot. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, block }), className)}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}

export { buttonVariants };
