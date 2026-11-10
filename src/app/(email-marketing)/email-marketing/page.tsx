import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Globe,
  Mail,
  MailOpen,
  MousePointerClick,
  Plus,
  Send,
  Target,
  UserPlus,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import {
  EmCard,
  KpiCard,
  PageHeader,
  Pill,
  QuickAction,
  StatusBadge,
  TrendBadge,
  ViewAll,
} from "@/components/email-marketing/em-ui";
import { AreaSpark, DonutChart, LegendRow, LineChart } from "@/components/email-marketing/em-charts";
import { EmTabs } from "@/components/email-marketing/em-tabs";

const audience = [
  { label: "Students", value: 12080, pct: "48.6%", count: "12,080", color: "var(--em-primary)" },
  { label: "Job Seekers", value: 7060, pct: "28.4%", count: "7,060", color: "var(--em-blue-500)" },
  { label: "Professionals", value: 3180, pct: "12.8%", count: "3,180", color: "var(--em-gold)" },
  { label: "Leads (Free Lecture)", value: 1840, pct: "7.4%", count: "1,840", color: "var(--em-chart-clicked)" },
  { label: "Others", value: 700, pct: "2.8%", count: "700", color: "var(--em-chart-other)" },
];

const recentCampaigns = [
  { name: "CPHQ Course – Oct Intake", aud: "Students", sent: "Oct 26, 2026", open: "76.4%", click: "14.8%", conv: "5.2%" },
  { name: "Healthcare Jobs Weekly", aud: "Job Seekers", sent: "Oct 23, 2026", open: "69.8%", click: "11.4%", conv: "3.6%" },
  { name: "Free Lecture – Quality in Care", aud: "Leads", sent: "Oct 20, 2026", open: "78.9%", click: "16.2%", conv: "6.1%" },
  { name: "New Question Banks", aud: "Professionals", sent: "Oct 16, 2026", open: "71.2%", click: "12.6%", conv: "4.8%" },
  { name: "October Events & Webinars", aud: "All Subscribers", sent: "Oct 13, 2026", open: "66.9%", click: "10.8%", conv: "3.1%" },
];

const workflows = [
  { name: "Free Lecture Lead Nurture", status: "active" as const },
  { name: "Course Enrollment Follow-up", status: "active" as const },
  { name: "Job Seeker Onboarding", status: "active" as const },
  { name: "Inactive User Re-engagement", status: "paused" as const },
  { name: "Post-Course Feedback", status: "active" as const },
];

const perfLabels = ["Sep 30", "Oct 4", "Oct 8", "Oct 12", "Oct 16", "Oct 20", "Oct 24", "Oct 28"];

