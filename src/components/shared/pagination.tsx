import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pagination with numbered links. `hrefFor(page)` builds each URL. */
export function Pagination({
  page,
  totalPages,
  hrefFor,
  className,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  className?: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const base =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-md border px-3 text-body-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-2", className)}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={cn(base, "border-border-input bg-surface text-ink hover:border-primary hover:text-primary")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span className="max-sm:sr-only">Previous</span>
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(base, "border-border bg-surface text-ink-subtle opacity-50")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span className="max-sm:sr-only">Previous</span>
        </span>
      )}

      <ul className="flex items-center gap-2">
        {pages.map((p) => (
          <li key={p}>
            <Link
              href={hrefFor(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                base,
                p === page
                  ? "border-primary bg-primary font-semibold text-on-dark"
                  : "border-border-input bg-surface text-ink hover:border-primary hover:text-primary",
              )}
            >
              {p}
            </Link>
          </li>
        ))}
      </ul>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={cn(base, "border-border-input bg-surface text-ink hover:border-primary hover:text-primary")}>
          <span className="max-sm:sr-only">Next</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(base, "border-border bg-surface text-ink-subtle opacity-50")}>
          <span className="max-sm:sr-only">Next</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
