import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { getCategories, getCourses } from "@/lib/dal/courses";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FilterChips, type FilterChipItem } from "@/components/shared/filter-chips";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildCoursesQuery,
  courseSortSchema,
  CourseGrid,
  CourseGridSkeleton,
  CourseSort,
} from "@/features/courses";
import { ExploreHero } from "@/features/courses/components/explore-hero";

export const metadata: Metadata = {
  title: "Explore Courses",
  description:
    "Browse professional diplomas and certification prep in management, leadership, strategy and digital transformation.",
};

const PAGE_SIZE = 6;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function CoursesResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  const sort = first(sp.sort);
  const page = first(sp.page);

  const [categories, data] = await Promise.all([
    getCategories(),
    getCourses({ q, category, sort, page, pageSize: PAGE_SIZE }),
  ]);

  const activeSort = courseSortSchema.catch("popular").parse(sort);
  const chips: FilterChipItem[] = [
    {
      label: "All Courses",
      href: buildCoursesQuery({ q, sort }),
      active: !category,
    },
    ...categories.map((c) => ({
      label: c.name,
      href: buildCoursesQuery({ q, sort, category: c.slug }),
      active: category === c.slug,
    })),
  ];

  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
    <div className="space-y-8">
      <FilterChips items={chips} ariaLabel="Filter by category" />

      <SectionHeading
        title="Explore our courses"
        description="Find the right course for your next step."
        action={<CourseSort sort={activeSort} />}
      />

      {data.items.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="No courses found"
          description="Try a different category or clear your search to see all courses."
          action={
            <Button asChild variant="outline">
              <a href={buildCoursesQuery({})}>Clear filters</a>
            </Button>
          }
        />
      ) : (
        <>
          <p className="text-body-sm text-ink-subtle">
            Showing {data.items.length} of {data.total} courses
          </p>
          <CourseGrid courses={data.items} columns={3} />
          <Pagination
            page={data.page}
            totalPages={totalPages}
            hrefFor={(p) => buildCoursesQuery({ q, category, sort, page: p })}
          />
        </>
      )}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-32 rounded-pill" />
        ))}
      </div>
      <div className="flex items-end justify-between gap-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-10 w-40" />
      </div>
      <CourseGridSkeleton count={6} columns={3} />
    </div>
  );
}

export default function CoursesPage({ searchParams }: PageProps<"/courses">) {
  return (
    <>
      <ExploreHero />
      <Container as="section" className="py-12 md:py-16">
        <Suspense fallback={<ResultsSkeleton />}>
          <CoursesResults searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