export default function EmailMarketingOverview() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing"]}
        icon={Mail}
        title="Email Marketing"
        description="Create, send, and automate email campaigns to engage your audience and grow enrollments, course registrations, and job applications."
        right={
          <>
            <Pill icon={Globe}>test.imetsacademy.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={Users} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="24,860" label="Total Subscribers" trend={<TrendBadge value="12.6%" />} />
        <KpiCard icon={Send} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="8" label="Campaigns Sent" />
        <KpiCard icon={MailOpen} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="72.8%" label="Avg. Open Rate" trend={<TrendBadge value="6.4 pp" />} />
        <KpiCard icon={MousePointerClick} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="12.6%" label="Avg. Click Rate" trend={<TrendBadge value="2.8 pp" />} />
        <KpiCard icon={Target} iconBg="var(--em-danger-bg)" iconColor="var(--em-danger)" value="4.2%" label="Conversion Rate" trend={<TrendBadge value="1.3 pp" />} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard
          className="lg:col-span-5"
          title="Email Performance Trend"
          icon={Zap}
          action={
            <div className="flex items-center gap-4 text-[12px] font-medium text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-blue-700)" }} />Open Rate</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-blue-500)" }} />Click Rate</span>
            </div>
          }
        >
          <LineChart
            labels={perfLabels}
            yLabels={["100%", "80%", "60%", "40%", "20%", "0%"]}
            yMax={100}
            series={[
              { color: "var(--em-blue-700)", values: [61, 66, 70, 73, 75, 74, 77, 79] },
              { color: "var(--em-blue-500)", values: [9, 10, 11, 12, 12, 11, 13, 13] },
            ]}
          />
        </EmCard>

        <EmCard className="lg:col-span-4" title="Audience Overview" icon={Users}>
          <div className="flex items-center gap-4">
            <DonutChart
              segments={audience}
              centerValue="24,860"
              centerLabel="Subscribers"
            />
            <ul className="flex-1 space-y-2.5">
              {audience.map((a) => (
                <LegendRow key={a.label} color={a.color} label={a.label} pct={a.pct} count={a.count} />
              ))}
            </ul>
          </div>
        </EmCard>

        <EmCard className="lg:col-span-3" title="Quick Actions" icon={Zap}>
          <div className="space-y-2">
            <QuickAction icon={Plus} label="Create Campaign" primary />
            <QuickAction icon={Workflow} label="New Automation" />
            <QuickAction icon={UserPlus} label="Import Subscribers" />
            <QuickAction icon={Users} label="Create Audience" />
          </div>
        </EmCard>
      </div>

      {/* Operations row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-7" title="Recent Campaigns" icon={Mail} action={<ViewAll />} bodyClassName="px-0 pb-0">
          <div className="em-noscroll overflow-x-auto">
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="text-start text-[12px] font-semibold text-[var(--em-text-secondary)]" style={{ background: "var(--em-blue-50)" }}>
                  <th className="px-5 py-2.5 text-start font-semibold">Campaign</th>
                  <th className="px-3 py-2.5 text-start font-semibold">Audience</th>
                  <th className="px-3 py-2.5 text-start font-semibold">Sent At</th>
                  <th className="px-3 py-2.5 text-end font-semibold">Open Rate</th>
                  <th className="px-3 py-2.5 text-end font-semibold">Click Rate</th>
                  <th className="px-3 py-2.5 text-end font-semibold">Conv.</th>
                  <th className="px-5 py-2.5 text-start font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((c) => (
                  <tr key={c.name} className="border-t" style={{ borderColor: "var(--em-neutral-100)" }}>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 font-semibold text-[var(--em-text-primary)]">
                        <Mail className="size-4 text-[var(--em-primary)]" aria-hidden="true" />
                        <span className="truncate">{c.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[var(--em-text-secondary)]">{c.aud}</td>
                    <td className="em-num px-3 py-3 text-[var(--em-text-secondary)]">{c.sent}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{c.open}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{c.click}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{c.conv}</td>
                    <td className="px-5 py-3"><StatusBadge status="completed" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmCard>

        <EmCard className="lg:col-span-5" title="Automation Workflows" icon={Workflow} action={<ViewAll />}>
          <ul className="divide-y" style={{ borderColor: "var(--em-neutral-100)" }}>
            {workflows.map((w) => (
              <li key={w.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)" }}>
                    {w.status === "paused" ? (
                      <Clock className="size-[18px] text-[var(--em-paused)]" aria-hidden="true" />
                    ) : (
                      <Mail className="size-[18px] text-[var(--em-primary)]" aria-hidden="true" />
                    )}
                  </span>
                  <span className="text-[14px] font-semibold text-[var(--em-text-primary)]">{w.name}</span>
                </span>
                <StatusBadge status={w.status} />
              </li>
            ))}
          </ul>
        </EmCard>
      </div>

      {/* Templates + growth row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-7" title="Email Templates" icon={Mail} action={<ViewAll />}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Course Enrollment", "Free Lecture", "Job Opportunities", "Event Invite"].map((t, i) => (
              <div key={t} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--em-border)" }}>
                <div className="relative h-24" style={{ background: `linear-gradient(135deg, var(--em-primary), var(--em-navy))` }}>
                  <span className="absolute left-2 top-2 text-[9px] font-bold text-white/90">IMETS</span>
                  {i % 2 === 0 && (
                    <span className="absolute right-2 bottom-2 h-6 w-10 rounded" style={{ background: "var(--em-gold)" }} />
                  )}
                </div>
                <div className="space-y-1.5 p-2.5">
                  <span className="block h-1.5 w-4/5 rounded bg-[var(--em-neutral-100)]" />
                  <span className="block h-1.5 w-3/5 rounded bg-[var(--em-neutral-100)]" />
                  <span className="mt-1 block truncate text-[11px] font-semibold text-[var(--em-text-primary)]">{t}</span>
                </div>
              </div>
            ))}
          </div>
        </EmCard>

        <EmCard className="lg:col-span-5" title="Subscriber Growth" icon={Users} action={<ViewAll />}>
          <div className="flex items-baseline gap-2">
            <p className="em-num text-[28px] font-bold text-[var(--em-text-primary)]">+2,780</p>
            <TrendBadge value="12.6%" />
          </div>
          <p className="mb-2 text-[12.5px] text-[var(--em-text-secondary)]">New Subscribers</p>
          <AreaSpark values={[14000, 15200, 16100, 17000, 18200, 19500, 21000, 22400, 24860]} />
        </EmCard>
      </div>
    </div>
  );
}
