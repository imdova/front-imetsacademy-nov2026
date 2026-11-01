import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Copy, Eye, MoreVertical, Pencil } from "lucide-react";
import { getCourseBySlug } from "@/lib/dal/courses";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { CourseDetailView } from "@/features/courses/components/admin/course-detail-view";

export const metadata: Metadata = { title: "Course Details · Admin" };

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let course;
  try {
    course = await getCourseBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm">
        <Link href={routes.admin.courses} className="font-medium text-primary hover:underline">
          Courses
        </Link>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink-muted">Course Details</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href={routes.admin.courses}
            aria-label="Back to courses"
            className="mt-1 inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-h1 text-ink">Course Details</h1>
            <p className="mt-1 text-body text-ink-muted">
              Manage course content, settings, pricing, and performance.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <Link href={routes.course(course.slug)}>
              <Eye className="size-4" aria-hidden="true" />
              Preview
            </Link>
          </Button>
          <Button variant="outline">
            <Copy className="size-4" aria-hidden="true" />
            Duplicate
          </Button>
          <Button asChild>
            <Link href={routes.admin.newCourse}>
              <Pencil className="size-4" aria-hidden="true" />
              Edit Course
            </Link>
          </Button>
          <button
            type="button"
            aria-label="More actions"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary hover:text-primary"
          >
            <MoreVertical className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <CourseDetailView course={course} />
    </div>
  );
}
