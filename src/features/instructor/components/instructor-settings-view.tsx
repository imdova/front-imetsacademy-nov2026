"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  Building2,
  Camera,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Link2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  User,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Account & Security", icon: ShieldCheck },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "teaching", label: "Teaching Preferences", icon: GraduationCap },
  { key: "payouts", label: "Payouts", icon: Wallet },
  { key: "integrations", label: "Integrations", icon: Link2 },
] as const;
type TabKey = (typeof TABS)[number]["key"];

const EXPERTISE = ["Strategic Management", "Leadership", "Business Analytics", "Operations", "Change Management"];

const COMPLETION = [
  { label: "Basic Information", done: true },
  { label: "Professional Details", done: true },
  { label: "About Me", done: true },
  { label: "Add Qualifications / Certificates", done: false },
  { label: "Areas of Expertise", done: true },
];

export function InstructorSettingsView() {
  const [tab, setTab] = useState<TabKey>("profile");
  const [about, setAbout] = useState(
    "Strategy and leadership expert with over 10 years of experience in strategic management, business operations, and digital transformation. Passionate about building high-performing teams and driving measurable business outcomes.",
  );
  const [tags, setTags] = useState(EXPERTISE);
  const [twoFactor, setTwoFactor] = useState(true);
  const ring = 2 * Math.PI * 34;
  const completion = 85;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="text-body-sm"><span className="font-medium text-primary">Settings</span></nav>
      <div className="flex items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><Save className="size-6" aria-hidden="true" /></span>
        <div>
          <h1 className="text-h1 text-ink">Settings</h1>
          <p className="mt-1 text-body text-ink-muted">Manage your instructor account, profile, security, and preferences.</p>
        </div>
      </div>

      {/* Top tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary bg-primary text-on-dark" : "border-border bg-surface text-ink-muted hover:border-primary/40")}>
            <t.icon className="size-4" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main */}
          <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <h2 className="inline-flex items-center gap-2 text-h4 text-ink"><User className="size-5 text-primary" aria-hidden="true" />Professional Profile</h2>
            <p className="text-body-sm text-ink-muted">Update your public instructor profile and professional information.</p>

            {/* Cover + avatar */}
            <div className="mt-5">
              <div className="relative h-36 overflow-hidden rounded-xl bg-linear-to-r from-primary to-navy-900">
                <button type="button" className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-caption font-semibold text-on-dark backdrop-blur hover:bg-white/25">
                  <ImageIcon className="size-4" aria-hidden="true" />Change Cover
                </button>
              </div>
              <div className="flex items-end gap-4 px-2">
                <div className="relative -mt-10">
                  <div className="rounded-2xl ring-4 ring-surface"><Avatar initials="AA" size="lg" className="size-24 rounded-2xl text-h2" /></div>
                  <button type="button" aria-label="Change photo" className="absolute end-1 bottom-1 inline-flex size-7 items-center justify-center rounded-full bg-primary text-on-dark ring-2 ring-surface"><Camera className="size-3.5" aria-hidden="true" /></button>
                </div>
                <div className="pb-1">
                  <p className="flex items-center gap-2 text-h3 text-ink">Dr. Ahmed Ali <span className="inline-flex items-center gap-1 rounded-pill bg-primary-50 px-2 py-0.5 text-caption font-semibold text-primary"><GraduationCap className="size-3.5" aria-hidden="true" />Instructor</span></p>
                  <p className="text-body-sm text-ink-muted">Strategic Management & Leadership Expert</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required><input defaultValue="Dr. Ahmed Ali" className={inputCls} /></Field>
              <Field label="Professional Title" required><input defaultValue="Strategic Management & Leadership Expert" className={inputCls} /></Field>
              <Field label="Email" required><IconInput icon={Mail}><input type="email" defaultValue="ahmed.ali@imets.academy" className={cn(inputCls, "ps-10")} /></IconInput></Field>
              <Field label="Phone Number"><IconInput icon={Phone}><input type="tel" defaultValue="+20 100 123 4567" className={cn(inputCls, "ps-10")} /></IconInput></Field>
              <Field label="Organization / Affiliation"><IconInput icon={Building2}><input defaultValue="IMETS Business School" className={cn(inputCls, "ps-10")} /></IconInput></Field>
              <Field label="Location"><div className="relative flex items-center"><MapPin className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" /><select defaultValue="Cairo, Egypt" className={cn(inputCls, "ps-10 pe-9 cursor-pointer appearance-none")}><option>Cairo, Egypt</option><option>Riyadh, Saudi Arabia</option><option>Dubai, UAE</option></select><ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" /></div></Field>
            </div>

            <div className="mt-5">
              <Field label="About Me" required>
                <div className="relative">
                  <textarea rows={3} value={about} onChange={(e) => setAbout(e.target.value.slice(0, 500))} className={cn(inputCls, "h-auto resize-none py-3")} />
                  <span className="pointer-events-none absolute bottom-2 end-3 text-caption text-ink-subtle">{about.length} / 500</span>
                </div>
              </Field>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-body-sm font-semibold text-ink">Areas of Expertise</p>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-pill bg-primary-50 px-3 py-1.5 text-caption font-semibold text-primary">
                    {t}
                    <button type="button" aria-label={`Remove ${t}`} onClick={() => setTags((ts) => ts.filter((x) => x !== t))} className="text-primary/70 hover:text-primary"><X className="size-3.5" aria-hidden="true" /></button>
                  </span>
                ))}
                <button type="button" aria-label="Add expertise" className="inline-flex size-8 items-center justify-center rounded-pill border border-border-input text-ink-muted hover:border-primary hover:text-primary"><Plus className="size-4" aria-hidden="true" /></button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button><CircleCheck className="size-4" aria-hidden="true" />Save Changes</Button>
            </div>
          </div>

          {/* Rail */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><BadgeCheck className="size-5 text-primary" aria-hidden="true" />Profile Completion</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative size-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
                    <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" className="stroke-surface-alt" />
                    <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-primary" strokeDasharray={ring} strokeDashoffset={ring * (1 - completion / 100)} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-body font-extrabold text-ink">{completion}%</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-semibold text-ink">Your profile is almost complete!</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {COMPLETION.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-body-sm">
                    {c.done ? <CircleCheck className="size-4 shrink-0 text-success" aria-hidden="true" /> : <span className="size-4 shrink-0 rounded-full border-2 border-border-input" />}
                    <span className={cn("flex-1", c.done ? "text-ink" : "text-ink-muted")}>{c.label}</span>
                    {!c.done && <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />}
                  </li>
                ))}
              </ul>
              <Button variant="outline-primary" block className="mt-4">Complete Your Profile</Button>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><ShieldCheck className="size-5 text-primary" aria-hidden="true" />Verification Status</h3>
                <span className="inline-flex items-center gap-1 rounded-pill bg-success-50 px-2.5 py-1 text-caption font-bold text-success"><CircleCheck className="size-3.5" aria-hidden="true" />Verified</span>
              </div>
              <p className="mt-3 text-body-sm text-ink-muted">Your instructor account is verified. You can publish materials, manage assessments, and communicate with your students.</p>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Zap className="size-5 text-primary" aria-hidden="true" />Quick Actions</h3>
              <ul className="mt-4 space-y-1">
                <QuickRow icon={Lock} label="Change Password" />
                <li className="flex items-center justify-between gap-3 px-2 py-2.5">
                  <span className="inline-flex items-center gap-3 text-body-sm text-ink"><ShieldCheck className="size-4 text-ink-subtle" aria-hidden="true" />Two-Factor Authentication (2FA)</span>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} aria-label="Two-factor authentication" />
                </li>
                <QuickRow icon={Globe} label="Language & Region" trailing="English (EN)" />
                <li>
                  <button type="button" className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-body-sm hover:bg-danger-50">
                    <span className="inline-flex items-center gap-3 font-semibold text-danger"><Trash2 className="size-4" aria-hidden="true" />Delete Account</span>
                    <ChevronRight className="size-4 text-danger" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">{(() => { const Icon = TABS.find((t) => t.key === tab)!.icon; return <Icon className="size-6" aria-hidden="true" />; })()}</span>
          <p className="text-h4 text-ink">{TABS.find((t) => t.key === tab)!.label}</p>
          <p className="max-w-sm text-body-sm text-ink-subtle">This settings section is part of the instructor preview and will be wired to the backend next.</p>
        </div>
      )}
    </div>
  );
}

const inputCls = "h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (<div className="space-y-1.5"><label className="block text-body-sm font-semibold text-ink">{label}{required && <span className="text-danger"> *</span>}</label>{children}</div>);
}
function IconInput({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (<div className="relative flex items-center"><Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />{children}</div>);
}
function QuickRow({ icon: Icon, label, trailing }: { icon: LucideIcon; label: string; trailing?: string }) {
  return (
    <li>
      <button type="button" className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-body-sm text-ink hover:bg-surface-alt">
        <span className="inline-flex items-center gap-3"><Icon className="size-4 text-ink-subtle" aria-hidden="true" />{label}</span>
        <span className="inline-flex items-center gap-2 text-ink-subtle">{trailing && <span className="text-caption">{trailing}</span>}<ChevronRight className="size-4" aria-hidden="true" /></span>
      </button>
    </li>
  );
}
