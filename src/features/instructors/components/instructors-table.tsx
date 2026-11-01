"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleCheck,
  CircleX,
  Clock,
  Eye,
  LayoutGrid,
  Layers,
  List,
  MoreVertical,
  Pencil,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { formatCount, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  AdminInstructor,
  ExpertiseTint,
  InstructorStatus,
} from "@/features/instructors/data";

const tintBadge: Record<ExpertiseTint, NonNullable<BadgeProps["variant"]>> = {
  violet: "program",
  blue: "info",
  teal: "teal",
  warm: "warm",
  rose: "rose",
};

const STATUS: Record<InstructorStatus, { className: string; icon: typeof CircleCheck; label: string }> = {
  active: { className: "bg-success-50 text-success", icon: CircleCheck, label: "Active" },
  pending: { className: "bg-orange-50 text-orange", icon: Clock, label: "Pending" },
  inactive: { className: "bg-surface-alt text-ink-muted", icon: CircleX, label: "Inactive" },
};

function StatusPill({ status }: { status: InstructorStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", s.className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {s.label}
    </span>
  );
}

type Tab = "all" | InstructorStatus;
type SortKey = "courses" | "enrollments" | "rating" | "revenue" | "joined";
type SortDir = "asc" | "desc";
const PAGE_SIZE = 8;

const SORT_OPTIONS: { value: string; label: string; key: SortKey; dir: SortDir }[] = [
  { value: "newest", label: "Newest", key: "joined", dir: "desc" },
  { value: "oldest", label: "Oldest", key: "joined", dir: "asc" },
  { value: "courses", label: "Most Courses", key: "courses", dir: "desc" },
  { value: "enrollments", label: "Most Enrollments", key: "enrollments", dir: "desc" },
  { value: "rating", label: "Highest Rating", key: "rating", dir: "desc" },
  { value: "revenue", label: "Highest Revenue", key: "revenue", dir: "desc" },
];

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface pe-9 ps-4 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </label>
  );
}

