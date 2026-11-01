import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseGridSkeleton } from "@/features/courses";

export default function CoursesLoading() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-primary-50/60 to-surface">
        <Container className="space-y-4 py-12 md:py-16">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-full max-w-xl" />
          <Skeleton className="h-6 w-full max-w-lg" />
          <Skeleton className="h-14 w-full max-w-2xl rounded-lg" />
        </Container>
      </section>
      <Container as="section" className="space-y-8 py-12 md:py-16">
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-32 rounded-pill" />
          ))}
        </div>
        <CourseGridSkeleton count={6} columns={3} />
      </Container>
    </>
  );
}
