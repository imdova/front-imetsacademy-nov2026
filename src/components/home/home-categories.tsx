import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Landmark,
  Layers,
  Monitor,
  Settings,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

const categories: { label: string; icon: LucideIcon }[] = [
  { label: "Strategic Management", icon: Target },
  { label: "Leadership & People", icon: Users },
  { label: "Project Management", icon: Layers },
  { label: "Business Operations", icon: Settings },
  { label: "Digital Transformation", icon: Monitor },
  { label: "Finance & Business Analytics", icon: BarChart3 },
  { label: "Marketing & Growth", icon: Briefcase },
  { label: "Business Administration", icon: Landmark },
];

/** Explore by Category — compact tiles linking into the course catalog. */
export function HomeCategories() {
  return (
    <Container as="section" className="py-12 md:py-16">
      <SectionHeading
        title="Explore by Category"
        action={
          <Link
            href={routes.courses}
            className="group inline-flex items-center gap-1 text-body-sm font-semibold text-primary"
          >
            View All Categories
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        }
      />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8">
        {categories.map(({ label, icon: Icon }) => (
          <Link
            key={label}
            href={routes.courses}
            className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-4 text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="flex size-12 items-center justify-center rounded-lg bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-on-dark">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span className="text-caption font-bold text-ink">{label}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
