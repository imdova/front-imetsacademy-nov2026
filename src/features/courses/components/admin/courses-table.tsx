"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleCheck,
  Clock,
  Copy,
  GraduationCap,
  LayoutGrid,
  List,
  MoreVertical,
  Pencil,
  Search,
  Signal,
  Users,
} from "lucide-react";
import {
  COURSE_STATUS_LABEL,
  type CategoryTint,
  type CourseStatus,
  type CourseWithRelations,
} from "@/features/courses/schemas";
import { routes } from "@/config/routes";
import { formatCount, formatPrice } from "@/lib/format";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── derived view-model ───────────────────────────────────── */
type Level = "Beginner" | "Intermediate" | "Advanced";

type CourseRow = {
  course: CourseWithRelations;
  lessons: number;
  weeks: number;
  revenue: number;
  level: Level;
  updated: number; // timestamp for sorting
};

const tintBadge: Record<CategoryTint, NonNullable<BadgeProps["variant"]>> = {
  blue: "info",
  teal: "teal",
  violet: "program",
  warm: "warm",
};

const tintGradient: Record<CategoryTint, string> = {
  blue: "from-primary-50 to-primary-100 text-primary",
  teal: "from-teal-50 to-teal-50 text-teal",
  violet: "from-violet-50 to-violet-50 text-violet",
  warm: "from-orange-50 to-orange-50 text-orange",
};

function levelFor(months: number): Level {
  if (months <= 2) return "Beginner";
  if (months === 3) return "Intermediate";
  return "Advanced";
}

const levelColor: Record<Level, string> = {
  Beginner: "text-teal",
  Intermediate: "text-primary",
  Advanced: "text-violet",
};

function toRow(course: CourseWithRelations): CourseRow {
  const lessons =
    course.curriculum.reduce((n, m) => n + m.lessons.length, 0) || course.sessions;
  return {
    course,
    lessons,
    weeks: course.durationMonths * 4,
    revenue: course.price * course.enrolled,
    level: levelFor(course.durationMonths),
    updated: new Date(course.createdAt).getTime(),
  };
}

/* ── status pill ──────────────────────────────────────────── */
const STATUS_STYLE: Record<
  CourseStatus,
  { className: string; icon: typeof CircleCheck }
> = {
  published: { className: "bg-success-50 text-success", icon: CircleCheck },
  scheduled: { className: "bg-teal-50 text-teal", icon: Clock },
  draft: { className: "bg-orange-50 text-orange", icon: Pencil },
  archived: { className: "bg-surface-alt text-ink-muted", icon: Archive },
};

function StatusPill({ status }: { status: CourseStatus }) {
  const s = STATUS_STYLE[status];
  const Icon = s.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold",
        s.className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {COURSE_STATUS_LABEL[status]}
    </span>
  );
}

function Thumb({ course }: { course: CourseWithRelations }) {
  return (
    <span
      className={cn(
        "flex h-11 w-16 shrink-0 items-center justify-center rounded-lg bg-linear-to-br",
        tintGradient[course.category.tint],
      )}
      aria-hidden="true"
    >
      <GraduationCap className="size-5" />
    </span>
  );
}

