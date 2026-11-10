import {
  Activity,
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock,
  CornerUpLeft,
  Globe,
  MailMinus,
  Plug,
  Plus,
  Settings,
  Shield,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { EmCard, PageHeader, Pill, StatusBadge } from "@/components/email-marketing/em-ui";
import { EmTabs } from "@/components/email-marketing/em-tabs";
import { cn } from "@/lib/utils";

const sections: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Sender Profiles", icon: UserRound, active: true },
  { label: "Sending Domains & DNS", icon: Globe },
  { label: "Reply-To Addresses", icon: CornerUpLeft },
  { label: "Tracking Preferences", icon: Activity },
  { label: "Unsubscribe & Preference Center", icon: MailMinus },
  { label: "Suppression Lists", icon: Ban },
  { label: "Integrations", icon: Plug },
  { label: "Roles & Permissions", icon: Shield },
];

const senders = [
  { name: "IMETS Medical School", email: "info@imetsacademy.com", def: true },
  { name: "Admissions Team", email: "admissions@imetsacademy.com", def: false },
  { name: "Support", email: "support@imetsacademy.com", def: false },
];

const domains = [
  { domain: "imetsacademy.com", status: "verified" as const, records: "SPF · DKIM · DMARC" },
  { domain: "mail.imetsacademy.com", status: "pending" as const, records: "DKIM pending" },
];

const tracking = [
  { label: "Open tracking", desc: "Track unique and total opens via a tracking pixel.", on: true },
  { label: "Click tracking", desc: "Rewrite links to measure unique and total clicks.", on: true },
  { label: "UTM parameters", desc: "Append campaign UTM tags to outbound links.", on: true },
  { label: "Plain-text alternative", desc: "Include a plain-text version with every HTML email.", on: true },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
      style={{ background: on ? "var(--em-primary)" : "var(--em-border)" }}
      role="switch"
      aria-checked={on}
    >
      <span className={cn("absolute size-5 rounded-full bg-white shadow transition-all", on ? "end-0.5" : "start-0.5")} />
    </span>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Settings"]}
        icon={Settings}
        title="Email Marketing – Settings"
        description="Sender profiles, sending domains, reply-to addresses, tracking, unsubscribe center, suppression lists, and integrations."
        right={
          <>
            <Pill icon={Globe}>test.imetsacademy.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Section rail */}
        <EmCard className="lg:col-span-3" title="Settings" icon={Settings}>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                    s.active ? "text-white" : "text-[var(--em-text-body)] hover:bg-[var(--em-blue-50)]",
                  )}
                  style={s.active ? { background: "var(--em-primary)" } : undefined}
                >
                  <s.icon className={cn("size-4 shrink-0", s.active ? "text-white" : "text-[var(--em-text-muted)]")} aria-hidden="true" />
                  <span className="text-start">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </EmCard>

        {/* Main */}
        <div className="space-y-4 lg:col-span-9">
          <EmCard
            title="Sender Profiles"
            icon={UserRound}
            action={
              <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-semibold text-white" style={{ background: "var(--em-primary)" }}>
                <Plus className="size-4" aria-hidden="true" /> Add Sender Profile
              </button>
            }
          >
            <ul className="divide-y" style={{ borderColor: "var(--em-neutral-100)" }}>
              {senders.map((s) => (
                <li key={s.email} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="grid size-10 place-items-center rounded-full bg-[var(--em-blue-100)] text-[13px] font-bold text-[var(--em-primary)]">
                    {s.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </span>
                  <div className="flex-1">
                    <p className="flex items-center gap-2 text-[14px] font-semibold text-[var(--em-text-primary)]">
                      {s.name}
                      {s.def && (
                        <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ color: "var(--em-primary)", background: "var(--em-blue-100)" }}>Default</span>
                      )}
                    </p>
                    <p className="em-num text-[12.5px] text-[var(--em-text-secondary)]">{s.email}</p>
                  </div>
                  <button type="button" className="text-[12.5px] font-semibold text-[var(--em-primary)]">Edit</button>
                </li>
              ))}
            </ul>
          </EmCard>

          <EmCard title="Sending Domains & DNS Verification" icon={Globe}>
            <ul className="space-y-3">
              {domains.map((d) => (
                <li key={d.domain} className="flex items-center justify-between gap-3 rounded-xl border p-3.5" style={{ borderColor: "var(--em-border)" }}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                      <Globe className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="em-num text-[14px] font-semibold text-[var(--em-text-primary)]">{d.domain}</p>
                      <p className="text-[12px] text-[var(--em-text-secondary)]">{d.records}</p>
                    </div>
                  </div>
                  {d.status === "verified" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ color: "var(--em-success)", background: "var(--em-success-bg)" }}>
                      <CheckCircle2 className="size-3.5" aria-hidden="true" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ color: "var(--em-paused)", background: "var(--em-warning-bg)" }}>
                      <Clock className="size-3.5" aria-hidden="true" /> Pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-[var(--em-text-muted)]">
              Domains are shown as verified only after backend DNS checks pass.
            </p>
          </EmCard>

          <EmCard title="Tracking Preferences" icon={Activity}>
            <ul className="divide-y" style={{ borderColor: "var(--em-neutral-100)" }}>
              {tracking.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--em-text-primary)]">{t.label}</p>
                    <p className="text-[12.5px] text-[var(--em-text-secondary)]">{t.desc}</p>
                  </div>
                  <Toggle on={t.on} />
                </li>
              ))}
            </ul>
          </EmCard>
        </div>
      </div>
    </div>
  );
}
