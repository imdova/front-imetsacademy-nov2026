"use client";

import { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  CirclePlay,
  CircleX,
  Download,
  Eye,
  GraduationCap,
  MoreVertical,
  Search,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { TrendStat } from "@/components/shared/trend-stat";
import { cn } from "@/lib/utils";

type EnrollStatus = "in-progress" | "completed" | "not-started";
type Row = {
  id: string;
  name: string;
  email: string;
  initials: string;
  enrolled: string; // ISO
  progress: number;
  completed: string | null; // ISO or null
};

const SEED: [string, string, number, string | null][] = [
  ["Sara Mohamed", "2026-11-01", 80, null],
  ["Ahmed Ali", "2026-10-28", 100, "2026-11-06"],
  ["Mona Hassan", "2026-10-20", 65, null],
  ["Youssef Hamdy", "2026-10-18", 40, null],
  ["Nour Emad", "2026-10-15", 0, null],
  ["Omar Soliman", "2026-10-10", 100, "2026-10-31"],
  ["Hend Ibrahim", "2026-10-05", 90, null],
  ["Kareem Tarek", "2026-10-02", 70, null],
  ["Laila Fahmy", "2026-09-28", 100, "2026-10-24"],
  ["Mostafa Zaki", "2026-09-22", 35, null],
  ["Dina Adel", "2026-09-18", 0, null],
  ["Hassan Nabil", "2026-09-12", 55, null],
  ["Aya Kamal", "2026-09-05", 100, "2026-10-01"],
  ["Tarek Sami", "2026-09-01", 45, null],
];

function initials(n: string) {
  return n.split(" ").slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}
function statusOf(progress: number): EnrollStatus {
  if (progress >= 100) return "completed";
  if (progress <= 0) return "not-started";
  return "in-progress";
}

const ROWS: Row[] = SEED.map(([name, enrolled, progress, completed], i) => ({
  id: `ENR-${5001 + i}`,
  name,
  email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
  initials: initials(name),
  enrolled,
  progress,
  completed,
}));

const STATUS: Record<EnrollStatus, { className: string; icon: typeof CircleCheck; label: string }> = {
  "in-progress": { className: "bg-success-50 text-success", icon: CirclePlay, label: "In Progress" },
  completed: { className: "bg-primary-50 text-primary", icon: CircleCheck, label: "Completed" },
  "not-started": { className: "bg-rose-50 text-rose", icon: CircleX, label: "Not Started" },
};

function StatusPill({ status }: { status: EnrollStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", s.className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {s.label}
    </span>
  );
}

function Select({ icon: Icon, label, value, onChange, children }: { icon: typeof Calendar; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative inline-flex items-center">
      <Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-9 pe-9 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </label>
  );
}

const PAGE_SIZE = 7;

function fmt(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function EnrollmentsTab({ totalEnrollments }: { totalEnrollments: number }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const inProgress = Math.round(totalEnrollments * 0.65);
  const completed = Math.round(totalEnrollments * 0.29);
  const notStarted = totalEnrollments - inProgress - completed;
  const certificates = completed * 2 + 22;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = ROWS.filter((r) => {
      const st = statusOf(r.progress);
      if (status !== "all" && st !== status) return false;
      if (progressFilter === "lt50" && r.progress >= 50) return false;
      if (progressFilter === "gte50" && r.progress < 50) return false;
      if (q && !`${r.name} ${r.email} ${r.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    out.sort((a, b) => (new Date(a.enrolled).getTime() - new Date(b.enrolled).getTime()) * dir);
    return out;
  }, [search, status, progressFilter, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((r) => r.id);
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
  const onFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <TrendStat tone="primary" icon={<Users className="size-5" />} value={totalEnrollments.toLocaleString()} label="Total Enrollments" trend="+12%" />
        <TrendStat tone="teal" icon={<CirclePlay className="size-5" />} value={inProgress.toLocaleString()} label="In Progress" trend="+10%" />
        <TrendStat tone="violet" icon={<CircleCheck className="size-5" />} value={completed.toLocaleString()} label="Completed" trend="+18%" />
        <TrendStat tone="rose" icon={<CircleX className="size-5" />} value={notStarted.toLocaleString()} label="Not Started" trend="+5%" />
        <TrendStat tone="warm" icon={<GraduationCap className="size-5" />} value={certificates.toLocaleString()} label="Certificates Issued" trend="+18%" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search students</span>
          <input type="search" value={search} onChange={(e) => onFilter(setSearch)(e.target.value)} placeholder="Search by student name, email, or ID…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Select icon={CircleCheck} label="Status" value={status} onChange={onFilter(setStatus)}>
            <option value="all">All Statuses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
          </Select>
          <Select icon={BarChart3} label="Progress" value={progressFilter} onChange={onFilter(setProgressFilter)}>
            <option value="all">All Progress</option>
            <option value="lt50">Below 50%</option>
            <option value="gte50">50% and above</option>
          </Select>
          <Select icon={Calendar} label="Enrollment date" value="all" onChange={() => {}}>
            <option value="all">Enrollment Date</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </Select>
          <Button variant="outline-primary">
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[980px] border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-border text-caption text-ink-subtle">
              <th className="w-10 ps-4 pe-2 py-3"><input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} className="size-4 rounded border-border-input accent-primary" /></th>
              <th className="px-4 py-3 text-start font-semibold">Student</th>
              <th className="px-4 py-3 text-start font-semibold">
                <button type="button" onClick={() => { setSortDir((d) => (d === "asc" ? "desc" : "asc")); setPage(1); }} className="inline-flex items-center gap-1 text-ink hover:text-ink">
                  Enrollment Date
                  <ChevronDown className={cn("size-3.5 transition-transform", sortDir === "asc" && "rotate-180")} aria-hidden="true" />
                </button>
              </th>
              <th className="px-4 py-3 text-start font-semibold">Progress</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
              <th className="px-4 py-3 text-start font-semibold">Completion Date</th>
              <th className="px-4 py-3 text-start font-semibold">Certificate</th>
              <th className="px-4 py-3 text-start font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => {
              const st = statusOf(r.progress);
              const checked = selected.has(r.id);
              return (
                <tr key={r.id} className={cn("border-b border-border last:border-0 transition-colors", checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50")}>
                  <td className="ps-4 pe-2 py-3"><input type="checkbox" aria-label={`Select ${r.name}`} checked={checked} onChange={() => toggleRow(r.id)} className="size-4 rounded border-border-input accent-primary" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={r.initials} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-ink">{r.name}</p>
                        <p className="truncate text-caption text-ink-subtle">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{fmt(r.enrolled)}</td>
                  <td className="px-4 py-3">
                    <div className="w-32">
                      <p className="mb-1 text-end text-caption font-semibold text-ink">{r.progress}%</p>
                      <div className="h-1.5 overflow-hidden rounded-pill bg-surface-alt">
                        <div className="h-full rounded-pill bg-primary" style={{ width: `${r.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusPill status={st} /></td>
                  <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{fmt(r.completed)}</td>
                  <td className="px-4 py-3">
                    {st === "completed" ? (
                      <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary hover:bg-primary-100">
                        <Award className="size-3.5" aria-hidden="true" />
                        View
                      </button>
                    ) : (
                      <span className="text-ink-subtle">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      <button type="button" aria-label="View" className={iconAction}><Eye className="size-4" aria-hidden="true" /></button>
                      <button type="button" aria-label="Progress report" className={iconAction}><BarChart3 className="size-4" aria-hidden="true" /></button>
                      <button type="button" aria-label="More" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {totalEnrollments.toLocaleString()} enrollments
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

const iconAction = "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function PagerBtn({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}