export function InstructorsTable({ instructors }: { instructors: AdminInstructor[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortValue, setSortValue] = useState("newest");
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const expertises = useMemo(() => [...new Set(instructors.map((i) => i.expertise))].sort(), [instructors]);
  const counts = useMemo(
    () => ({
      all: instructors.length,
      active: instructors.filter((i) => i.status === "active").length,
      pending: instructors.filter((i) => i.status === "pending").length,
      inactive: instructors.filter((i) => i.status === "inactive").length,
    }),
    [instructors],
  );

  const sort = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0]!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = instructors.filter((i) => {
      if (tab !== "all" && i.status !== tab) return false;
      if (expertise !== "all" && i.expertise !== expertise) return false;
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (q && !`${i.name} ${i.email} ${i.expertise}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      switch (sort.key) {
        case "courses":
          return (a.courses - b.courses) * dir;
        case "enrollments":
          return (a.enrollments - b.enrollments) * dir;
        case "rating":
          return (a.rating - b.rating) * dir;
        case "revenue":
          return (a.revenue - b.revenue) * dir;
        default:
          return (new Date(a.joined).getTime() - new Date(b.joined).getTime()) * dir;
      }
    });
    return out;
  }, [instructors, tab, expertise, statusFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((i) => i.id);
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const toggleAll = () =>
    setSelected((s) => {
      const next = new Set(s);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  const toggleRow = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  function headerSort(key: SortKey) {
    if (sort.key === key) {
      const opp = SORT_OPTIONS.find((o) => o.key === key && o.dir !== sort.dir);
      if (opp) setSortValue(opp.value);
    } else {
      const first = SORT_OPTIONS.find((o) => o.key === key);
      if (first) setSortValue(first.value);
    }
    setPage(1);
  }
  const onFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  const TABS: { key: Tab; label: string; icon: typeof CircleCheck | null }[] = [
    { key: "all", label: `All Instructors (${counts.all})`, icon: Users },
    { key: "active", label: `Active (${counts.active})`, icon: CircleCheck },
    { key: "pending", label: `Pending (${counts.pending})`, icon: Clock },
    { key: "inactive", label: `Inactive (${counts.inactive})`, icon: CircleX },
  ];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onFilter(setTab)(t.key)}
            className={cn(
              "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors",
              tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {t.icon && <t.icon className="size-4" aria-hidden="true" />}
            {t.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search instructors</span>
          <input
            type="search"
            value={search}
            onChange={(e) => onFilter(setSearch)(e.target.value)}
            placeholder="Search by name, email, or expertise…"
            className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Select label="Expertise" value={expertise} onChange={onFilter(setExpertise)}>
            <option value="all">All Expertise</option>
            {expertises.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </Select>
          <Select label="Status" value={statusFilter} onChange={onFilter(setStatusFilter)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </Select>
          <div className="inline-flex items-center gap-2">
            <span className="text-body-sm text-ink-subtle">Sort by:</span>
            <Select label="Sort by" value={sortValue} onChange={onFilter(setSortValue)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </div>
          <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={cn("flex size-11 items-center justify-center transition-colors", view === "grid" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}>
              <LayoutGrid className="size-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={cn("flex size-11 items-center justify-center transition-colors", view === "list" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}>
              <List className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary-50 px-4 py-2.5">
          <span className="text-body-sm font-semibold text-primary">{selected.size} selected</span>
          <button type="button" onClick={() => setSelected(new Set())} className="text-body-sm font-semibold text-primary hover:underline">Clear</button>
        </div>
      )}

      {view === "grid" ? (
        <InstructorGrid rows={pageRows} selected={selected} onToggle={toggleRow} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[1040px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-border text-caption text-ink-subtle">
                <th className="w-10 ps-4 pe-2 py-3">
                  <input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} className="size-4 rounded border-border-input accent-primary" />
                </th>
                <th className="px-4 py-3 text-start font-semibold">Instructor</th>
                <th className="px-4 py-3 text-start font-semibold">Expertise</th>
                <SortTh label="Courses" active={sort.key === "courses"} dir={sort.dir} onClick={() => headerSort("courses")} />
                <SortTh label="Enrollments" active={sort.key === "enrollments"} dir={sort.dir} onClick={() => headerSort("enrollments")} />
                <SortTh label="Rating" active={sort.key === "rating"} dir={sort.dir} onClick={() => headerSort("rating")} />
                <SortTh label="Revenue" active={sort.key === "revenue"} dir={sort.dir} onClick={() => headerSort("revenue")} />
                <th className="px-4 py-3 text-start font-semibold">Status</th>
                <SortTh label="Joined" active={sort.key === "joined"} dir={sort.dir} onClick={() => headerSort("joined")} />
                <th className="px-4 py-3 text-start font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((ins) => {
                const checked = selected.has(ins.id);
                return (
                  <tr key={ins.id} className={cn("border-b border-border last:border-0 transition-colors", checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50")}>
                    <td className="ps-4 pe-2 py-3">
                      <input type="checkbox" aria-label={`Select ${ins.name}`} checked={checked} onChange={() => toggleRow(ins.id)} className="size-4 rounded border-border-input accent-primary" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={ins.initials} size="md" />
                        <div className="min-w-0">
                          <p className="truncate font-bold text-ink">{ins.name}</p>
                          <p className="truncate text-caption text-ink-subtle">{ins.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={tintBadge[ins.expertiseTint]}>{ins.expertise}</Badge></td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                        <Layers className="size-4 text-ink-subtle" aria-hidden="true" />
                        {ins.courses}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                        <Users className="size-4 text-ink-subtle" aria-hidden="true" />
                        {formatCount(ins.enrollments)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-ink">
                        <Star className="size-4 fill-orange text-orange" aria-hidden="true" />
                        {ins.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-ink">{formatPrice(ins.revenue)}</td>
                    <td className="px-4 py-3"><StatusPill status={ins.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{formatJoined(ins.joined)}</td>
                    <td className="px-4 py-3"><RowActions /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} instructors
        </p>
        <div className="flex items-center gap-1">
          <PagerBtn label="First" disabled={safePage === 1} onClick={() => setPage(1)}><ChevronsLeft className="size-4" aria-hidden="true" /></PagerBtn>
          <PagerBtn label="Previous" disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft className="size-4" aria-hidden="true" /></PagerBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" onClick={() => setPage(p)} aria-current={p === safePage ? "page" : undefined} className={cn("inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold", p === safePage ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary hover:text-primary")}>{p}</button>
          ))}
          <PagerBtn label="Next" disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}><ChevronRight className="size-4" aria-hidden="true" /></PagerBtn>
          <PagerBtn label="Last" disabled={safePage === totalPages} onClick={() => setPage(totalPages)}><ChevronsRight className="size-4" aria-hidden="true" /></PagerBtn>
        </div>
      </div>
    </div>
  );
}

function SortTh({ label, active, dir, onClick }: { label: string; active: boolean; dir: SortDir; onClick: () => void }) {
  return (
    <th className="px-4 py-3 text-start font-semibold">
      <button type="button" onClick={onClick} className={cn("inline-flex items-center gap-1 hover:text-ink", active && "text-ink")}>
        {label}
        {active ? (
          <ChevronDown className={cn("size-3.5 transition-transform", dir === "asc" && "rotate-180")} aria-hidden="true" />
        ) : (
          <ChevronsUpDown className="size-3.5 opacity-50" aria-hidden="true" />
        )}
      </button>
    </th>
  );
}

function PagerBtn({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}

const iconAction = "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function RowActions() {
  return (
    <div className="flex items-center gap-0.5">
      <button type="button" aria-label="View instructor" className={iconAction}><Eye className="size-4" aria-hidden="true" /></button>
      <button type="button" aria-label="Edit instructor" className={iconAction}><Pencil className="size-4" aria-hidden="true" /></button>
      <button type="button" aria-label="More actions" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
    </div>
  );
}

function formatJoined(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function InstructorGrid({ rows, selected, onToggle }: { rows: AdminInstructor[]; selected: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((ins) => {
        const checked = selected.has(ins.id);
        return (
          <div key={ins.id} className={cn("rounded-xl border bg-surface p-5 transition-colors", checked ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40")}>
            <div className="flex items-start gap-3">
              <input type="checkbox" aria-label={`Select ${ins.name}`} checked={checked} onChange={() => onToggle(ins.id)} className="mt-1 size-4 rounded border-border-input accent-primary" />
              <Avatar initials={ins.initials} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{ins.name}</p>
                <p className="truncate text-caption text-ink-subtle">{ins.email}</p>
                <div className="mt-1.5"><Badge variant={tintBadge[ins.expertiseTint]}>{ins.expertise}</Badge></div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
              <div>
                <p className="font-bold text-ink">{ins.courses}</p>
                <p className="text-caption text-ink-subtle">Courses</p>
              </div>
              <div>
                <p className="font-bold text-ink">{formatCount(ins.enrollments)}</p>
                <p className="text-caption text-ink-subtle">Learners</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-1 font-bold text-ink">
                  <Star className="size-3.5 fill-orange text-orange" aria-hidden="true" />
                  {ins.rating.toFixed(1)}
                </p>
                <p className="text-caption text-ink-subtle">Rating</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <StatusPill status={ins.status} />
              <span className="font-bold text-ink">{formatPrice(ins.revenue)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
