"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Play,
  Plus,
  Star,
  Target,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/features/crm/data";
import { SOURCE_LABEL, StatusPill } from "@/features/crm/components/shared";

const STAGES: { key: LeadStatus; label: string }[] = [
  { key: "new", label: "New Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "followup", label: "Follow-up" },
  { key: "enrolled", label: "Enrolled" },
];

const TABS = [
  { key: "activities", label: "Activities", icon: ListChecks },
  { key: "deals", label: "Deals (1)", icon: Target },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "enrollments", label: "Enrollments", icon: GraduationCap },
  { key: "notes", label: "Notes", icon: FileText },
  { key: "files", label: "Files", icon: Paperclip },
] as const;

export function LeadDetails({ lead }: { lead: Lead }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("activities");
  const currentStage = STAGES.findIndex((s) => s.key === lead.status);
  const stageIdx = currentStage === -1 ? 2 : currentStage;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm">
          <Link href={routes.admin.crm.overview} className="font-medium text-primary hover:underline">CRM</Link><ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
          <Link href={routes.admin.crm.leads} className="font-medium text-primary hover:underline">Leads</Link><ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
          <span className="font-semibold text-ink">Lead Details</span>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm"><Link href={routes.admin.crm.leads}><ArrowLeft className="size-4" aria-hidden="true" />Back to Leads</Link></Button>
          <Button variant="outline" size="sm"><ChevronLeft className="size-4" aria-hidden="true" />Previous</Button>
          <Button variant="outline" size="sm">Next<ChevronRight className="size-4" aria-hidden="true" /></Button>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-on-dark"><GraduationCap className="size-6" aria-hidden="true" /></span>
        <div><h1 className="text-h1 text-ink">Lead Details (360&deg; Profile)</h1><p className="mt-1 text-body text-ink-muted">Complete view of the lead, activities, deals, payments, and enrollment history.</p></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        {/* Left */}
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-start gap-3">
              <Avatar initials={lead.initials} size="lg" />
              <div className="min-w-0 flex-1"><p className="flex items-center gap-1.5 text-h4 text-ink">{lead.name} <Star className="size-4 fill-orange text-orange" aria-hidden="true" /></p><p className="text-caption text-ink-subtle">{lead.role}</p><div className="mt-1.5 flex items-center gap-2"><StatusPill status={lead.status} /><span className="text-caption text-ink-subtle">Lead Score: <b className="text-ink">{lead.score}</b></span></div></div>
            </div>
            <ul className="mt-4 space-y-2.5 text-body-sm">
              <li className="flex items-center justify-between gap-2"><span className="inline-flex items-center gap-2 text-ink"><Phone className="size-4 text-ink-subtle" aria-hidden="true" />{lead.phone}</span><Copy className="size-4 text-ink-subtle" aria-hidden="true" /></li>
              <li className="flex items-center justify-between gap-2"><span className="inline-flex items-center gap-2 truncate text-ink"><Mail className="size-4 text-ink-subtle" aria-hidden="true" />{lead.email}</span><Copy className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" /></li>
              <li className="inline-flex items-center gap-2 font-semibold text-success"><MessageCircle className="size-4" aria-hidden="true" />Chat on WhatsApp</li>
              <li className="inline-flex items-center gap-2 text-ink-muted"><MapPin className="size-4 text-ink-subtle" aria-hidden="true" />{lead.location}</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><FileText className="size-5 text-primary" aria-hidden="true" />Lead Information</h3>
            <dl className="mt-4 space-y-3 text-body-sm">
              <Row label="Interested In" value={lead.interestedIn} />
              <Row label="Source" value={`${SOURCE_LABEL[lead.source]} (#STRAT-01)`} />
              <Row label="Owner" value={lead.owner} />
              <Row label="Created" value="Oct 28, 2026 – 11:20 AM" />
              <Row label="Last Activity" value="Oct 30, 2026 – 02:15 PM" />
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Target className="size-5 text-primary" aria-hidden="true" />Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Strategy", "Priority"].map((t) => (<span key={t} className="inline-flex items-center gap-1 rounded-pill bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary">{t} <span className="text-primary/60">×</span></span>))}
              <span className="inline-flex items-center gap-1 rounded-pill bg-rose-50 px-2.5 py-1 text-caption font-semibold text-danger">Hot Lead <span className="text-danger/60">×</span></span>
              <button type="button" className="inline-flex items-center gap-1 rounded-pill border border-border-input px-2.5 py-1 text-caption font-semibold text-ink-muted hover:border-primary hover:text-primary"><Plus className="size-3.5" aria-hidden="true" />Add Tag</button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><CalendarClock className="size-5 text-primary" aria-hidden="true" />Next Action</h3>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div><p className="text-body-sm text-ink-muted">Follow up and send course offer</p><p className="text-caption font-semibold text-danger">Due: Today, 04:00 PM</p></div>
              <Button size="sm" variant="outline">Set Reminder</Button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Target className="size-5 text-primary" aria-hidden="true" />Quick Actions</h3>
            <div className="mt-3 grid grid-cols-5 gap-2 text-center">
              {[["Call", Phone], ["WhatsApp", MessageCircle], ["Email", Mail], ["Schedule", CalendarClock], ["Create Deal", Target]].map(([label, Icon]) => { const I = Icon as LucideIcon; return (<button key={label as string} type="button" className="flex flex-col items-center gap-1 rounded-lg border border-border-input py-2 text-[10px] font-semibold text-ink-muted hover:border-primary hover:text-primary"><I className="size-4" aria-hidden="true" />{label as string}</button>); })}
            </div>
            <Button block className="mt-3"><GraduationCap className="size-4" aria-hidden="true" />Convert to Enrollment</Button>
          </section>
        </div>

        {/* Center */}
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Users className="size-5 text-primary" aria-hidden="true" />Lead Pipeline</h3>
              <span className="rounded-lg bg-primary-50 px-3 py-1.5 text-center"><span className="block text-h4 font-extrabold text-primary">12 Days</span><span className="block text-caption text-ink-subtle">In Pipeline</span></span>
            </div>
            <ol className="mt-5 flex items-center">
              {STAGES.map((s, i) => {
                const done = i < stageIdx, current = i === stageIdx;
                return (
                  <li key={s.key} className="flex flex-1 flex-col items-center last:flex-none">
                    <div className="flex w-full items-center">
                      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-caption font-bold", done ? "border-primary bg-primary text-on-dark" : current ? "border-primary bg-primary text-on-dark" : "border-border-input bg-surface text-ink-subtle")}>{done ? <Check className="size-4" aria-hidden="true" /> : current ? <span className="size-2.5 rounded-full bg-on-dark" /> : i + 1}</span>
                      {i < STAGES.length - 1 && <span className={cn("h-0.5 flex-1", i < stageIdx ? "bg-primary" : "bg-border")} />}
                    </div>
                    <span className={cn("mt-1.5 text-caption font-semibold", current ? "text-primary" : "text-ink-muted")}>{s.label}</span>
                  </li>
                );
              })}
            </ol>
          </section>

          <div className="flex gap-1 overflow-x-auto border-b border-border">
            {TABS.map((t) => (<button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}><t.icon className="size-4" aria-hidden="true" />{t.label}</button>))}
          </div>

          {tab === "activities" ? (
            <section className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between"><h3 className="inline-flex items-center gap-2 text-h4 text-ink"><ListChecks className="size-5 text-primary" aria-hidden="true" />Activity Timeline</h3><select className="h-9 rounded-md border border-border-input bg-surface px-2 text-caption text-ink"><option>All Activities</option></select></div>
              <ul className="mt-4 space-y-4">
                <Activity icon={MessageCircle} tint="bg-success-50 text-success" time="Today, Oct 30, 2026 – 02:15 PM" title="WhatsApp Message (Outbound)" body="Sent course offer and installment plan details." owner="Ahmed Saleh" />
                <Activity icon={Phone} tint="bg-primary-50 text-primary" time="Today, Oct 30, 2026 – 11:30 AM" title="Phone Call" body="Discussed course details, duration, and payment options." owner="Ahmed Saleh" audio />
                <Activity icon={Mail} tint="bg-violet-50 text-violet" time="Oct 29, 2026 – 04:20 PM" title="Email Sent" body="Sent course brochure, curriculum, and early-bird discount." owner="Ahmed Saleh" file="Strategic_Management.pdf (2.4 MB)" />
                <Activity icon={UserPlus} tint="bg-surface-alt text-ink-muted" time="Oct 28, 2026 – 11:20 AM" title="Lead Created" body="New lead from Meta Ads (Campaign #STRAT-01)." owner="System" last />
              </ul>
              <div className="mt-4 flex justify-center"><Button variant="outline"><Plus className="size-4" aria-hidden="true" />Add Activity</Button></div>
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center"><span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">{(() => { const Icon = TABS.find((t) => t.key === tab)!.icon; return <Icon className="size-6" aria-hidden="true" />; })()}</span><p className="text-h4 text-ink">{TABS.find((t) => t.key === tab)!.label}</p><p className="max-w-sm text-body-sm text-ink-subtle">This tab is part of the preview and will be wired to the backend next.</p></div>
          )}
        </div>

        {/* Right */}
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between"><h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Target className="size-5 text-primary" aria-hidden="true" />Deal Summary</h3><span className="rounded-pill bg-orange-50 px-2.5 py-1 text-caption font-bold text-orange">Open</span></div>
            <p className="mt-3 font-bold text-ink">Strategic Management – Enrollment</p>
            <dl className="mt-3 space-y-2.5 text-body-sm">
              <Row label="Deal Value" value="$1,390" />
              <Row label="Payment Plan" value="Installments (3 × $463)" />
              <div className="flex items-center justify-between gap-3"><dt className="text-ink-subtle">Probability</dt><dd className="flex items-center gap-2"><span className="h-1.5 w-20 overflow-hidden rounded-pill bg-surface-alt"><span className="block h-full rounded-pill bg-success" style={{ width: "80%" }} /></span><b className="text-ink">80%</b></dd></div>
              <Row label="Expected Close" value="Nov 5, 2026" />
            </dl>
            <Button variant="outline-primary" block className="mt-4">View Deal Details<ExternalLink className="size-4" aria-hidden="true" /></Button>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><CreditCard className="size-5 text-primary" aria-hidden="true" />Payment &amp; Installments</h3>
            <dl className="mt-4 space-y-2.5 text-body-sm">
              <Row label="Total Amount" value="$1,390" />
              <Row label="Paid Amount" value="$0" />
              <div className="flex items-center justify-between gap-3"><dt className="text-ink-subtle">Outstanding</dt><dd className="font-bold text-danger">$1,390</dd></div>
              <Row label="Plan" value="3 Installments" />
            </dl>
            <Button variant="outline-primary" block className="mt-4"><CreditCard className="size-4" aria-hidden="true" />Create Payment Plan</Button>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between"><h3 className="inline-flex items-center gap-2 text-h4 text-ink"><FileText className="size-5 text-primary" aria-hidden="true" />Notes</h3><button type="button" className="inline-flex items-center gap-1 text-caption font-semibold text-primary"><Plus className="size-3.5" aria-hidden="true" />Add Note</button></div>
            <div className="mt-3 rounded-lg bg-accent-50 p-3">
              <p className="text-body-sm text-ink">Very interested, asked for installment option. Plan to enroll next week after payroll.</p>
              <p className="mt-2 inline-flex items-center gap-2 text-caption text-ink-subtle"><Avatar initials="AS" size="sm" /> Ahmed Saleh · Oct 30, 2026 – 02:10 PM</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (<div className="flex items-center justify-between gap-3"><dt className="text-ink-subtle">{label}</dt><dd className="text-end font-semibold text-ink">{value}</dd></div>);
}

