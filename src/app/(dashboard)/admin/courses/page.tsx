import type { Metadata } from "next";
import Link from "next/link";
import { Archive, CirclePlay, Layers, Plus, SquarePen } from "lucide-react";
import { getAdminCourses } from "@/lib/dal/courses";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { CoursesTable } from "@/features/courses/components/admin/courses-table";

export const metadata: Metadata = { title: "Courses · Admin" };

export default async function AdminCoursesPage() {
  const { items: courses } = await getAdminCourses({ pageSize: 48 });

  const published = courses.filter((c) => c.status === "published").length;
  const drafts = courses.filter((c) => c.status === "draft" || c.status === "scheduled").length;
  const archived = courses.filter((c) => c.status === "archived").length;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Courses</h1>
          <p className="mt-1 text-body text-ink-muted">
            Manage your courses, content, and learners.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href={routes.admin.newCourse}>
            <Plus className="size-5" aria-hidden="true" />
            Add New Course
          </Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          tone="primary"
          icon={<Layers className="size-5" />}
          label="Total Courses"
          value={courses.length}
        />
        <StatCard
          tone="teal"
          icon={<CirclePlay className="size-5" />}
          label="Published"
          value={published}
        />
        <StatCard
          tone="warm"
          icon={<SquarePen className="size-5" />}
          label="Drafts"
          value={drafts}
        />
        <StatCard
          tone="rose"
          icon={<Archive className="size-5" />}
          label="Archived"
          value={archived}
        />
      </div>

      {/* Table */}
      <CoursesTable courses={courses} />
    </div>
  );
}
