import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, GraduationCap } from "lucide-react";
import {
  getEnrollments,
  getLearningProgress,
  getRecommended,
} from "@/features/student/data";
import { routes } from "@/config/routes";
import { CoursesTabs } from "@/features/student/components/courses-tabs";
import { LearningProgressRing } from "@/features/student/components/learning-progress-ring";
import { LearningCalendar } from "@/features/student/components/learning-calendar";
import { RecommendedCard } from "@/features/student/components/recommended-card";

export const metadata: Metadata = { title: "My Courses" };

export default async function StudentCoursesPage() {
  const [enrollments, progress, recommended] = await Promise.all([
    getEnrollments(),
    getLearningProgress(),
    getRecommended(),
  ]);

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-50 to-surface p-6 md:p-8">
        <GraduationCap
          className="absolute end-6 bottom-0 hidden size-28 text-primary/10 sm:block"
          aria-hidden="true"
        />
        <h1 className="text-h1 text-ink">My Courses</h1>
        <p className="text-body mt-1 text-ink-muted">
          Continue your learning journey and track your progress.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <CoursesTabs enrollments={enrollments} />

          <section>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-h2 text-ink">Recommended for You</h2>
              <Link
                href={routes.courses}
                className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary"
              >
                View All
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((item) => (
                <RecommendedCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <LearningProgressRing progress={progress} />
          <LearningCalendar />
          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent-50 text-accent-strong">
              <Flame className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-h3 text-ink">5 Days</p>
              <p className="text-body-sm text-ink-muted">Learning Streak</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