function Activity({ icon: Icon, tint, time, title, body, owner, audio, file, last }: { icon: LucideIcon; tint: string; time: string; title: string; body: string; owner: string; audio?: boolean; file?: string; last?: boolean }) {
  return (
    <li className="relative flex gap-3">
      {!last && <span className="absolute start-4 top-9 h-[calc(100%-1rem)] w-px bg-border" aria-hidden="true" />}
      <span className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full", tint)}><Icon className="size-4" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1 rounded-lg border border-border p-3">
        <div className="flex items-center justify-between gap-2"><p className="text-caption text-ink-subtle">{time}</p><span className="inline-flex items-center gap-1.5 text-caption text-ink-muted"><Avatar initials={owner.split(" ").map((p) => p[0]).join("")} size="sm" />{owner}</span></div>
        <p className="mt-1 font-bold text-ink">{title}</p>
        <p className="text-body-sm text-ink-muted">{body}</p>
        {audio && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-surface-alt p-2">
            <button type="button" aria-label="Play" className="flex size-7 items-center justify-center rounded-full bg-primary text-on-dark"><Play className="size-3.5 translate-x-px fill-current" aria-hidden="true" /></button>
            <span className="flex-1 text-[11px] text-ink-subtle">▮▮▯▮▮▯▮▮▮▯▮▯▮▮</span>
            <span className="text-caption tabular-nums text-ink-muted">03:24</span>
            <Download className="size-4 text-ink-subtle" aria-hidden="true" />
          </div>
        )}
        {file && (<p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-surface-alt px-2.5 py-1.5 text-caption text-ink"><Paperclip className="size-3.5 text-ink-subtle" aria-hidden="true" />{file}</p>)}
      </div>
    </li>
  );
}
