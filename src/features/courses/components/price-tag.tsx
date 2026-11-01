import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Price in accent-strong with an optional struck-through old price. */
export function PriceTag({
  price,
  oldPrice,
  size = "md",
  className,
}: {
  price: number;
  oldPrice?: number | null;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <p className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-display font-extrabold text-accent-strong",
          size === "lg" ? "text-price" : "text-[30px] leading-[34px]",
        )}
      >
        {formatPrice(price)}
      </span>
      {oldPrice != null && (
        <s className="text-body-sm font-semibold text-ink-subtle">{formatPrice(oldPrice)}</s>
      )}
    </p>
  );
}
