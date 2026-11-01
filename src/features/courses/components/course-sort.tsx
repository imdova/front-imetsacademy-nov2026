"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { COURSE_SORT_OPTIONS, type CourseSort as CourseSortValue } from "@/features/courses/schemas";
import { buildCoursesQuery } from "@/features/courses/url";

/** Sort dropdown that writes the choice to the URL (resets to page 1). */
export function CourseSort({ sort }: { sort: CourseSortValue }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    router.push(
      buildCoursesQuery({
        q: searchParams.get("q") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        sort: event.target.value,
      }),
    );
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort courses</span>
      <select
        value={sort}
        onChange={handleChange}
        className="h-10 cursor-pointer appearance-none rounded-md border border-border-input bg-surface pe-9 ps-4 text-body-sm text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
      >
        {COURSE_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
        aria-hidden="true"
      />
    </label>
  );
}
