"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  Code2,
  CreditCard,
  Database,
  Globe,
  Info,
  Layers,
  Lock,
  Mail,
  Palette,
  Phone,
  Save,
  Settings,
  Trash2,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

type SectionKey =
  | "general"
  | "branding"
  | "email-templates"
  | "payments"
  | "integrations"
  | "notifications"
  | "roles"
  | "course-settings"
  | "enrollment"
  | "certificates"
  | "seo"
  | "localization"
  | "backup";

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon }[] = [
  { key: "general", label: "General Settings", icon: Settings },
  { key: "branding", label: "Site & Branding", icon: Palette },
  { key: "email-templates", label: "Email Templates", icon: Mail },
  { key: "payments", label: "Payment & Payouts", icon: CreditCard },
  { key: "integrations", label: "Integrations", icon: Code2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "roles", label: "User & Roles", icon: Users },
  { key: "course-settings", label: "Course Settings", icon: Layers },
  { key: "enrollment", label: "Enrollment & Access", icon: Lock },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "seo", label: "SEO & Analytics", icon: BarChart3 },
  { key: "localization", label: "Localization", icon: Globe },
  { key: "backup", label: "Backup & Maintenance", icon: Database },
];

export function SettingsView() {
  const [section, setSection] = useState<SectionKey>("general");
  const current = SECTIONS.find((s) => s.key === section)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* Sub-nav */}
      <nav className="rounded-xl border border-border bg-surface p-2">
        <ul className="space-y-1">
          {SECTIONS.map((s) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => setSection(s.key)}
                aria-current={section === s.key ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors",
                  section === s.key ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt hover:text-ink",
                )}
              >
                <s.icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-start">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <current.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-h3 text-ink">{current.label}</h2>
              <p className="text-body-sm text-ink-muted">
                {section === "general"
                  ? "Configure the core settings of your IMETS Academy platform."
                  : `Manage your ${current.label.toLowerCase()}.`}
              </p>
            </div>
          </div>
          <Button className="shrink-0">
            <Save className="size-4" aria-hidden="true" />
            Save Changes
          </Button>
        </div>

        {section === "general" ? <GeneralSettings /> : <Placeholder label={current.label} Icon={current.icon} />}
      </div>
    </div>
  );
}

