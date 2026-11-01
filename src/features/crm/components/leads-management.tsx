"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  LayoutGrid,
  List,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LEADS, LEAD_KPIS, STATUS_LABEL, type Lead, type LeadStatus } from "@/features/crm/data";
import { ScoreBadge, SourceCell, SOURCE_LABEL, StatusPill } from "@/features/crm/components/shared";

const TABS: { key: "all" | LeadStatus; label: string; icon: LucideIcon; count: string }[] = [
  { key: "all", label: "All Leads", icon: Star, count: "2,842" },
  { key: "new", label: "New", icon: UserPlus, count: "1,040" },
  { key: "contacted", label: "Contacted", icon: Phone, count: "628" },
  { key: "qualified", label: "Qualified", icon: Star, count: "312" },
  { key: "followup", label: "Follow-up", icon: Clock, count: "196" },
  { key: "enrolled", label: "Enrolled", icon: GraduationCap, count: "486" },
  { key: "archived", label: "Archived", icon: Archive, count: "180" },
];

export function LeadsManagement() {
  const [tab, setTab] = useState<"all" | LeadStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(LEADS[0]!.id);
  const [checked, setChecked] = useState<Set<string>>(new Set([LEADS[0]!.id]));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LEADS.filter((l) => (tab === "all" || l.status === tab) && (!q || `${l.name} ${l.email} ${l.phone}`.toLowerCase().includes(q)));
  }, [tab, search]);
  const selected = LEADS.find((l) => l.id === selectedId) ?? LEADS[0]!;
  const toggleCheck = (id: string) => setChecked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm">
        <span className="font-medium text-primary">CRM</span><ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" /><span className="font-semibold text-ink">Leads</span>
      </nav>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-on-dark"><GraduationCap className="size-6" aria-hidden="true" /></span>
          <div><h1 className="text-h1 text-ink">Leads Management</h1><p className="mt-1 text-body text-ink-muted">Capture, track, and manage all prospects from your marketing campaigns until enrollment.</p></div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="outline"><UserPlus className="size-4" aria-hidden="true" />Import Leads</Button>
          <Button variant="outline"><TrendingUp className="size-4" aria-hidden="true" />Export</Button>
          <Button><UserPlus className="size-4" aria-hidden="true" />Add New Lead</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Kpi icon={Users} tone="primary" value={LEAD_KPIS.total} label="Total Leads" trend={LEAD_KPIS.totalTrend} />
        <Kpi icon={UserPlus} tone="violet" value={LEAD_KPIS.new} label="New Leads" trend={LEAD_KPIS.newTrend} />
        <Kpi icon={Target} tone="teal" value={LEAD_KPIS.contacted} label="Contacted" trend={LEAD_KPIS.contactedTrend} />
        <Kpi icon={Filter} tone="warm" value={LEAD_KPIS.qualified} label="Qualified" trend={LEAD_KPIS.qualifiedTrend} />
        <Kpi icon={GraduationCap} tone="primary" value={LEAD_KPIS.enrolled} label="Enrolled" trend={LEAD_KPIS.enrolledTrend} />
        <Kpi icon={Clock} tone="success" value={LEAD_KPIS.conversion} label="Conversion Rate" trend={LEAD_KPIS.conversionTrend} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary bg-primary text-on-dark" : "border-border bg-surface text-ink-muted hover:border-primary/40")}>
            <t.icon className="size-4" aria-hidden="true" />{t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search leads</span>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or phone…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Sel options={["All Sources", ...Object.values(SOURCE_LABEL)]} />
          <Sel options={["All Courses", "Strategic Management Dip.", "Business Analytics", "Leadership Dip."]} />
          <Sel options={["All Owners", "Ahmed Saleh", "Mona Nabil", "Sara Fouad"]} />
          <Sel options={["All Statuses", ...Object.values(STATUS_LABEL)]} />
          <Button variant="outline"><Filter className="size-4" aria-hidden="true" />More Filters</Button>
          <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
            <button type="button" aria-label="List" className="flex size-11 items-center justify-center bg-primary text-on-dark"><List className="size-5" aria-hidden="true" /></button>
            <button type="button" aria-label="Grid" className="flex size-11 items-center justify-center text-ink-muted hover:bg-surface-alt"><LayoutGrid className="size-5" aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[840px] border-collapse text-body-sm">
            <thead><tr className="border-b border-border text-caption text-ink-subtle">
              <th className="w-10 ps-4 py-3" />
              <th className="px-3 py-3 text-start font-semibold">Lead</th>
              <th className="px-3 py-3 text-start font-semibold">Contact</th>
              <th className="px-3 py-3 text-start font-semibold">Interested In</th>
              <th className="px-3 py-3 text-start font-semibold">Source</th>
              <th className="px-3 py-3 text-start font-semibold">Score</th>
              <th className="px-3 py-3 text-start font-semibold">Status</th>
              <th className="px-3 py-3 text-start font-semibold">Owner</th>
              <th className="px-3 py-3 text-start font-semibold">Updated</th>
              <th className="px-3 py-3" />
            </tr></thead>
            <tbody>
              {filtered.map((l) => {
                const active = l.id === selectedId;
                return (
                  <tr key={l.id} onClick={() => setSelectedId(l.id)} className={cn("cursor-pointer border-b border-border last:border-0 transition-colors", active ? "bg-primary-50/50" : "hover:bg-surface-alt/50")}>
                    <td className="ps-4 py-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" aria-label={`Select ${l.name}`} checked={checked.has(l.id)} onChange={() => toggleCheck(l.id)} className="size-4 rounded border-border-input accent-primary" /></td>
                    <td className="px-3 py-3"><div className="flex items-center gap-2"><Avatar initials={l.initials} size="sm" /><div className="min-w-0"><Link href={routes.admin.crm.leadDetail(l.id)} onClick={(e) => e.stopPropagation()} className="truncate font-bold text-ink hover:text-primary">{l.name}</Link><p className="text-caption text-ink-subtle">{l.role}</p></div></div></td>
                    <td className="px-3 py-3"><p className="inline-flex items-center gap-1.5 text-ink-muted"><Phone className="size-3.5 text-ink-subtle" aria-hidden="true" />{l.phone}</p><p className="inline-flex items-center gap-1.5 text-caption text-ink-subtle"><Mail className="size-3.5" aria-hidden="true" />{l.email}</p></td>
                    <td className="px-3 py-3 text-ink-muted">{l.interestedIn}</td>
                    <td className="px-3 py-3"><SourceCell source={l.source} /></td>
                    <td className="px-3 py-3"><ScoreBadge score={l.score} /></td>
                    <td className="px-3 py-3"><StatusPill status={l.status} /></td>
                    <td className="px-3 py-3"><Avatar initials={l.owner.split(" ").map((p) => p[0]).join("")} size="sm" /></td>
                    <td className="px-3 py-3 whitespace-nowrap text-caption text-ink-subtle">{l.updated}</td>
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}><button type="button" aria-label="More" className="text-ink-subtle hover:text-ink"><MoreHorizontal className="size-4" aria-hidden="true" /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <p className="text-caption text-ink-subtle">Showing 1 – 10 of 2,842 leads</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button type="button" aria-label="Previous" className="inline-flex size-8 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary"><ChevronLeft className="size-4" aria-hidden="true" /></button>
                {[1, 2, 3, 4, 5].map((p) => (<button key={p} type="button" className={cn("inline-flex size-8 items-center justify-center rounded-md text-caption font-semibold", p === 1 ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary")}>{p}</button>))}
                <span className="px-1 text-ink-subtle">…</span>
                <button type="button" className="inline-flex size-8 items-center justify-center rounded-md border border-border-input text-caption font-semibold text-ink-muted">285</button>
                <button type="button" aria-label="Next" className="inline-flex size-8 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary"><ChevronRight className="size-4" aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Rail: selected lead */}
        <LeadRail lead={selected} />
      </div>
    </div>
  );
}

function LeadRail({ lead }: { lead: Lead }) {
  const [tab, setTab] = useState<"details" | "activities" | "notes" | "files">("details");
  return (
    <aside className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <Avatar initials={lead.initials} size="lg" />
        <div className="min-w-0 flex-1"><p className="truncate text-h4 text-ink">{lead.name}</p><p className="text-caption text-ink-subtle">{lead.role} · Lead Score: <b className="text-ink">{lead.score}</b></p></div>
        <button type="button" aria-label="Close" className="text-ink-subtle hover:text-ink"><MoreHorizontal className="size-5" aria-hidden="true" /></button>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 text-center">
        {[["Call", Phone], ["WhatsApp", MessageCircle], ["Email", Mail], ["Schedule", CalendarClock], ["More", MoreHorizontal]].map(([label, Icon]) => {
          const I = Icon as LucideIcon;
          return (<button key={label as string} type="button" className="flex flex-col items-center gap-1 rounded-lg border border-border-input py-2 text-[11px] font-semibold text-ink-muted hover:border-primary hover:text-primary"><I className="size-4" aria-hidden="true" />{label as string}</button>);
        })}
      </div>
      <div className="mt-4 flex gap-1 border-b border-border">
        {(["details", "activities", "notes", "files"] as const).map((t) => (<button key={t} type="button" onClick={() => setTab(t)} className={cn("border-b-2 px-3 py-2 text-body-sm font-semibold capitalize transition-colors", tab === t ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>{t}</button>))}
      </div>
      {tab === "details" ? (
        <>
          <dl className="mt-4 space-y-3 text-body-sm">
            <Row label="Status" value={<StatusPill status={lead.status} />} />
            <Row label="Interested In" value={lead.interestedIn} />
            <Row label="Source" value={SOURCE_LABEL[lead.source]} />
            <Row label="Owner" value={lead.owner} />
            <Row label="Created" value="Oct 28, 2026 – 11:20 AM" />
            <Row label="Last Activity" value="Oct 30, 2026 – 02:15 PM" />
          </dl>
          <div className="mt-4 rounded-lg bg-primary-50/50 p-3">
            <p className="text-body-sm font-bold text-ink">Next Action</p>
            <p className="text-caption text-ink-muted">Follow up and send course offer</p>
            <p className="text-caption font-semibold text-danger">Due: Today, 04:00 PM</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button size="sm"><GraduationCap className="size-4" aria-hidden="true" />Convert</Button>
            <Button size="sm" variant="outline-primary"><Target className="size-4" aria-hidden="true" />Create Deal</Button>
          </div>
        </>
      ) : (
        <p className="mt-6 text-center text-body-sm text-ink-subtle">No {tab} to show yet.</p>
      )}
    </aside>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (<div className="flex items-center justify-between gap-3"><dt className="text-ink-subtle">{label}</dt><dd className="text-end font-semibold text-ink">{value}</dd></div>);
}
function Sel({ options }: { options: string[] }) {
  return (<label className="relative inline-flex items-center"><span className="sr-only">{options[0]}</span><select className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface pe-9 ps-4 text-body-sm font-medium text-ink outline-none focus-visible:border-primary">{options.map((o) => (<option key={o}>{o}</option>))}</select><ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" /></label>);
}
function Kpi({ icon: Icon, tone, value, label, trend }: { icon: LucideIcon; tone: "primary" | "violet" | "teal" | "warm" | "success"; value: string; label: string; trend: string }) {
  const tones = { primary: "bg-primary-50 text-primary", violet: "bg-violet-50 text-violet", teal: "bg-teal-50 text-teal", warm: "bg-orange-50 text-orange", success: "bg-success-50 text-success" };
  return (<div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"><span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tones[tone])}><Icon className="size-5" aria-hidden="true" /></span><div className="min-w-0"><p className="text-stat font-extrabold leading-none text-ink">{value}</p><p className="mt-1 text-caption text-ink-muted">{label}</p><p className="text-caption font-bold text-success">↑ {trend}</p></div></div>);
}
