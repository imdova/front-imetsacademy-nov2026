import Link from "next/link";
import {
  Activity,
  CalendarDays,
  ChevronDown,
  Clock,
  Copy,
  Globe,
  LayoutGrid,
  Lightbulb,
  Mail,
  MailOpen,
  MoreHorizontal,
  MousePointerClick,
  Pause,
  Pencil,
  Play,
  Plus,
  Send,
  Trophy,
  Upload,
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
import { EmTabs } from "@/components/email-marketing/em-tabs";
import { DonutChart, LegendRow, LineChart } from "@/components/email-marketing/em-charts";

const automations = [
  { name: "Free Lecture Lead Nurture", trigger: "Form Submission", aud: "Leads", emails: 7, conv: "18.4%", status: "active" as const },
  { name: "Course Enrollment Follow-up", trigger: "Course Enrollment", aud: "Students", emails: 5, conv: "32.6%", status: "active" as const },
  { name: "Job Seeker Onboarding", trigger: "Account Created", aud: "Job Seekers", emails: 4, conv: "24.1%", status: "active" as const },
  { name: "Inactive User Re-engagement", trigger: "No Activity (30 Days)", aud: "All Users", emails: 3, conv: "8.9%", status: "paused" as const },
  { name: "Post-Course Feedback", trigger: "Course Completed", aud: "Students", emails: 2, conv: "46.7%", status: "active" as const },
];

const insights = [
  { label: "Delivered", value: 60835, pct: "94.6%", count: "60,835", color: "var(--em-chart-delivered)" },
  { label: "Opened", value: 27522, pct: "42.8%", count: "27,522", color: "var(--em-chart-opened)" },
  { label: "Clicked", value: 5530, pct: "8.6%", count: "5,530", color: "var(--em-chart-clicked)" },
  { label: "Converted", value: 10900, pct: "16.9%", count: "1,093", color: "var(--em-chart-converted)" },
  { label: "Bounced", value: 1749, pct: "2.7%", count: "1,749", color: "var(--em-chart-other)" },
];

const builder = [
  { icon: Zap, color: "var(--em-gold)", title: "Trigger", sub: "Form Submission (Free Lecture)" },
  { icon: Mail, color: "var(--em-primary)", title: "Send Email 1", sub: "Welcome & Lecture Access" },
  { icon: Clock, color: "var(--em-text-secondary)", title: "Wait", sub: "2 Days" },
  { icon: Mail, color: "var(--em-primary)", title: "Send Email 2", sub: "Program Benefits & Curriculum" },
  { icon: Clock, color: "var(--em-text-secondary)", title: "Wait", sub: "3 Days" },
  { icon: Mail, color: "var(--em-primary)", title: "Send Email 3", sub: "Enrollment Offer (30% Discount)" },
];

const topPerforming = [
  { name: "Course Enrollment Follow-up", open: "56.1%", click: "12.4%", conv: "32.6%", icon: Mail },
  { name: "Post-Course Feedback", open: "49.8%", click: "10.7%", conv: "46.7%", icon: Trophy },
  { name: "Free Lecture Lead Nurture", open: "46.3%", click: "9.2%", conv: "18.4%", icon: Mail },
];

const activity = [
  { icon: Play, color: "var(--em-success)", text: 'Automation "Course Enrollment Follow-up" activated', at: "Oct 28, 02:14 PM" },
  { icon: Pencil, color: "var(--em-primary)", text: '"Free Lecture Lead Nurture" updated (added 1 email)', at: "Oct 27, 11:20 AM" },
  { icon: Pause, color: "var(--em-paused)", text: 'Automation "Inactive User Re-engagement" paused', at: "Oct 26, 05:48 PM" },
  { icon: Plus, color: "var(--em-info)", text: 'New automation "Job Seeker Onboarding" created', at: "Oct 25, 09:36 AM" },
];

function FilterPill({ children }: { children: string }) {
  return (
    <button
      type="button"
      className="flex h-9 items-center gap-2 rounded-lg border bg-white px-3 text-[12.5px] font-medium text-[var(--em-text-body)]"
      style={{ borderColor: "var(--em-border)" }}
    >
      {children}
      <ChevronDown className="size-3.5 text-[var(--em-text-secondary)]" aria-hidden="true" />
    </button>
  );
}

export default function AutomationsPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Automations"]}
        icon={Workflow}
        title="Email Marketing – Automations"
        description="Create automated email workflows to nurture leads, enroll students, and engage your audience based on their actions."
        right={
          <>
            <Pill icon={Globe}>test.imetsacademy.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={Workflow} iconBg="var(--em-success-bg)" iconColor="var(--em-success)" value="12" label="Active Automations" trend={<TrendBadge value="33.3%" />} />
        <KpiCard icon={Send} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="64,280" label="Emails Sent" trend={<TrendBadge value="18.6%" />} />
        <KpiCard icon={Users} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="38,420" label="Recipients" trend={<TrendBadge value="21.9%" />} />
        <KpiCard icon={MailOpen} iconBg="var(--em-danger-bg)" iconColor="var(--em-danger)" value="42.8%" label="Avg. Open Rate" trend={<TrendBadge value="6.7 pp" />} />
        <KpiCard icon={MousePointerClick} iconBg="var(--em-blue-50)" iconColor="var(--em-chart-clicked)" value="8.6%" label="Avg. Click Rate" trend={<TrendBadge value="2.4 pp" />} />
      </div>

      {/* Workflows + performance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard
          className="lg:col-span-8"
          title="Automation Workflows"
          icon={Workflow}
          action={
            <div className="flex items-center gap-2">
              <FilterPill>All Statuses</FilterPill>
              <FilterPill>All Triggers</FilterPill>
              <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-semibold text-white" style={{ background: "var(--em-primary)" }}>
                <Plus className="size-4" aria-hidden="true" /> Create Automation
              </button>
            </div>
          }
          bodyClassName="px-0 pb-0"
        >
          <div className="em-noscroll overflow-x-auto">
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="text-[12px] font-semibold text-[var(--em-text-secondary)]" style={{ background: "var(--em-blue-50)" }}>
                  <th className="px-5 py-2.5 text-start">Automation</th>
                  <th className="px-3 py-2.5 text-start">Trigger</th>
                  <th className="px-3 py-2.5 text-start">Audience</th>
                  <th className="px-3 py-2.5 text-end">Emails</th>
                  <th className="px-3 py-2.5 text-end">Conversion</th>
                  <th className="px-3 py-2.5 text-start">Status</th>
                  <th className="px-5 py-2.5 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {automations.map((a) => (
                  <tr key={a.name} className="border-t" style={{ borderColor: "var(--em-neutral-100)" }}>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 font-semibold text-[var(--em-text-primary)]">
                        <Mail className="size-4 text-[var(--em-primary)]" aria-hidden="true" />
                        <span className="truncate">{a.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[var(--em-text-secondary)]">{a.trigger}</td>
                    <td className="px-3 py-3 text-[var(--em-text-secondary)]">{a.aud}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{a.emails}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{a.conv}</td>
                    <td className="px-3 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-5 py-3 text-end">
                      <MoreHorizontal className="ms-auto size-4 text-[var(--em-text-muted)]" aria-hidden="true" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmCard>

        <EmCard
          className="lg:col-span-4"
          title="Automation Performance"
          icon={Activity}
          action={
            <div className="flex items-center gap-3 text-[12px] font-medium text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-blue-700)" }} />Opens</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-blue-500)" }} />Clicks</span>
            </div>
          }
        >
          <LineChart
            labels={["Sep 30", "Oct 8", "Oct 16", "Oct 24", "Oct 28"]}
            yLabels={["10K", "8K", "6K", "4K", "2K", "0"]}
            yMax={10000}
            series={[
              { color: "var(--em-blue-700)", values: [4200, 5600, 6600, 7400, 8000] },
              { color: "var(--em-blue-500)", values: [1200, 1600, 1900, 2200, 2500] },
            ]}
            height={200}
          />
        </EmCard>
      </div>

      {/* Builder + insights + quick actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <EmCard title="Workflow Builder" icon={Workflow} action={<span className="text-[12px] text-[var(--em-text-muted)]">(Example)</span>}>
          <ol className="space-y-0">
            {builder.map((node, i) => (
              <li key={i}>
                <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "var(--em-border)", background: "var(--em-surface-subtle)" }}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: node.color }}>
                    <node.icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-[var(--em-text-primary)]">{node.title}</p>
                    <p className="text-[12px] text-[var(--em-text-secondary)]">{node.sub}</p>
                  </div>
                </div>
                {i < builder.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="size-4 text-[var(--em-text-muted)]" aria-hidden="true" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </EmCard>

        <EmCard title="Automation Insights" icon={Workflow}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <DonutChart segments={insights} centerValue="64,280" centerLabel="Emails Sent" />
            <ul className="w-full flex-1 space-y-2.5">
              {insights.map((r) => (
                <LegendRow key={r.label} color={r.color} label={r.label} pct={r.pct} count={`(${r.count})`} />
              ))}
            </ul>
          </div>
        </EmCard>

        <EmCard title="Quick Actions" icon={Lightbulb}>
          <div className="space-y-2">
            <QuickAction icon={Plus} label="Create Automation from Template" chevron />
            <QuickAction icon={LayoutGrid} label="Browse Automation Templates" chevron />
            <QuickAction icon={Copy} label="Duplicate Existing Automation" chevron />
            <QuickAction icon={Upload} label="Import Automation (JSON)" chevron />
          </div>
        </EmCard>
      </div>

      {/* Top performing + activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-7" title="Top Performing Automations" icon={Trophy} bodyClassName="px-0 pb-0">
          <div className="em-noscroll overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="text-[12px] font-semibold text-[var(--em-text-secondary)]" style={{ background: "var(--em-blue-50)" }}>
                  <th className="px-5 py-2.5 text-start">Automation</th>
                  <th className="px-3 py-2.5 text-end">Open Rate</th>
                  <th className="px-3 py-2.5 text-end">Click Rate</th>
                  <th className="px-5 py-2.5 text-end">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topPerforming.map((t) => (
                  <tr key={t.name} className="border-t" style={{ borderColor: "var(--em-neutral-100)" }}>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 font-semibold text-[var(--em-text-primary)]">
                        <t.icon className="size-4 text-[var(--em-primary)]" aria-hidden="true" />
                        {t.name}
                      </span>
                    </td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{t.open}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{t.click}</td>
                    <td className="px-5 py-3 text-end">
                      <span className="em-num inline-block rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ color: "var(--em-success)", background: "var(--em-success-bg)" }}>
                        {t.conv}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmCard>

        <EmCard className="lg:col-span-5" title="Recent Activity" icon={Activity} action={<ViewAll />}>
          <ul className="space-y-3.5">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: a.color }}>
                  <a.icon className="size-4" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="text-[13px] text-[var(--em-text-body)]">{a.text}</p>
                  <p className="em-num text-[11.5px] text-[var(--em-text-muted)]">{a.at}</p>
                </div>
              </li>
            ))}
          </ul>
        </EmCard>
      </div>
    </div>
  );
}
