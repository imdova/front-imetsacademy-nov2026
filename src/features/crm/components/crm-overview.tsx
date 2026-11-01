"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CreditCard,
  Filter,
  GraduationCap,
  Megaphone,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";
import {
  CRM_KPIS,
  LEADS,
  MARKETING,
  PAYMENTS_SUMMARY,
  PIPELINE,
  REVENUE_TREND,
} from "@/features/crm/data";
import { ScoreBadge, SourceCell, StatusPill } from "@/features/crm/components/shared";

const SUBTABS = [
  { label: "Overview", href: routes.admin.crm.overview },
  { label: "Leads", href: routes.admin.crm.leads },
  { label: "Pipeline", href: routes.admin.crm.pipeline },
  { label: "Sales Deals", href: routes.admin.crm.deals },
  { label: "Enrollments", href: routes.admin.crm.enrollments },
  { label: "Payments & Installments", href: routes.admin.crm.payments },
  { label: "Marketing", href: routes.admin.crm.overview },
  { label: "Reports", href: routes.admin.reports },
];

export function CrmOverview() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-on-dark"><UsersRound className="size-6" aria-hidden="true" /></span>
          <div>
            <h1 className="text-h1 text-ink">CRM &ndash; Marketing, Sales &amp; Enrollments</h1>
            <p className="mt-1 text-body text-ink-muted">Manage leads, pipeline, payments, installments, and course enrollments in one place.</p>
          </div>
        </div>
        <button type="button" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border-input bg-surface px-3 py-2.5 text-body-sm font-medium text-ink hover:border-primary">
          <CalendarDays className="size-4 text-ink-subtle" aria-hidden="true" />Last 30 Days <span className="text-ink-subtle">Oct 1 – Oct 30, 2026</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi icon={Users} tone="primary" value={CRM_KPIS.totalLeads} label="Total Leads" trend={CRM_KPIS.totalLeadsTrend} />
        <Kpi icon={UsersRound} tone="violet" value={CRM_KPIS.qualifiedLeads} label="Qualified Leads" trend={CRM_KPIS.qualifiedTrend} />
        <Kpi icon={GraduationCap} tone="teal" value={CRM_KPIS.enrollments} label="Enrollments" trend={CRM_KPIS.enrollmentsTrend} />
        <Kpi icon={CreditCard} tone="success" value={CRM_KPIS.totalRevenue} label="Total Revenue" trend={CRM_KPIS.revenueTrend} />
        <Kpi icon={CalendarDays} tone="rose" value={CRM_KPIS.activeInstallments} label="Active Installments" sub={`${CRM_KPIS.outstanding} Outstanding`} />
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {SUBTABS.map((t, i) => (
          <Link key={t.label} href={t.href} className={cn("flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 text-body-sm font-semibold transition-colors", i === 0 ? "border-primary bg-primary text-on-dark" : "border-border bg-surface text-ink-muted hover:border-primary/40")}>{t.label}</Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Pipeline */}
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-h4 text-ink"><Filter className="size-5 text-primary" aria-hidden="true" />Sales Pipeline <span className="rounded-pill bg-success-50 px-2.5 py-1 text-caption font-bold text-success">Conversion Rate: 17.1%</span></h2>
              <Link href={routes.admin.crm.pipeline} className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary hover:underline">View Pipeline<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
              {PIPELINE.map((col) => (
                <div key={col.key} className="rounded-lg border border-border">
                  <div className={cn("rounded-t-lg px-3 py-2", col.tint)}>
                    <p className="text-caption font-bold text-ink">{col.title}</p>
                    <p className="text-h4 font-extrabold text-ink">{col.count.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2 p-2">
                    {col.leads.map((l) => (
                      <div key={l.name} className="rounded-md bg-surface-alt p-2">
                        <p className="truncate text-caption font-bold text-ink">{l.name}</p>
                        <p className="truncate text-[11px] text-ink-subtle">{l.course}</p>
                        <p className="mt-0.5 text-[11px] text-ink-subtle">{l.won ? "✓ Enrolled" : l.meta}</p>
                      </div>
                    ))}
                    <p className="pt-1 text-center text-[11px] font-semibold text-primary">+ {col.extra.toLocaleString()} more</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent leads */}
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-h4 text-ink"><Users className="size-5 text-primary" aria-hidden="true" />Recent Leads</h2>
              <Link href={routes.admin.crm.leads} className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary hover:underline">View All<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-body-sm">
                <thead><tr className="border-b border-border text-caption text-ink-subtle">
                  <th className="px-3 py-2 text-start font-semibold">Lead</th>
                  <th className="px-3 py-2 text-start font-semibold">Source</th>
                  <th className="px-3 py-2 text-start font-semibold">Interested In</th>
                  <th className="px-3 py-2 text-start font-semibold">Score</th>
                  <th className="px-3 py-2 text-start font-semibold">Status</th>
                  <th className="px-3 py-2 text-start font-semibold">Owner</th>
                </tr></thead>
                <tbody>
                  {LEADS.slice(0, 5).map((l) => (
                    <tr key={l.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Avatar initials={l.initials} size="sm" /><div className="min-w-0"><p className="truncate font-bold text-ink">{l.name}</p><p className="text-caption text-ink-subtle">{l.phone}</p></div></div></td>
                      <td className="px-3 py-2.5"><SourceCell source={l.source} /></td>
                      <td className="px-3 py-2.5 text-ink-muted">{l.interestedIn}</td>
                      <td className="px-3 py-2.5"><ScoreBadge score={l.score} /></td>
                      <td className="px-3 py-2.5"><StatusPill status={l.status} /></td>
                      <td className="px-3 py-2.5"><Avatar initials={l.owner.split(" ").map((p) => p[0]).join("")} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <RevenueChart />

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><CreditCard className="size-5 text-primary" aria-hidden="true" />Payments &amp; Installments</h3>
              <Link href={routes.admin.crm.payments} className="text-caption font-semibold text-primary hover:underline">View Details</Link>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <MiniMoney value={PAYMENTS_SUMMARY.total} label="Total Revenue" tone="primary" />
              <MiniMoney value={PAYMENTS_SUMMARY.paid} label="Paid Amount" tone="teal" />
              <MiniMoney value={PAYMENTS_SUMMARY.outstanding} label="Outstanding" tone="warm" />
            </div>
            <div className="mt-4 flex items-center justify-between text-caption"><span className="font-semibold text-success">Paid {PAYMENTS_SUMMARY.paidPct}%</span><span className="font-semibold text-danger">Outstanding {PAYMENTS_SUMMARY.outstandingPct}%</span></div>
            <div className="mt-1 flex h-2.5 overflow-hidden rounded-pill bg-rose-50"><div className="h-full rounded-s-pill bg-success" style={{ width: `${PAYMENTS_SUMMARY.paidPct}%` }} /></div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Megaphone className="size-5 text-primary" aria-hidden="true" />Marketing Performance</h3>
              <span className="text-caption font-semibold text-primary">View Campaigns</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {MARKETING.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-h3 font-extrabold text-ink">{m.leads}</p>
                  <p className="text-caption text-ink-subtle">{m.label} Leads</p>
                  <p className="mt-0.5 text-caption font-bold text-success">↑ {m.trend}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, tone, value, label, trend, sub }: { icon: LucideIcon; tone: "primary" | "violet" | "teal" | "success" | "rose"; value: string; label: string; trend?: string; sub?: string }) {
  const tones = { primary: "bg-primary-50 text-primary", violet: "bg-violet-50 text-violet", teal: "bg-teal-50 text-teal", success: "bg-success-50 text-success", rose: "bg-rose-50 text-danger" };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tones[tone])}><Icon className="size-5" aria-hidden="true" /></span>
      <div className="min-w-0">
        <p className="text-stat font-extrabold leading-none text-ink">{value}</p>
        <p className="mt-1 text-caption text-ink-muted">{label}</p>
        {trend && <p className="text-caption font-bold text-success">↑ {trend}</p>}
        {sub && <p className="text-caption text-ink-subtle">{sub}</p>}
      </div>
    </div>
  );
}

function MiniMoney({ value, label, tone }: { value: string; label: string; tone: "primary" | "teal" | "warm" }) {
  const tones = { primary: "text-primary", teal: "text-teal", warm: "text-orange" };
  return (<div className="rounded-lg bg-surface-alt p-2.5"><p className={cn("font-extrabold", tones[tone])}>{value}</p><p className="text-[11px] text-ink-subtle">{label}</p></div>);
}

function RevenueChart() {
  const [mode, setMode] = useState<"revenue" | "enrollments">("revenue");
  const W = 380, H = 220, padL = 40, padR = 36, padT = 16, padB = 28;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = REVENUE_TREND.length;
  const maxRev = 50000, maxEnr = 500;
  const x = (i: number) => padL + (i / (n - 1)) * plotW;
  const barW = plotW / n * 0.5;
  const yRev = (v: number) => padT + (1 - v / maxRev) * plotH;
  const yEnr = (v: number) => padT + (1 - v / maxEnr) * plotH;
  const line = REVENUE_TREND.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${yEnr(p.enrollments)}`).join(" ");

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><BarChart3 className="size-5 text-primary" aria-hidden="true" />Revenue &amp; Enrollments</h3>
        <div className="flex gap-1 rounded-lg bg-surface-alt p-0.5">
          {(["revenue", "enrollments"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} className={cn("rounded-md px-3 py-1 text-caption font-semibold capitalize", mode === m ? "bg-primary text-on-dark" : "text-ink-muted")}>{m}</button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4 text-caption text-ink-muted">
        <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-sm bg-primary" />Revenue</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-violet" />Enrollments</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-52 w-full" role="img" aria-label="Revenue and enrollments trend">
        {[0, 10000, 20000, 30000, 40000, 50000].map((g) => (
          <g key={g}>
            <line x1={padL} y1={yRev(g)} x2={W - padR} y2={yRev(g)} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 4" />
            <text x={padL - 6} y={yRev(g) + 3} textAnchor="end" className="fill-ink-subtle" style={{ fontSize: 9 }}>{g === 0 ? "$0" : `$${g / 1000}K`}</text>
          </g>
        ))}
        {REVENUE_TREND.map((p, i) => (
          <rect key={p.label} x={x(i) - barW / 2} y={yRev(p.revenue)} width={barW} height={padT + plotH - yRev(p.revenue)} rx="3" className="fill-primary" />
        ))}
        <path d={line} fill="none" stroke="var(--color-violet)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {REVENUE_TREND.map((p, i) => (<circle key={p.label} cx={x(i)} cy={yEnr(p.enrollments)} r="3.5" fill="var(--color-surface)" stroke="var(--color-violet)" strokeWidth="2.5" />))}
        {REVENUE_TREND.map((p, i) => (<text key={p.label} x={x(i)} y={H - 8} textAnchor="middle" className="fill-ink-subtle" style={{ fontSize: 9 }}>{p.label}</text>))}
      </svg>
    </section>
  );
}
