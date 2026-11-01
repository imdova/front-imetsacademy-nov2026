import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * FieldFrame — the bordered control shell from `.im-field`.
 * Holds a leading icon, a control (Input/Textarea/select) and optional trailing
 * node. Focus-within raises a primary border + primary-50 halo.
 * `border="control"` uses the WCAG-AA border (border-control) for forms.
 */
const fieldFrameVariants = cva(
  "relative flex gap-3 bg-surface rounded-md text-ink-subtle transition-shadow focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary-50",
  {
    variants: {
      shape: {
        default: "h-[52px] items-center px-4",
        area: "min-h-32 flex-col items-stretch p-4",
      },
      border: {
        input: "border border-border-input",
        control: "border border-border-control",
      },
      state: {
        default: "",
        error: "border-danger focus-within:border-danger focus-within:ring-danger-50",
      },
    },
    defaultVariants: { shape: "default", border: "input", state: "default" },
  },
);

export type FieldFrameProps = ComponentProps<"div"> & VariantProps<typeof fieldFrameVariants>;

export function FieldFrame({ className, shape, border, state, ...props }: FieldFrameProps) {
  return (
    <div className={cn(fieldFrameVariants({ shape, border, state }), className)} {...props} />
  );
}

export { fieldFrameVariants };
