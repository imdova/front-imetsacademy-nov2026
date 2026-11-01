import type { Metadata } from "next";
import Link from "next/link";
import { Eye, GraduationCap, Layers, Plus, Upload, Users } from "lucide-react";
import { getAdminCategories } from "@/features/categories/data";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { TrendStat } from "@/components/shared/trend-stat";
import { CategoriesTable } from "@/features/categories/components/categories-table";

export const metadata: Metadata = { title: "Course Categories · Admin" };

export default async function AdminCategoriesPage() {
  const { items, stats } = await getAdminCategories();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm">
        <Link href={routes.admin.courses} className="font-medium text-primary hover:underline">Courses</Link>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink-muted">Course Categories</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Course Categories</h1>
          <p className="mt-1 text-body text-ink-muted">
            Create, organize, and manage course categories for your platform.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="lg">
            <Upload className="size-5" aria-hidden="true" />
            Import
          </Button>
          <Button asChild size="lg">
            <Link href={routes.admin.newCategory}>
              <Plus className="size-5" aria-hidden="true" />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TrendStat tone="primary" icon={<Layers className="size-6" />} value={stats.totalCategories} label="Total Categories" trend={stats.categoriesTrend} />
        <TrendStat tone="teal" icon={<GraduationCap className="size-6" />} value={stats.courses} label="Courses" trend={stats.coursesTrend} />
        <TrendStat tone="violet" icon={<Users className="size-6" />} value={stats.enrollments} label="Enrollments" trend={stats.enrollmentsTrend} />
        <TrendStat tone="warm" icon={<Eye className="size-6" />} value={stats.categoryViews} label="Category Views" trend={stats.viewsTrend} />
      </div>

      <CategoriesTable categories={items} />
    </div>
  );
}
