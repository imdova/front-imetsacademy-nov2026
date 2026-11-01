"use client";

import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronDown, Search, SearchX } from "lucide-react";
import {
  COURSE_STATUS_LABEL,
  type CourseStatus,
  type CourseWithRelations,
} from "@/features/courses/schemas";
import { DataTable } from "@/components/shared/data-table/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { courseColumns } from "@/features/courses/components/admin/course-columns";

const TABS: ("all" | CourseStatus)[] = ["all", "published", "scheduled", "draft", "archived"];

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative inline-flex min-w-[180px] items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-md border border-border-input bg-surface pe-9 ps-4 text-body-sm text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-3 size-4 text-ink-subtle"
        aria-hidden="true"
      />
    </label>
  );
}

export function CoursesTable({ courses }: { courses: CourseWithRelations[] }) {
  const [tab, setTab] = useState<"all" | CourseStatus>("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [instructor, setInstructor] = useState("all");
  const [sorting, setSorting] = useState<SortingState>([]);

  const categories = useMemo(() => {
    const m = new Map<string, string>();
    courses.forEach((c) => m.set(c.category.slug, c.category.name));
    return [...m].map(([slug, name]) => ({ slug, name }));
  }, [courses]);

  const instructors = useMemo(() => {
    const m = new Map<string, string>();
    courses.forEach((c) => m.set(c.instructor.id, c.instructor.name));
    return [...m].map(([id, name]) => ({ id, name }));
  }, [courses]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: courses.length };
    (["published", "scheduled", "draft", "archived"] as CourseStatus[]).forEach((s) => {
      c[s] = courses.filter((x) => x.status === s).length;
    });
    return c;
  }, [courses]);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (tab === "all" || c.status === tab) &&
          (category === "all" || c.categorySlug === category) &&
          (instructor === "all" || c.instructorId === instructor) &&
          (search.trim() === "" ||
            `${c.title} ${c.code}`.toLowerCase().includes(search.toLowerCase())),
      ),
    [courses, tab, category, instructor, search],
  );

  // TanStack Table manages its own memoization internally; the compiler can't
  // see that, so this known-safe interaction is opted out of the rule.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filtered,
    columns: courseColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const reset = () => {
    setTab("all");
    setSearch("");
    setCategory("all");
    setInstructor("all");
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface p-4 md:p-5">
      {/* status tabs */}
      <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-6 border-b border-border">
        {TABS.map((t) => {
          const selected = tab === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t)}
              className={cn(
                "relative h-11 text-label transition-colors",
                selected
                  ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-t-[3px] after:bg-primary"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {t === "all" ? "All Courses" : COURSE_STATUS_LABEL[t]} ({counts[t] ?? 0})
            </button>
          );
        })}
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search courses</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses…"
            className="h-11 w-full rounded-md border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>
        <FilterSelect label="Category" value={category} onChange={setCategory}>
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect label="Instructor" value={instructor} onChange={setInstructor}>
          <option value="all">All Instructors</option>
          {instructors.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </FilterSelect>
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>

      <DataTable
        table={table}
        emptyState={
          <EmptyState
            icon={<SearchX className="size-6" />}
            title="No courses found"
            description="Try adjusting your filters or search."
            action={
              <Button variant="outline" onClick={reset}>
                Clear filters
              </Button>
            }
          />
        }
      />
    </div>
  );
}
