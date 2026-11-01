import { Star } from "lucide-react";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Rating value with a gold star and optional review count. */
export function StarRating({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-bold text-ink", className)}>
      <Star className="size-4 fill-accent stroke-accent" aria-hidden="true" />
      <span>{rating.toFixed(1)}</span>
      {typeof reviews === "number" && (
        <span className="font-normal text-ink-subtle">({formatCount(reviews)})</span>
      )}
      <span className="sr-only">
        out of 5{typeof reviews === "number" ? ` from ${formatCount(reviews)} reviews` : ""}
      </span>
    </span>
  );
}
