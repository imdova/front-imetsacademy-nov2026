import { Star } from "lucide-react";
import { formatCount } from "@/lib/format";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";

// Sample reviews — placeholder content pending real review data from the backend.
const SAMPLE_REVIEWS = [
  {
    name: "Mona Khaled",
    initials: "MK",
    rating: 5,
    when: "2 weeks ago",
    text: "Practical, well-structured and directly applicable to my day-to-day work. The live sessions made all the difference.",
  },
  {
    name: "Omar Fathy",
    initials: "OF",
    rating: 5,
    when: "1 month ago",
    text: "The instructor explains complex frameworks in a simple way. I came out with tools I use every week.",
  },
  {
    name: "Layla Hassan",
    initials: "LH",
    rating: 4,
    when: "2 months ago",
    text: "Great content and strong value for money. Would have loved a couple more case studies.",
  },
];

const DISTRIBUTION = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= Math.round(value) ? "fill-accent stroke-accent" : "fill-none stroke-border-input",
          )}
        />
      ))}
    </span>
  );
}

export function CourseReviews({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="space-y-8">
      <div className="grid items-center gap-6 rounded-xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr]">
        <div className="text-center sm:border-e sm:border-border sm:pe-6">
          <p className="font-display text-[48px] leading-none font-extrabold text-ink">
            {rating.toFixed(1)}
          </p>
          <Stars value={rating} className="mt-2 justify-center" />
          <p className="text-caption mt-1 text-ink-subtle">{formatCount(reviews)} reviews</p>
        </div>
        <ul className="space-y-2">
          {DISTRIBUTION.map((row) => (
            <li key={row.stars} className="flex items-center gap-3 text-caption text-ink-muted">
              <span className="inline-flex w-10 shrink-0 items-center gap-1">
                {row.stars}
                <Star className="size-3 fill-accent stroke-accent" aria-hidden="true" />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-pill bg-surface-alt">
                <span className="block h-full rounded-pill bg-accent" style={{ width: `${row.pct}%` }} />
              </span>
              <span className="w-10 shrink-0 text-end">{row.pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-4">
        {SAMPLE_REVIEWS.map((review) => (
          <li key={review.name} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <Avatar initials={review.initials} size="md" />
              <div className="flex-1">
                <p className="text-body-sm font-semibold text-ink">{review.name}</p>
                <Stars value={review.rating} />
              </div>
              <span className="text-caption text-ink-subtle">{review.when}</span>
            </div>
            <p className="text-body-sm mt-3 text-ink-muted">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