function GeneralSettings() {
  const [prefs, setPrefs] = useState({
    registration: true,
    emailVerify: true,
    guest: true,
    maintenance: false,
  });

  return (
    <div className="mt-6 space-y-6">
      {/* Platform Information */}
      <section className="rounded-xl border border-border p-5">
        <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
          <Info className="size-5 text-primary" aria-hidden="true" />
          Platform Information
        </h3>
        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_240px]">
          <div className="space-y-5">
            <Field label="Platform Name" required>
              <input defaultValue="IMETS Academy" className={inputCls} />
            </Field>
            <Field label="Tagline">
              <input defaultValue="Learn. Lead. Advance." className={inputCls} />
            </Field>
          </div>
          <div className="space-y-5">
            <Field label="Support Email" required>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
                <input type="email" defaultValue="support@imets.academy" className={cn(inputCls, "ps-9")} />
              </div>
            </Field>
            <Field label="Contact Phone">
              <div className="relative flex items-center">
                <Phone className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
                <input type="tel" defaultValue="+20 100 123 4567" className={cn(inputCls, "ps-9")} />
              </div>
            </Field>
          </div>
          <div>
            <p className="mb-1.5 text-body-sm font-semibold text-ink">Platform Logo</p>
            <div className="flex items-center gap-2 rounded-lg border border-border-input p-3">
              <div className="flex h-12 flex-1 items-center justify-center rounded-md bg-surface-alt">
                <Logo className="h-7 w-auto" />
              </div>
              <button type="button" aria-label="Upload logo" className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary hover:text-primary">
                <Upload className="size-4" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Remove logo" className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-danger hover:text-danger">
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-caption text-ink-subtle">Recommended: PNG or SVG, 200 × 60 px</p>
          </div>
        </div>
      </section>

      {/* Preferences + defaults */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border p-5">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Globe className="size-5 text-primary" aria-hidden="true" />
            Platform Preferences
          </h3>
          <ul className="mt-4 space-y-4">
            <PrefRow icon={Globe} title="Enable User Registration" hint="Allow new users to create accounts." checked={prefs.registration} onChange={(v) => setPrefs((p) => ({ ...p, registration: v }))} />
            <PrefRow icon={Mail} title="Require Email Verification" hint="Users must verify their email before login." checked={prefs.emailVerify} onChange={(v) => setPrefs((p) => ({ ...p, emailVerify: v }))} />
            <PrefRow icon={Users} title="Enable Guest Browsing" hint="Allow visitors to view courses without login." checked={prefs.guest} onChange={(v) => setPrefs((p) => ({ ...p, guest: v }))} />
            <PrefRow icon={Lock} title="Maintenance Mode" hint="Put the platform in maintenance mode." checked={prefs.maintenance} onChange={(v) => setPrefs((p) => ({ ...p, maintenance: v }))} />
          </ul>
        </section>

        <section className="rounded-xl border border-border p-5">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Layers className="size-5 text-primary" aria-hidden="true" />
            Default Settings
          </h3>
          <div className="mt-4 space-y-4">
            <SelectRow icon={Globe} label="Default Language" defaultValue="English" options={["English", "العربية", "Français"]} />
            <SelectRow icon={Layers} label="Default Currency" defaultValue="USD ( $ )" options={["USD ( $ )", "EGP ( £ )", "EUR ( € )", "SAR ( ﷼ )"]} />
            <SelectRow icon={Clock} label="Default Time Zone" defaultValue="(GMT+02:00) Cairo" options={["(GMT+02:00) Cairo", "(GMT+03:00) Riyadh", "(GMT+04:00) Dubai"]} />
            <SelectRow icon={Calendar} label="Date Format" defaultValue="Oct 17, 2026" options={["Oct 17, 2026", "17 Oct 2026", "17/10/2026", "2026-10-17"]} />
          </div>
        </section>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickCard icon={Mail} title="Email Settings" desc="Configure SMTP and email templates for platform communications." />
        <QuickCard icon={CreditCard} title="Payment Gateways" desc="Set up and manage payment methods (Stripe, PayPal, etc.)." />
        <QuickCard icon={Code2} title="Integrations" desc="Connect with third-party tools (Zoom, Google, etc.)." />
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-body-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
    </div>
  );
}

function PrefRow({ icon: Icon, title, hint, checked, onChange }: { icon: LucideIcon; title: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-body-sm font-bold text-ink">{title}</p>
          <p className="text-caption text-ink-subtle">{hint}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
    </li>
  );
}

function SelectRow({ icon: Icon, label, defaultValue, options }: { icon: LucideIcon; label: string; defaultValue: string; options: string[] }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-body-sm font-medium text-ink">{label}</span>
      <label className="relative inline-flex min-w-[180px] items-center">
        <Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
        <span className="sr-only">{label}</span>
        <select defaultValue={defaultValue} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-9 pe-9 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
          {options.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
      </label>
    </div>
  );
}

function QuickCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface-alt/40 p-5">
      <span className="inline-flex items-center gap-2 text-h4 text-ink">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        {title}
      </span>
      <p className="mt-2 flex-1 text-body-sm text-ink-muted">{desc}</p>
      <Button variant="outline-primary" size="sm" className="mt-4 self-start">
        Configure
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

function Placeholder({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-20 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <p className="text-h4 text-ink">{label}</p>
      <p className="max-w-sm text-body-sm text-ink-subtle">
        This settings section is part of the admin preview and will be wired to the backend next.
      </p>
    </div>
  );
}
