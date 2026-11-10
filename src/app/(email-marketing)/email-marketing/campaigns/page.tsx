import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock,
  FlaskConical,
  Globe,
  Info,
  Mail,
  MailOpen,
  MousePointerClick,
  MoreHorizontal,
  Pencil,
  ScrollText,
  Send,
  Settings,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { Breadcrumb, EmCard, Pill, StatusBadge } from "@/components/email-marketing/em-ui";
import { DonutChart, LegendRow, LineChart } from "@/components/email-marketing/em-charts";
import { cn } from "@/lib/utils";

const SUBTABS = [
  { label: "Overview", icon: Info, active: true },
  { label: "Email Content", icon: Mail },
  { label: "Audience", icon: Users },
  { label: "A/B Test", icon: FlaskConical },
  { label: "Automations", icon: Workflow },
  { label: "Activity Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];

const results = [
  { label: "Delivered", value: 64280, pct: "98.6%", count: "64,280", color: "var(--em-chart-delivered)" },
  { label: "Opened", value: 27540, pct: "42.8%", count: "27,540", color: "var(--em-chart-opened)" },
  { label: "Clicked", value: 5530, pct: "8.6%", count: "5,530", color: "var(--em-chart-clicked)" },
  { label: "Converted", value: 2705, pct: "4.2%", count: "2,705", color: "var(--em-chart-converted)" },
  { label: "Bounced", value: 900, pct: "1.4%", count: "900", color: "var(--em-chart-other)" },
];

const info: [string, string][] = [
  ["Campaign Name", "CPHQ Course – Oct Intake"],
  ["Subject", "Join Our Next CPHQ Cohort – Become a Certified Healthcare Quality Professional"],
  ["From Name", "IMETS Medical School"],
  ["From Email", "info@imetsacademy.com"],
  ["Reply-To", "support@imetsacademy.com"],
  ["Send Time", "Oct 28, 2026 at 02:14 PM"],
];

const recipients = [
  { label: "Professionals", pct: "48.6%", count: "6,050", icon: Users },
  { label: "Job Seekers", pct: "28.4%", count: "3,540", icon: Users },
  { label: "Students", pct: "18.6%", count: "2,320", icon: Users },
  { label: "Leads", pct: "4.4%", count: "550", icon: Users },
];

function SummaryKpi({
  icon: Icon,
  value,
  label,
  pct,
}: {
  icon: typeof Mail;
  value: string;
  label: string;
  pct: string;
}) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: "var(--em-border)" }}>
      <div className="flex items-start gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <div>
          <p className="em-num text-[20px] font-bold leading-none text-[var(--em-text-primary)]">{value}</p>
          <p className="mt-1 text-[11.5px] text-[var(--em-text-secondary)]">{label}</p>
          <p className="em-num mt-0.5 text-[12px] font-bold text-[var(--em-success)]">{pct}</p>
        </div>
      </div>
    </div>
  );
}

