import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-pill bg-primary-100 font-bold text-primary",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

/** Initials avatar (reference `.im-avatar`). */
export function Avatar({
  initials,
  size,
  className,
}: { initials: string; className?: string } & VariantProps<typeof avatarVariants>) {
  return (
    <span aria-hidden="true" className={cn(avatarVariants({ size }), className)}>
      {initials}
    </span>
  );
}
