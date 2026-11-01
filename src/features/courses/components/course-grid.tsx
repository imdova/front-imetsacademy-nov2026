import type { CourseWithRelations } from "@/features/courses/schemas";
import { CourseCard } from "@/features/courses/components/course-card";
import { cn } from "@/lib/utils";

/** Responsive course grid — 3 columns (Explore) or 4 (Home featured). */
export function CourseGrid({
  courses,
  columns = 3,
  className,
}: {
  courses: CourseWithRelations[];
  columns?: 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