/* ── toolbar select ───────────────────────────────────────── */
function Select({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface pe-9 ps-4 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
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

/* ── sorting ──────────────────────────────────────────────── */
type SortKey = "title" | "enrolled" | "revenue" | "updated";
type SortDir = "asc" | "desc";
const SORT_OPTIONS: { value: string; label: string; key: SortKey; dir: SortDir }[] = [
  { value: "newest", label: "Newest", key: "updated", dir: "desc" },
  { value: "oldest", label: "Oldest", key: "updated", dir: "asc" },
  { value: "enrolled", label: "Most Enrolled", key: "enrolled", dir: "desc" },
  { value: "revenue", label: "Highest Revenue", key: "revenue", dir: "desc" },
  { value: "title", label: "Title A–Z", key: "title", dir: "asc" },
];

const PAGE_SIZE = 6;

export function CoursesTable({ courses }: { courses: CourseWithRelations[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortValue, setSortValue] = useState("newest");
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => courses.map(toRow), [courses]);

  const categories = useMemo(() => {
    const m = new Map<string, string>();
    courses.forEach((c) => m.set(c.category.slug, c.category.name));
    return [...m].map(([slug, name]) => ({ slug, name }));
  }, [courses]);

  const sort = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0]!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = rows.filter((r) => {
      const c = r.course;
      if (category !== "all" && c.categorySlug !== category) return false;
      if (status !== "all" && c.status !== status) return false;
      if (q && !`${c.title} ${c.code} ${c.instructor.name}`.toLowerCase().includes(q))
        return false;
      return true;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      switch (sort.key) {
        case "title":
          return a.course.title.localeCompare(b.course.title) * dir;
        case "enrolled":
          return (a.course.enrolled - b.course.enrolled) * dir;
        case "revenue":
          return (a.revenue - b.revenue) * dir;
        default:
          return (a.updated - b.updated) * dir;
      }
    });
    return out;
  }, [rows, category, status, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const pageIds = pageRows.map((r) => r.course.id);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  function toggleSelectAll() {
    setSelected((s) => {
      const next = new Set(s);
      if (allOnPageSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  }
  function toggleRow(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function setHeaderSort(key: SortKey) {
    const current = sort;
    if (current.key === key) {
      // flip direction by picking the opposite preset when available
      const opposite = SORT_OPTIONS.find((o) => o.key === key && o.dir !== current.dir);
      if (opposite) setSortValue(opposite.value);
    } else {
      const first = SORT_OPTIONS.find((o) => o.key === key);
      if (first) setSortValue(first.value);
    }
    setPage(1);
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search
            className="pointer-events-none absolute start-4 size-4 text-ink-subtle"
            aria-hidden="true"
          />
          <span className="sr-only">Search courses</span>
          <input
            type="search"
            value={search}
            onChange={(e) => resetPage(setSearch)(e.target.value)}
            placeholder="Search courses by title, category, or instructor…"
            className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Select label="Category" value={category} onChange={resetPage(setCategory)}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select label="Status" value={status} onChange={resetPage(setStatus)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </Select>
          <div className="inline-flex items-center gap-2">
            <span className="text-body-sm text-ink-subtle">Sort by:</span>
            <Select
              label="Sort by"
              value={sortValue}
              onChange={resetPage(setSortValue)}
              className="min-w-[150px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn(
                "flex size-11 items-center justify-center transition-colors",
                view === "grid" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt",
              )}
            >
              <LayoutGrid className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn(
                "flex size-11 items-center justify-center transition-colors",
                view === "list" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt",
              )}
            >
              <List className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary-50 px-4 py-2.5">
          <span className="text-body-sm font-semibold text-primary">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Archive className="size-4" aria-hidden="true" />
              Archive
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelected(new Set())}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {pageRows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="text-body font-semibold text-ink">No courses found</p>
          <p className="mt-1 text-body-sm text-ink-subtle">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : view === "grid" ? (
        <CourseGrid rows={pageRows} selected={selected} onToggle={toggleRow} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[920px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-border text-caption text-ink-subtle">
                <th className="w-10 ps-4 pe-2 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all on this page"
                    checked={allOnPageSelected}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-border-input accent-primary"
                  />
                </th>
                <SortableTh label="Course" active={sort.key === "title"} dir={sort.dir} onClick={() => setHeaderSort("title")} />
                <th className="px-4 py-3 text-start font-semibold">Category</th>
                <th className="px-4 py-3 text-start font-semibold">Level</th>
                <SortableTh label="Enrollments" active={sort.key === "enrolled"} dir={sort.dir} onClick={() => setHeaderSort("enrolled")} />
                <SortableTh label="Revenue" active={sort.key === "revenue"} dir={sort.dir} onClick={() => setHeaderSort("revenue")} />
                <th className="px-4 py-3 text-start font-semibold">Status</th>
                <SortableTh label="Last Updated" active={sort.key === "updated"} dir={sort.dir} onClick={() => setHeaderSort("updated")} />
                <th className="px-4 py-3 text-start font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r) => {
                const c = r.course;
                const checked = selected.has(c.id);
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors",
                      checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50",
                    )}
                  >
                    <td className="ps-4 pe-2 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${c.title}`}
                        checked={checked}
                        onChange={() => toggleRow(c.id)}
                        className="size-4 rounded border-border-input accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb course={c} />
                        <div className="min-w-0">
                          <Link
                            href={routes.admin.courseDetail(c.slug)}
                            className="truncate font-bold text-ink hover:text-primary"
                          >
                            {c.title}
                          </Link>
                          <p className="text-caption text-ink-subtle">
                            {r.lessons} Lessons · {r.weeks} Weeks
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={tintBadge[c.category.tint]}>{c.category.name}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-ink">
                        <Signal className={cn("size-4", levelColor[r.level])} aria-hidden="true" />
                        {r.level}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-ink">
                        <Users className="size-4 text-ink-subtle" aria-hidden="true" />
                        {formatCount(c.enrolled)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-ink">{formatPrice(r.revenue)}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={c.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">
                      {formatUpdated(c.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <RowActions slug={c.slug} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} courses
        </p>
        <div className="flex items-center gap-1">
          <PagerBtn label="First page" disabled={safePage === 1} onClick={() => setPage(1)}>
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </PagerBtn>
          <PagerBtn
            label="Previous page"
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </PagerBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === safePage ? "page" : undefined}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold",
                p === safePage
                  ? "bg-primary text-on-dark"
                  : "border border-border-input text-ink-muted hover:border-primary hover:text-primary",
              )}
            >
              {p}
            </button>
          ))}
          <PagerBtn
            label="Next page"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </PagerBtn>
          <PagerBtn
            label="Last page"
            disabled={safePage === totalPages}
            onClick={() => setPage(totalPages)}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </PagerBtn>
        </div>
      </div>
    </div>
  );
}