export default function CampaignDetails() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <Breadcrumb items={["Marketing", "Email Marketing", "Campaigns", "Campaign Details"]} />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/email-marketing"
            aria-label="Back"
            className="mt-1 grid size-10 place-items-center rounded-xl border bg-white text-[var(--em-text-secondary)] hover:text-[var(--em-primary)]"
            style={{ borderColor: "var(--em-border)" }}
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-[var(--em-text-primary)]">Campaign Details</h1>
            <p className="mt-1 text-[14px] text-[var(--em-text-secondary)]">
              View performance, content, audience, and settings for this email campaign.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Pill icon={Globe}>test.imetsacademy.com</Pill>
          <Pill icon={CalendarDays}>Last 28 Days</Pill>
        </div>
      </div>

      {/* Summary panel */}
      <EmCard>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div
            className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl lg:w-72"
            style={{ background: "linear-gradient(135deg, var(--em-primary), var(--em-navy))" }}
          >
            <span className="absolute left-3 top-3 flex items-center gap-1.5 text-[11px] font-bold text-white">
              <BookOpen className="size-3.5 text-[var(--em-gold)]" aria-hidden="true" /> IMETS
            </span>
            <span className="absolute left-3 bottom-4 text-[18px] font-extrabold leading-tight text-white">
              CPHQ
              <br />
              Preparation Course
            </span>
            <span className="absolute -right-6 -bottom-6 size-24 rounded-full" style={{ background: "var(--em-gold)", opacity: 0.25 }} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[20px] font-bold text-[var(--em-text-primary)]">CPHQ Course – Oct Intake</h2>
                <StatusBadge status="completed" />
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border bg-white px-3 py-2 text-[13px] font-semibold text-[var(--em-text-body)]"
                style={{ borderColor: "var(--em-border)" }}
              >
                <MoreHorizontal className="size-4" aria-hidden="true" /> Actions
                <ChevronDown className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><Send className="size-4" aria-hidden="true" /> Sent on Oct 28, 2026 at 02:14 PM</span>
              <span className="flex items-center gap-1.5"><Users className="size-4" aria-hidden="true" /> Audience: Professionals (12,460)</span>
              <span className="flex items-center gap-1.5"><Mail className="size-4" aria-hidden="true" /> Template: IMETS – Course Promotion</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <SummaryKpi icon={Mail} value="64,280" label="Emails Delivered" pct="98.6%" />
              <SummaryKpi icon={MailOpen} value="27,540" label="Total Opens" pct="42.8%" />
              <SummaryKpi icon={MousePointerClick} value="5,530" label="Total Clicks" pct="8.6%" />
              <SummaryKpi icon={Target} value="2,705" label="Conversions" pct="4.2%" />
            </div>
          </div>
        </div>
      </EmCard>

      {/* Campaign sub-tabs */}
      <div className="em-noscroll -mx-1 flex gap-2 overflow-x-auto px-1">
        {SUBTABS.map((t) => (
          <button
            key={t.label}
            type="button"
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold",
              t.active ? "text-white" : "border bg-white text-[var(--em-text-secondary)]",
            )}
            style={t.active ? { background: "var(--em-primary)" } : { borderColor: "var(--em-border)" }}
          >
            <t.icon className="size-[18px]" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard
          className="lg:col-span-7"
          title="Performance Over Time"
          icon={Send}
          action={
            <div className="flex items-center gap-3 text-[12px] font-medium text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-delivered)" }} />Opened</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-opened)" }} />Clicked</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-clicked)" }} />Converted</span>
            </div>
          }
        >
          <LineChart
            labels={["Sep 30", "Oct 4", "Oct 8", "Oct 12", "Oct 16", "Oct 20", "Oct 24", "Oct 28"]}
            yLabels={["60K", "50K", "40K", "30K", "20K", "10K", "0"]}
            yMax={60000}
            series={[
              { color: "var(--em-chart-delivered)", values: [26000, 30000, 34000, 38000, 41000, 44000, 47000, 50000], fill: true },
              { color: "var(--em-chart-opened)", values: [10000, 13000, 15000, 17000, 19000, 21000, 23000, 25000] },
              { color: "var(--em-chart-clicked)", values: [2000, 3000, 4000, 5000, 6000, 7000, 7500, 8000] },
            ]}
          />
        </EmCard>

        <EmCard className="lg:col-span-5" title="Campaign Results" icon={Clock}>
          <div className="flex items-center gap-4">
            <DonutChart segments={results} centerValue="64,280" centerLabel="Emails" />
            <ul className="flex-1 space-y-2.5">
              {results.map((r) => (
                <LegendRow key={r.label} color={r.color} label={r.label} pct={r.pct} count={`(${r.count})`} />
              ))}
            </ul>
          </div>
        </EmCard>
      </div>

      {/* Info / audience / preview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <EmCard
          title="Campaign Information"
          icon={Info}
          action={
            <button type="button" className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--em-primary)]">
              <Pencil className="size-3.5" aria-hidden="true" /> Edit
            </button>
          }
        >
          <dl className="space-y-3 text-[13px]">
            {info.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-[var(--em-text-secondary)]">{k}</dt>
                <dd className="text-[var(--em-text-body)]">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
              <dt className="font-semibold text-[var(--em-text-secondary)]">Status</dt>
              <dd><StatusBadge status="completed" /></dd>
            </div>
          </dl>
        </EmCard>

        <EmCard
          title="Audience"
          icon={Users}
          action={
            <Link href="#" className="flex items-center gap-1 text-[13px] font-semibold text-[var(--em-primary)]">
              View Audience <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          }
        >
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
              <Users className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="em-num text-[26px] font-bold leading-none text-[var(--em-text-primary)]">12,460</p>
              <p className="text-[12.5px] text-[var(--em-text-secondary)]">Total Recipients</p>
            </div>
          </div>
          <ul className="mt-4 space-y-3">
            {recipients.map((r) => (
              <li key={r.label} className="flex items-center gap-2 text-[13px]">
                <r.icon className="size-4 text-[var(--em-text-muted)]" aria-hidden="true" />
                <span className="flex-1 text-[var(--em-text-body)]">{r.label}</span>
                <span className="em-num font-bold text-[var(--em-text-primary)]">{r.pct}</span>
                <span className="em-num w-14 text-end text-[var(--em-text-secondary)]">({r.count})</span>
              </li>
            ))}
          </ul>
        </EmCard>

        <EmCard
          title="Email Preview"
          icon={Mail}
          action={
            <Link href="#" className="flex items-center gap-1 text-[13px] font-semibold text-[var(--em-primary)]">
              View in Browser <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          }
        >
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--em-border)" }}>
            <div className="relative p-4" style={{ background: "linear-gradient(135deg, var(--em-primary), var(--em-navy))" }}>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                <BookOpen className="size-3.5 text-[var(--em-gold)]" aria-hidden="true" /> IMETS Medical School
              </span>
              <p className="mt-3 text-[18px] font-extrabold leading-tight text-white">CPHQ Preparation Course</p>
              <p className="text-[11px] text-white/80">Get Ready for the NAHQ CPHQ® Exam</p>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 text-center text-[10px] text-[var(--em-text-secondary)]">
              {["Live Sessions", "Expert Faculty", "IMETS Certificate"].map((f) => (
                <div key={f} className="space-y-1">
                  <span className="mx-auto grid size-7 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                    <Mail className="size-3.5" aria-hidden="true" />
                  </span>
                  {f}
                </div>
              ))}
            </div>
            <div className="px-3 pb-3">
              <span className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-[13px] font-bold text-[var(--em-navy)]" style={{ background: "var(--em-gold)" }}>
                Enroll Now <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </EmCard>
      </div>
    </div>
  );
}
