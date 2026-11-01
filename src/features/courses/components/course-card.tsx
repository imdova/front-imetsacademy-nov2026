import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/shared/avatar";
import { StarRating } from "@/components/shared/star-rating";
import { PROGRAM_TYPE_LABEL, type CourseWithRelations } from "@/features/courses/schemas";
import { CourseMeta } from "@/features/courses/components/course-meta";
import { PriceTag } from "@/features/courses/components/price-tag";

/** CourseCard — listing/featured card. Always shows price + "View course". */
export function CourseCard({ course }: { course: CourseWithRelations }) {
  const href = routes.course(course.slug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-[148px] overflow-hidden bg-navy-800">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <GraduationCap
          className="absolute end-3 bottom-1 size-20 text-white/10"
          aria-hidden="true"
        />
        <Badge variant="program" className="absolute start-3 top-3">
          {PROGRAM_TYPE_LABEL[course.programType]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-[20px] leading-[26px] font-bold text-ink">
          <Link
            href={href}
            className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-body-sm text-ink-muted">{course.summary}</p>

        <div className="mt-2 flex items-center gap-2">
          <Avatar initials={course.instructor.initials} />
          <span className="text-[13px] font-semibold text-ink">{course.instructor.name}</span>
          <StarRating rating={course.rating} reviews={course.reviews} className="ms-auto text-sm" />
        </div>

        <CourseMeta
          durationMonths={course.durationMonths}
          learningMode={course.learningMode}
          sessions={course.sessions}
          className="mt-1"
        />

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <PriceTag price={course.price} oldPrice={course.oldPrice} />
          <Button asChild size="sm">
            <Link href={href}>
              View course
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
