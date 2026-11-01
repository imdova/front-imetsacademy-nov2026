import Link from "next/link";
import { BarChart3, Clock, EllipsisVertical, GraduationCap, Layers, Play } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import type { Enrollment } from "@/features/student/data";
import { cn } from "@/lib/utils";

const ctaLabel: Record<Enrollment["status"], string> = {
  "in-progress": "Continue",
  completed: "Review",
  "not-started": "Start",
};

export function CourseProgressCard({ enrollment }: { enrollment: Enrollment }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row">
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-navy-800 sm:w-44">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <GraduationCap className="absolute end-2 bottom-1 size-14 text-white/10" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="flex size-10 items-center justify-center rounded-full bg-surface/90">
            <Play className="ms-0.5 size-5 fill-primary text-primary" />
          </span>
        </span>
        <span className="absolute start-2 bottom-2 inline-flex items-center gap-1 rounded-pill bg-black/40 px-2 py-0.5 text-[11px] font-semibold text-on-dark">
          {enrollment.lessons} Lessons
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-h4 text-ink">{enrollment.title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm">
              <Link href={routes.courses}>
                <Play className="size-4" aria-hidden="true" />
                {ctaLabel[enrollment.status]}
              </Link>
            </Button>
            <button
              type="button"
              aria-label="Course options"
              className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt"
            >
              <EllipsisVertical className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-4" aria-hidden="true" />
            {enrollment.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BarChart3 className="size-4" aria-hidden="true" />
            {enrollment.level}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            {enrollment.weeks} Weeks
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="h-2 flex-1 overflow-hidden rounded-pill bg-surface-alt">
            <span
              className={cn(
                "block h-full rounded-pill",
                enrollment.status === "completed" ? "bg-success" : "bg-primary",
              )}
              style={{ width: `${enrollment.progress}%` }}
            />
          </span>
          <span className="shrink-0 text-caption font-semibold text-ink">{enrollment.progress}%</span>
        </div>

        {enrollment.nextModule && (
          <p className="text-caption mt-2 text-ink-muted">
            <span className="font-semibold text-ink">Next:</span> {enrollment.nextModule}
          </p>
        )}
      </div>
    </article>
  );
}
