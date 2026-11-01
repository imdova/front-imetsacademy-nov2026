import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail. On navy heroes pass `tone="on-dark"`. */
export function Breadcrumbs({
  items,
  tone = "default",
  className,
}: {
  items: Crumb[];
  tone?: "default" | "on-dark";
  className?: string;
}) {
  const onDark = tone === "on-dark";
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-caption",
          onDark ? "text-on-dark-muted" : "text-ink-subtle",
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className="inline-flex items-center gap-2">
                {i === 0 && <Home className="size-3.5" aria-hidden="true" />}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      onDark ? "text-on-dark hover:text-accent" : "hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                )}
              </li>
              {!isLast && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
