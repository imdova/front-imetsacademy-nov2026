"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  LayoutGrid,
  Layers,
  List,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trophy,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "Published" | "Due Soon" | "Overdue" | "Draft";
type AType = "Case Study" | "Report" | "Group Project" | "Reflection" | "Final Project" | "Individual";

const TYPE_META: Record<AType, { icon: LucideIcon; className: string }> = {
  "Case Study": { icon: Layers, className: "bg-violet-50 text-violet" },
  Report: { icon: FileText, className: "bg-primary-50 text-primary" },
  "Group Project": { icon: Users, className: "bg-teal-50 text-teal" },
  Reflection: { icon: Pencil, className: "bg-orange-50 text-orange" },
  "Final Project": { icon: Trophy, className: "bg-violet-50 text-violet" },
  Individual: { icon: User, className: "bg-surface-alt text-ink-muted" },
};

const STATUS_META: Record<Status, { icon: LucideIcon; className: string }> = {
  Published: { icon: ClipboardCheck, className: "bg-success-50 text-success" },
  "Due Soon": { icon: Clock, className: "bg-orange-50 text-orange" },
  Overdue: { icon: Clock, className: "bg-rose-50 text-danger" },
  Draft: { icon: Pencil, className: "bg-surface-alt text-ink-muted" },
};

type Assignment = {
  id: string;
  title: string;
  desc: string;
  module: string;
  type: AType;
  due: string | null;
  dueTime: string;
  submitted: number;
  total: number;
  status: Status;
};

const ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Case Study: Market Entry Strategy", desc: "Analyze a real case and propose a market-entry plan.", module: "Module 3: Competitive Analysis", type: "Case Study", due: "Nov 10, 2026", dueTime: "11:59 PM", submitted: 28, total: 32, status: "Published" },
  { id: "a2", title: "Strategy Audit Report", desc: "Conduct a simple strategy audit and submit your report.", module: "Module 4: Strategic Planning", type: "Report", due: "Nov 15, 2026", dueTime: "11:59 PM", submitted: 26, total: 32, status: "Published" },
  { id: "a3", title: "Group Project: Strategic Plan", desc: "Work in groups to design a strategic plan for a business.", module: "Module 5: Strategy Execution", type: "Group Project", due: "Nov 22, 2026", dueTime: "11:59 PM", submitted: 32, total: 32, status: "Published" },
  { id: "a4", title: "Reflection: Leadership in Strategy", desc: "A short reflection on your role in driving strategy.", module: "Module 6: Leadership & Culture", type: "Reflection", due: "Oct 30, 2026", dueTime: "11:59 PM", submitted: 24, total: 32, status: "Due Soon" },
  { id: "a5", title: "Final Assignment: Strategic Management Plan", desc: "Develop a comprehensive strategic management plan.", module: "Module 7: Integration & Application", type: "Final Project", due: "Oct 25, 2026", dueTime: "11:59 PM", submitted: 18, total: 32, status: "Overdue" },
  { id: "a6", title: "Draft: Competitive Readiness Assessment", desc: "Prepare a checklist and assess the organization's readiness.", module: "Module 2: Strategic Frameworks", type: "Individual", due: null, dueTime: "", submitted: 0, total: 32, status: "Draft" },
];

const SEGMENTS = ["Overview", "Assignments", "Submissions", "Grades"] as const;
type Segment = (typeof SEGMENTS)[number];

function Ring({ value }: { value: number }) {
  const r = 13;
  const c = 2 * Math.PI * r;
  const color = value >= 70 ? "stroke-success" : value >= 40 ? "stroke-orange" : value > 0 ? "stroke-primary" : "stroke-border";
  return (
    <span className="relative inline-flex size-9 items-center justify-center">
      <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r={r} fill="none" strokeWidth="4" className="stroke-surface-alt" />
        <circle cx="18" cy="18" r={r} fill="none" strokeWidth="4" strokeLinecap="round" className={color} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
    </span>
  );
}