function SortableTh({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  return (
    <th className="px-4 py-3 text-start font-semibold">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 hover:text-ink",
          active && "text-ink",
        )}
      >
        {label}
        {active ? (
          <ChevronDown
            className={cn("size-3.5 transition-transform", dir === "asc" && "rotate-180")}
            aria-hidden="true"
          />
        ) : (
          <ChevronsUpDown className="size-3.5 opacity-50" aria-hidden="true" />
        )}
      </button>
    </th>
  );
}

function PagerBtn({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}

const iconAction =
  "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function RowActions({ slug }: { slug: string }) {
  return (
    <div className="flex items-center gap-0.5">
      <Link href={routes.admin.courseDetail(slug)} aria-label="Edit course" className={iconAction}>
        <Pencil className="size-4" aria-hidden="true" />
      </Link>
      <button type="button" aria-label="Duplicate course" className={iconAction}>
        <Copy className="size-4" aria-hidden="true" />
      </button>
      <button type="button" aria-label="More actions" className={iconAction}>
        <MoreVertical className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function CourseGrid({
  rows,
  selected,
  onToggle,
}: {
  rows: CourseRow[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((r) => {
        const c = r.course;
        const checked = selected.has(c.id);
        return (
          <div
            key={c.id}
            className={cn(
              "flex flex-col rounded-xl border bg-surface p-4 transition-colors",
              checked ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40",
            )}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                aria-label={`Select ${c.title}`}
                checked={checked}
                onChange={() => onToggle(c.id)}
                className="mt-1 size-4 rounded border-border-input accent-primary"
              />
              <Thumb course={c} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{c.title}</p>
                <p className="text-caption text-ink-subtle">
                  {r.lessons} Lessons · {r.weeks} Weeks
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant={tintBadge[c.category.tint]}>{c.category.name}</Badge>
              <StatusPill status={c.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-body-sm">
              <div>
                <p className="text-caption text-ink-subtle">Enrollments</p>
                <p className="font-semibold text-ink">{formatCount(c.enrolled)}</p>
              </div>
              <div>
                <p className="text-caption text-ink-subtle">Revenue</p>
                <p className="font-bold text-ink">{formatPrice(r.revenue)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="inline-flex items-center gap-1.5 text-caption font-medium text-ink">
                <Signal className={cn("size-4", levelColor[r.level])} aria-hidden="true" />
                {r.level}
              </span>
              <RowActions slug={c.slug} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
