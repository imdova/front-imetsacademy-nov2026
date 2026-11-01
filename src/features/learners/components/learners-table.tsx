"use client";

import { useMemo, useState } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Eye,
  LayoutGrid,
  List,
  MoreVertical,
  Pencil,
  Search,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";
import type { Learner, LearnerStatus } from "@/features/learners/data";

const STATUS_STYLE: Record<LearnerStatus, { className: string; icon: typeof CircleCheck; label: string }> = {
  active: { className: "bg-success-50 text-success", icon: CircleCheck, label: "Active" },
  completed: { className: "bg-primary-50 text-primary", icon: Award, label: "Completed" },
  inactive: { className: "bg-orange-50 text-orange", icon: CircleAlert, label: "Inactive" },
};

function StatusPill({ status }: { status: LearnerStatus }) {
  const s = STATUS_STYLE[status];
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", s.className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {s.label}
    </span>
  );
}

function activityRank(s: string): number {
  const m = /(\d+)\s*(hour|day|week|minute)/.exec(s);
  if (!m) return 1e9;
  const n = Number(m[1]);
  const unit = m[2];
  const mult = unit === "minute" ? 1 / 60 : unit === "hour" ? 1 : unit === "day" ? 24 : 24 * 7;
  return n * mult;
}

function formatJoined(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type SortKey = "enrollments" | "joined" | "activity";
type SortDir = "asc" | "desc";
const PAGE_SIZE = 8;

function Select({
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

export function LearnersTable({ learners }: { learners: Learner[] }) {
  const [search, setSearch] = useState("");
  const [enrollFilter, setEnrollFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");
  const [sortKey, setSortKey] = useState<SortKey>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = learners.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (enrollFilter === "1-3" && !(l.enrollments <= 3)) return false;
      if (enrollFilter === "4-6" && !(l.enrollments >= 4 && l.enrollments <= 6)) return false;
      if (enrollFilter === "7+" && !(l.enrollments >= 7)) return false;
      if (q && !`${l.name} ${l.email} ${l.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      if (sortKey === "enrollments") return (a.enrollments - b.enrollments) * dir;
      if (sortKey === "activity") return (activityRank(a.lastActivity) - activityRank(b.lastActivity)) * dir;
      return (new Date(a.joined).getTime() - new Date(b.joined).getTime()) * dir;
    });
    return out;
  }, [learners, search, enrollFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((l) => l.id);
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  function toggleAll() {
    setSelected((s) => {
      const next = new Set(s);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
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
  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }
  function onFilter<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search students</span>
          <input
            type="search"
            value={search}
            onChange={(e) => onFilter(setSearch)(e.target.value)}
            placeholder="Search students…"
            className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Select label="Enrollments" value={enrollFilter} onChange={onFilter(setEnrollFilter)}>
            <option value="all">All Enrollments</option>
            <option value="1-3">1–3 Courses</option>
            <option value="4-6">4–6 Courses</option>
            <option value="7+">7+ Courses</option>
          </Select>
          <Select label="Status" value={statusFilter} onChange={onFilter(setStatusFilter)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="inactive">Inactive</option>
          </Select>
          <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn("flex size-11 items-center justify-center transition-colors", view === "grid" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}
            >
              <LayoutGrid className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn("flex size-11 items-center justify-center transition-colors", view === "list" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}
            >
              <List className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary-50 px-4 py-2.5">
          <span className="text-body-sm font-semibold text-primary">{selected.size} selected</span>
          <button type="button" onClick={() => setSelected(new Set())} className="text-body-sm font-semibold text-primary hover:underline">
            Clear
          </button>
        </div>
      )}

      {view === "grid" ? (
        <LearnerGrid rows={pageRows} selected={selected} onToggle={toggleRow} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[980px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-border text-caption text-ink-subtle">
                <th className="w-10 ps-4 pe-2 py-3">
                  <input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} className="size-4 rounded border-border-input accent-primary" />
                </th>
                <th className="px-4 py-3 text-start font-semibold">Student</th>
                <th className="px-4 py-3 text-start font-semibold">Email</th>
                <SortTh label="Enrollments" active={sortKey === "enrollments"} dir={sortDir} onClick={() => toggleSort("enrollments")} />
                <th className="px-4 py-3 text-start font-semibold">Progress</th>
                <th className="px-4 py-3 text-start font-semibold">Status</th>
                <SortTh label="Joined" active={sortKey === "joined"} dir={sortDir} onClick={() => toggleSort("joined")} />
                <SortTh label="Last Activity" active={sortKey === "activity"} dir={sortDir} onClick={() => toggleSort("activity")} />
                <th className="px-4 py-3 text-start font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((l) => {
                const checked = selected.has(l.id);
                return (
                  <tr key={l.id} className={cn("border-b border-border last:border-0 transition-colors", checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50")}>
                    <td className="ps-4 pe-2 py-3">
                      <input type="checkbox" aria-label={`Select ${l.name}`} checked={checked} onChange={() => toggleRow(l.id)} className="size-4 rounded border-border-input accent-primary" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={l.initials} size="md" />
                        <div className="min-w-0">
                          <p className="truncate font-bold text-ink">{l.name}</p>
                          <p className="text-caption text-ink-subtle">{l.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{l.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-pill bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary">
                        {l.enrollments} Courses
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-36">
                        <p className="mb-1 text-end text-caption font-semibold text-ink">{l.progress}%</p>
                        <div className="h-1.5 overflow-hidden rounded-pill bg-surface-alt">
                          <div className="h-full rounded-pill bg-primary" style={{ width: `${l.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusPill status={l.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{formatJoined(l.joined)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{l.lastActivity}</td>
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
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} students
        </p>
        <div className="flex items-center gap-1">
          <PagerBtn label="First" disabled={safePage === 1} onClick={() => setPage(1)}><ChevronsLeft className="size-4" aria-hidden="true" /></PagerBtn>
          <PagerBtn label="Previous" disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft className="size-4" aria-hidden="true" /></PagerBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === safePage ? "page" : undefined}
              className={cn("inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold", p === safePage ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary hover:text-primary")}
            >
              {p}
            </button>
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
      <button type="button" aria-label="View student" className={iconAction}><Eye className="size-4" aria-hidden="true" /></button>
      <button type="button" aria-label="Edit student" className={iconAction}><Pencil className="size-4" aria-hidden="true" /></button>
      <button type="button" aria-label="More actions" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
    </div>
  );
}

function LearnerGrid({ rows, selected, onToggle }: { rows: Learner[]; selected: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((l) => {
        const checked = selected.has(l.id);
        return (
          <div key={l.id} className={cn("rounded-xl border bg-surface p-4 transition-colors", checked ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40")}>
            <div className="flex items-start gap-3">
              <input type="checkbox" aria-label={`Select ${l.name}`} checked={checked} onChange={() => onToggle(l.id)} className="mt-1 size-4 rounded border-border-input accent-primary" />
              <Avatar initials={l.initials} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{l.name}</p>
                <p className="truncate text-caption text-ink-subtle">{l.email}</p>
              </div>
              <StatusPill status={l.status} />
            </div>
            <div className="mt-3">
              <p className="mb-1 flex items-center justify-between text-caption text-ink-muted">
                <span>Progress</span>
                <span className="font-semibold text-ink">{l.progress}%</span>
              </p>
              <div className="h-1.5 overflow-hidden rounded-pill bg-surface-alt">
                <div className="h-full rounded-pill bg-primary" style={{ width: `${l.progress}%` }} />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-caption text-ink-muted">
              <span className="font-semibold text-primary">{l.enrollments} Courses</span>
              <span>Active {l.lastActivity}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