export function AssignmentsView() {
  const [segment, setSegment] = useState<Segment>("Overview");
  const [tab, setTab] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const counts = {
    all: ASSIGNMENTS.length,
    Published: ASSIGNMENTS.filter((a) => a.status === "Published").length,
    Draft: ASSIGNMENTS.filter((a) => a.status === "Draft").length,
    Archived: 1,
  };
  const stats = {
    total: ASSIGNMENTS.length,
    published: counts.Published,
    dueSoon: ASSIGNMENTS.filter((a) => a.status === "Due Soon").length,
    overdue: ASSIGNMENTS.filter((a) => a.status === "Overdue").length,
    submissions: ASSIGNMENTS.reduce((n, a) => n + a.submitted, 0),
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ASSIGNMENTS.filter((a) => {
      if (tab === "Published" && a.status !== "Published") return false;
      if (tab === "Draft" && a.status !== "Draft") return false;
      if (q && !`${a.title} ${a.module} ${a.type}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tab, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><ClipboardList className="size-6" aria-hidden="true" /></span>
        <div>
          <h1 className="text-h1 text-ink">Assignments</h1>
          <p className="mt-1 text-body text-ink-muted">Create and manage assignments, review submissions, grade, and give feedback to students.</p>
        </div>
      </div>

      {/* Course selector + segmented */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 lg:flex-row lg:items-center lg:justify-between">
        <button type="button" className="flex items-center gap-3 rounded-lg border border-border-input px-3 py-2 text-start hover:border-primary">
          <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-navy-900 text-on-dark"><GraduationCap className="size-5" aria-hidden="true" /></span>
          <span className="font-bold text-ink">Strategic Management (IM-SMD-101)</span>
          <ChevronDown className="size-4 text-ink-subtle" aria-hidden="true" />
        </button>
        <div className="flex gap-1 rounded-lg bg-surface-alt p-1">
          {SEGMENTS.map((s) => (
            <button key={s} type="button" onClick={() => setSegment(s)} className={cn("rounded-md px-4 py-1.5 text-body-sm font-semibold transition-colors", segment === s ? "bg-primary text-on-dark" : "text-ink-muted hover:text-ink")}>{s}</button>
          ))}
        </div>
      </div>

      {segment !== "Overview" ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><ClipboardList className="size-6" aria-hidden="true" /></span>
          <p className="text-h4 text-ink">{segment}</p>
          <p className="max-w-sm text-body-sm text-ink-subtle">This view is part of the preview and will be wired to the backend next.</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Stat icon={ClipboardList} tone="primary" value={stats.total} label="Total Assignments" />
            <Stat icon={ClipboardCheck} tone="teal" value={stats.published} label="Published" />
            <Stat icon={Clock} tone="warm" value={stats.dueSoon} label="Due Soon" />
            <Stat icon={CalendarDays} tone="rose" value={stats.overdue} label="Overdue" />
            <Stat icon={Users} tone="violet" value={stats.submissions} label="Total Submissions" />
          </div>

          {/* Tabs + create */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border">
            <div className="flex gap-6">
              {([["all", `All Assignments (${counts.all})`], ["Published", `Published (${counts.Published})`], ["Draft", `Drafts (${counts.Draft})`], ["Archived" as const, `Archived (${counts.Archived})`]] as const).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setTab(k === "Archived" ? "all" : (k as "all" | Status))} className={cn("relative h-10 text-body-sm font-semibold transition-colors", tab === k ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-t after:bg-primary" : "text-ink-muted hover:text-ink")}>{label}</button>
              ))}
            </div>
            <Button className="mb-2"><Plus className="size-4" aria-hidden="true" />Create Assignment</Button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex min-w-[220px] flex-1 items-center">
              <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
              <span className="sr-only">Search assignments</span>
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assignments…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Select label="Modules" options={["All Modules", "Module 2", "Module 3", "Module 4"]} />
              <Select label="Status" options={["All Status", "Published", "Due Soon", "Overdue", "Draft"]} />
              <Select label="Types" options={["All Types", "Case Study", "Report", "Group Project", "Reflection"]} />
              <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
                <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={cn("flex size-11 items-center justify-center", view === "list" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}><List className="size-5" aria-hidden="true" /></button>
                <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={cn("flex size-11 items-center justify-center", view === "grid" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}><LayoutGrid className="size-5" aria-hidden="true" /></button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[1040px] border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-border text-caption text-ink-subtle">
                  <th className="px-4 py-3 text-start font-semibold">Assignment Title</th>
                  <th className="px-4 py-3 text-start font-semibold">Module</th>
                  <th className="px-4 py-3 text-start font-semibold">Type</th>
                  <th className="px-4 py-3 text-start font-semibold">Due Date</th>
                  <th className="px-4 py-3 text-start font-semibold">Submissions</th>
                  <th className="px-4 py-3 text-start font-semibold">Status</th>
                  <th className="px-4 py-3 text-start font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const T = TYPE_META[a.type];
                  const S = STATUS_META[a.status];
                  const pct = Math.round((a.submitted / a.total) * 100);
                  const dueRed = a.status === "Due Soon" || a.status === "Overdue";
                  return (
                    <tr key={a.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <span className={cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg", a.status === "Draft" ? "bg-surface-alt text-ink-muted" : a.type === "Group Project" ? "bg-teal-50 text-teal" : "bg-primary-50 text-primary")}>
                            {a.status === "Draft" ? <Pencil className="size-4" aria-hidden="true" /> : a.type === "Group Project" ? <Users className="size-4" aria-hidden="true" /> : <FileText className="size-4" aria-hidden="true" />}
                          </span>
                          <div className="min-w-0"><p className="font-bold text-ink">{a.title}</p><p className="text-caption text-ink-subtle">{a.desc}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{a.module}</td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", T.className)}><T.icon className="size-3.5" aria-hidden="true" />{a.type}</span></td>
                      <td className="px-4 py-3">
                        {a.due ? (
                          <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", dueRed ? "text-danger" : "text-ink-muted")}>
                            <CalendarDays className="size-4" aria-hidden="true" />
                            <span><span className={cn("block font-semibold", dueRed ? "text-danger" : "text-ink")}>{a.due}</span><span className="block text-caption">{a.dueTime}</span></span>
                          </span>
                        ) : <span className="text-ink-subtle">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <Ring value={pct} />
                          <span><span className="block font-bold text-ink">{a.submitted} / {a.total}</span><span className="block text-caption text-ink-subtle">({pct}%)</span></span>
                        </span>
                      </td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", S.className)}><S.icon className="size-3.5" aria-hidden="true" />{a.status}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          <button type="button" aria-label={a.status === "Draft" ? "Edit" : "View"} className={iconAction}>{a.status === "Draft" ? <Pencil className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}</button>
                          <button type="button" aria-label="More" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

const iconAction = "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface pe-9 ps-4 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </label>
  );
}

function Stat({ icon: Icon, tone, value, label }: { icon: LucideIcon; tone: "primary" | "teal" | "warm" | "rose" | "violet"; value: number; label: string }) {
  const tones = { primary: "bg-primary-50 text-primary", teal: "bg-teal-50 text-teal", warm: "bg-orange-50 text-orange", rose: "bg-rose-50 text-danger", violet: "bg-violet-50 text-violet" };
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", tones[tone])}><Icon className="size-6" aria-hidden="true" /></span>
      <div><p className="text-stat font-extrabold leading-none text-ink">{value}</p><p className="mt-1 text-body-sm text-ink-muted">{label}</p></div>
    </div>
  );
}
