import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/** Decorative gold diagonal slash over navy (the no-photo hero fallback). */
function HeroSlash() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 end-0 hidden w-[42%] bg-navy-800 md:block"
      style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div
        className="absolute inset-0 bg-accent"
        style={{ clipPath: "polygon(30% 0, 34% 0, 4% 100%, 0 100%)" }}
      />
    </div>
  );
}

/**
 * PageHero — navy band at the top of inner pages.
 * Title carries ONE highlighted word in accent (<span className="text-accent">).
 * Pass `media` to show an image on the right instead of the slash fallback.
 */
export function PageHero({
  eyebrow,
  breadcrumbs,
  title,
  description,
  actions,
  media,
  children,
  size = "lg",
  className,
}: {
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  children?: ReactNode;
  size?: "xl" | "lg";
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-900 text-on-dark", className)}>
      {media ? (
        <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] lg:block">
          {media}
        </div>
      ) : (
        <HeroSlash />
      )}

      <Container className="relative py-12 md:py-16">
        <div className="max-w-2xl">
          {breadcrumbs && <div className="mb-3">{breadcrumbs}</div>}
          {eyebrow && <div className="mb-3">{eyebrow}</div>}
          <h1
            className={cn(
              "text-balance text-on-dark",
              size === "xl" ? "text-display-xl" : "text-display-lg",
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="text-body-lg mt-3 max-w-xl text-on-dark-muted">{description}</p>
          )}
          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
      </Container>
    </section>
  );
}
