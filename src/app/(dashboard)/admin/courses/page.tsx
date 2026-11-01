import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  Plus,
  Users,
  CircleCheck,
  CalendarClock,
} from "lucide-react";
import { getCourses } from "@/lib/dal/courses";
import { routes } from "@/config/routes";
import { formatCount } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/shared/admin-page-header";
import { StatCard } from "@/components/shared/stat-card";
import { CoursesTable } from "@/features/courses/components/admin/courses-table";

export const metadata: Metadata = { title: "Courses · Admin" };

function Sparkline() {
  return (
    <svg viewBox="0 0 300 80" className="h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points="0,68 40,60 80,62 120,48 160,40 200,30 240,22 300,10"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function AdminCoursesPage() {
  const { items: courses } = await getCourses({ pageSize: 48 });

  const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const published = courses.filter((c) => c.status === "published").length;
  const pending = courses.filter((c) => c.status === "draft" || c.status === "scheduled").length;
  const instructors = new Set(courses.map((c) => c.instructorId)).size;

  const topCourses = [...courses].sort((a, b) => b.enrolled - a.enrolled).slice(0, 5);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Courses"
        description="Manage your courses, track performance and control content."
        breadcrumbs={[{ label: "Dashboard", href: routes.admin.dashboard }, { label: "Courses" }]}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" aria-hidden="true" />
              Export
            </Button>
            <Button asChild>
              <Link href={routes.admin.newCourse}>
                <Plus className="size-4" aria-hidden="true" />
                Add New Course
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          tone="primary"
          icon={<BookOpen className="size-5" />}
          label="Total Courses"
          value={courses.length}
          hint="All courses"
        />
        <StatCard
          tone="teal"
          icon={<Users className="size-5" />}
          label="Total Enrollments"
          value={formatCount(totalEnrollments)}
          trend="+18% vs last month"
        />
        <StatCard
          tone="violet"
          icon={<CircleCheck className="size-5" />}
          label="Published Courses"
          value={published}
          hint="Live & visible"
        />
        <StatCard
          tone="warm"
          icon={<CalendarClock className="size-5" />}
          label="Draft & Scheduled"
          value={pending}
          hint="Pending review"
        />
        <StatCard
          tone="rose"
          icon={<GraduationCap className="size-5" />}
          label="Total Instructors"
          value={instructors}
          hint="Active instructors"
        />
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <CoursesTable courses={courses} />

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-h4 text-ink">Course Performance</h2>
            <p className="text-stat mt-3 text-ink">{formatCount(totalEnrollments)}</p>
            <p className="text-caption text-success">Total Enrollments · +18%</p>
            <div className="mt-3">
              <Sparkline />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-h4 mb-4 text-ink">Top Performing Courses</h2>
            <ol className="space-y-4">
              {topCourses.map((course, i) => (
                <li key={course.id} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-pill bg-primary-50 text-caption font-bold text-primary">
                    {i + 1}
                  </span>
                  <FileText className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body-sm font-semibold text-ink">{course.title}</p>
                    <p className="text-caption text-ink-subtle">
                      {formatCount(course.enrolled)} enrollments
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
