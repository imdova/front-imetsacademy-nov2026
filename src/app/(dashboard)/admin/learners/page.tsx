import type { Metadata } from "next";
import { Download, GraduationCap, Plus, UserPlus, Users, CircleCheck } from "lucide-react";
import { getLearners } from "@/features/learners/data";
import { Button } from "@/components/ui/button";
import { TrendStat } from "@/components/shared/trend-stat";
import { LearnersTable } from "@/features/learners/components/learners-table";

export const metadata: Metadata = { title: "Students · Admin" };

export default async function AdminStudentsPage() {
  const { items, stats } = await getLearners();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Students</h1>
          <p className="mt-1 text-body text-ink-muted">
            Manage your students, track their progress, and view enrollments.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="lg">
            <Download className="size-5" aria-hidden="true" />
            Export
          </Button>
          <Button size="lg">
            <Plus className="size-5" aria-hidden="true" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TrendStat tone="primary" icon={<Users className="size-6" />} value={stats.total} label="Total Students" trend={stats.totalTrend} />
        <TrendStat tone="teal" icon={<GraduationCap className="size-6" />} value={stats.active} label="Active Students" trend={stats.activeTrend} />
        <TrendStat tone="violet" icon={<CircleCheck className="size-6" />} value={stats.completedCourses} label="Completed Courses" trend={stats.completedTrend} />
        <TrendStat tone="rose" icon={<UserPlus className="size-6" />} value={stats.newThisMonth} label="New This Month" trend={stats.newTrend} />
      </div>

      <LearnersTable learners={items} />
    </div>
  );
}
