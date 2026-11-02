import Link from "next/link";
import { ArrowRight, GraduationCap, Heart } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/shared/star-rating";
import { CourseMeta } from "@/features/courses/components/course-meta";
import { PROGRAM_TYPE_LABEL, type CourseWithRelations } from "@/features/courses/schemas";
import { cn } from "@/lib/utils";

const headerGradient: Record<string, string> = {
  blue: "from-primary to-navy-900",
  teal: "from-teal to-navy-900",
  violet: "from-violet to-navy-900",
  warm: "from-orange to-navy-900",
};

/** HomeCourseCard — featured-course card matching the marketing design. */
export function HomeCourseCard({ course }: { course: CourseWithRelations }) {
  const href = routes.course(course.slug);
  const grad = headerGradient[course.category.tint] ?? headerGradient.blue;
  const isDiploma = course.programType === "diploma";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={cn("relative h-40 bg-gradient-to-br", grad)}>
        <GraduationCap className="absolute end-3 bottom-2 size-20 text-white/10" aria-hidden="true" />
        <span
          className={cn(
            "absolute start-3 top-3 inline-flex h-[26px] items-center rounded-pill px-3 text-xs font-semibold",
            isDiploma ? "bg-primary text-on-dark" : "bg-accent text-ink",
          )}
        >
          {PROGRAM_TYPE_LABEL[course.programType]}
        </span>
        <span className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-pill bg-surface/90 text-ink-muted">
          <Heart className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-h4 font-display text-ink">
          <Link
            href={href}
            className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-body-sm text-ink-muted">{course.summary}</p>

        <CourseMeta
          durationMonths={course.durationMonths}
          learningMode={course.learningMode}
          sessions={course.sessions}
          className="mt-1"
        />

        <StarRating rating={course.rating} reviews={course.reviews} className="text-sm" />

        <div className="mt-auto pt-2">
          <Button asChild block>
            <Link href={href}>
              View Details
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
