import type { Metadata } from "next";
import { CirclePlay, Download, GraduationCap, Plus, Star, Users } from "lucide-react";
import { getInstructors } from "@/features/instructors/data";
import { Button } from "@/components/ui/button";
import { TrendStat } from "@/components/shared/trend-stat";
import { InstructorsTable } from "@/features/instructors/components/instructors-table";

export const metadata: Metadata = { title: "Instructors · Admin" };

export default async function AdminInstructorsPage() {
  const { items, stats } = await getInstructors();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Instructors</h1>
          <p className="mt-1 text-body text-ink-muted">
            Manage your instructors, their courses, and performance.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="lg">
            <Download className="size-5" aria-hidden="true" />
            Export
          </Button>
          <Button size="lg">
            <Plus className="size-5" aria-hidden="true" />
            Add Instructor
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TrendStat tone="primary" icon={<Users className="size-6" />} value={stats.total} label="Total Instructors" trend={stats.totalTrend} />
        <TrendStat tone="teal" icon={<GraduationCap className="size-6" />} value={stats.active} label="Active Instructors" trend={stats.activeTrend} />
        <TrendStat tone="violet" icon={<CirclePlay className="size-6" />} value={stats.totalCourses} label="Total Courses" trend={stats.coursesTrend} />
        <TrendStat tone="warm" icon={<Star className="size-6" />} value={stats.avgRating.toFixed(1)} label="Avg. Instructor Rating" />
      </div>

      <InstructorsTable instructors={items} />
    </div>
  );
}
