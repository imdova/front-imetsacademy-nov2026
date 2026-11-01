"use client";

import { useState } from "react";
import {
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  CircleCheck,
  ExternalLink,
  GraduationCap,
  BookOpen,
  Globe,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  PlayCircle,
  Settings,
  Star,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "courses", label: "Courses", icon: GraduationCap },
  { key: "students", label: "Students", icon: Users },
  { key: "earnings", label: "Earnings", icon: BarChart3 },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "settings", label: "Settings", icon: Settings },
] as const;
type TabKey = (typeof TABS)[number]["key"];

const INFO = [
  { icon: User, label: "Full Name", value: "Dr. Ahmed Ali" },
  { icon: Briefcase, label: "Professional Title", value: "Strategic Management Consultant" },
  { icon: Mail, label: "Email", value: "ahmed.ali@imets.academy" },
  { icon: Building2, label: "Organization", value: "IMETS Business School" },
  { icon: Phone, label: "Phone", value: "+20 100 123 4567" },
  { icon: MapPin, label: "Location", value: "Cairo, Egypt" },
];
const EXPERTISE = ["Strategic Management", "Leadership", "Business Operations", "Change Management", "Business Analytics", "Digital Transformation", "Corporate Strategy"];
const COMPLETION = [
  { label: "Basic Information", done: true },
  { label: "About Me", done: true },
  { label: "Areas of Expertise", done: true },
  { label: "Social Links", done: true },
  { label: "Profile Cover (Optional)", done: false },
];
const SOCIAL = [
  { label: "LinkedIn", icon: Link2 },
  { label: "ResearchGate", icon: BookOpen },
  { label: "Google Scholar", icon: GraduationCap },
  { label: "Personal Website", icon: Globe },
];

export function InstructorProfileView() {
  const [tab, setTab] = useState<TabKey>("profile");
  const ring = 2 * Math.PI * 34;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-navy-900 p-5 text-on-dark md:p-6">
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
          <Avatar initials="AA" size="lg" className="size-24 ring-4 ring-white/20" />
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-h2 text-on-dark">Dr. Ahmed Ali <span className="inline-flex items-center gap-1 rounded-pill bg-white/15 px-2 py-0.5 text-caption font-semibold text-on-dark"><GraduationCap className="size-3.5" aria-hidden="true" />Instructor</span></p>
            <p className="text-body text-white/80">Strategic Management & Leadership Expert</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <HeroStat icon={Users} value="12,460" label="Total Students" />
              <HeroStat icon={PlayCircle} value="8" label="Courses" />
              <HeroStat icon={Star} value="4.9" label="Avg. Rating" />
              <HeroStat icon={BarChart3} value="98%" label="Completion Rate" />
            </div>
          </div>
          <Button variant="accent" className="shrink-0 self-start">View Public Profile<ExternalLink className="size-4" aria-hidden="true" /></Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
            <t.icon className="size-4" aria-hidden="true" />{t.label}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <Card title="Profile Information" icon={User} action="Edit Profile">
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {INFO.map((r) => (
                  <div key={r.label} className="flex items-start gap-3">
                    <r.icon className="mt-0.5 size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
                    <div className="min-w-0"><dt className="text-caption text-ink-subtle">{r.label}</dt><dd className="truncate font-semibold text-ink">{r.value}</dd></div>
                  </div>
                ))}
              </dl>
            </Card>

            <Card title="About Me" icon={User} action="Edit">
              <p className="text-body-sm text-ink-muted">
                Strategic management and leadership expert with over 15 years of experience in corporate
                strategy, business operations, and organizational change. Passionate about building
                business professionals&rsquo; capabilities through practical, real-world training and mentorship.
              </p>
            </Card>

            <Card title="Areas of Expertise" icon={Settings} action="Edit">
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((e) => (<span key={e} className="rounded-pill bg-primary-50 px-3 py-1.5 text-caption font-semibold text-primary">{e}</span>))}
              </div>
            </Card>

            <Card title="Social & Professional Links" icon={Link2} action="Edit">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SOCIAL.map((s) => (
                  <button key={s.label} type="button" className="inline-flex items-center gap-2 rounded-lg border border-border-input px-3 py-2.5 text-body-sm font-medium text-ink hover:border-primary hover:text-primary">
                    <s.icon className="size-4 text-primary" aria-hidden="true" />{s.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Rail */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="text-h4 text-ink">Profile Completion</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative size-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
                    <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" className="stroke-surface-alt" />
                    <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-primary" strokeDasharray={ring} strokeDashoffset={ring * (1 - 90 / 100)} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-body font-extrabold text-ink">90%</span>
                </div>
                <p className="flex-1 text-body-sm font-semibold text-ink">Your profile is almost complete!</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {COMPLETION.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-body-sm">
                    {c.done ? <CircleCheck className="size-4 shrink-0 text-success" aria-hidden="true" /> : <span className="size-4 shrink-0 rounded-full border-2 border-border-input" />}
                    <span className={c.done ? "text-ink" : "text-ink-muted"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><BadgeCheck className="size-5 text-primary" aria-hidden="true" />Verification &amp; Status</h3>
              <ul className="mt-4 space-y-3 text-body-sm">
                {["Email Verified", "Instructor Approved", "Profile Published"].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-ink"><CircleCheck className="size-4 text-success" aria-hidden="true" />{v}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-primary-50/50 p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-dark"><Award className="size-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-body font-bold text-ink">Enhance Your Profile</p>
                  <p className="mt-1 text-body-sm text-ink-muted">Add your CV, certifications, and professional achievements to build more trust with students.</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">{(() => { const Icon = TABS.find((t) => t.key === tab)!.icon; return <Icon className="size-6" aria-hidden="true" />; })()}</span>
          <p className="text-h4 text-ink">{TABS.find((t) => t.key === tab)!.label}</p>
          <p className="max-w-sm text-body-sm text-ink-subtle">This tab is part of the instructor preview and will be wired to the backend next.</p>
        </div>
      )}
    </div>
  );
}

function HeroStat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="size-5 text-white/70" aria-hidden="true" />
      <span className="text-on-dark"><span className="font-extrabold">{value}</span> <span className="text-caption text-white/70">{label}</span></span>
    </span>
  );
}

function Card({ title, icon: Icon, action, children }: { title: string; icon: LucideIcon; action: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-h4 text-ink"><Icon className="size-5 text-primary" aria-hidden="true" />{title}</h2>
        <Button variant="outline" size="sm"><Pencil className="size-4" aria-hidden="true" />{action}</Button>
      </div>
      {children}
    </section>
  );
}
