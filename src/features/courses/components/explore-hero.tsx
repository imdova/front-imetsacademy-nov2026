import { Award, GraduationCap, Monitor, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ExploreSearch } from "@/features/courses/components/explore-search";

const miniFeatures = [
  { icon: GraduationCap, label: "Expert-Led Training" },
  { icon: Monitor, label: "Practical & Hands-on" },
  { icon: Award, label: "Professional Certificates" },
  { icon: TrendingUp, label: "Advance Your Career" },
];

/** Light hero for the Explore page: overline, title, search and value points. */
export function ExploreHero() {
  return (
    <section className="border-b border-border bg-linear-to-b from-primary-50/60 to-surface">
      <Container className="py-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-overline text-primary">Learn · Develop · Lead</p>
          <h1 className="text-display-lg mt-3 text-ink">
            Build Business Skills for Real{" "}
            <span className="text-accent-strong">Career Growth.</span>
          </h1>
          <p className="text-body-lg mt-3 text-ink-muted">
            Professional courses and diplomas in management, leadership, strategy, and digital
            transformation. Learn from experts. Apply in real life.
          </p>
        </div>

        <div className="mt-6 max-w-2xl">
          <ExploreSearch />
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {miniFeatures.map((feature) => (
            <li
              key={feature.label}
              className="inline-flex items-center gap-2 text-body-sm text-ink-muted"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-primary-50 text-primary">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              {feature.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
