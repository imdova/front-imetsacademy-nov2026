import {
  Activity,
  BarChart3,
  CalendarDays,
  Filter,
  Globe,
  Info,
  Mail,
  MailOpen,
  MousePointerClick,
  Send,
  Smartphone,
  Target,
  TrendingDown,
} from "lucide-react";
import {
  EmCard,
  KpiCard,
  PageHeader,
  Pill,
  TrendBadge,
} from "@/components/email-marketing/em-ui";
import { EmTabs } from "@/components/email-marketing/em-tabs";
import { DonutChart, LegendRow, LineChart } from "@/components/email-marketing/em-charts";

const funnel = [
  { label: "Delivered", count: "64,280", pct: 100, color: "var(--em-chart-delivered)" },
  { label: "Opened", count: "27,540", pct: 42.8, color: "var(--em-chart-opened)" },
  { label: "Clicked", count: "5,530", pct: 8.6, color: "var(--em-chart-clicked)" },
  { label: "Converted", count: "2,705", pct: 4.2, color: "var(--em-chart-converted)" },
];

const delivery = [
  { label: "Delivered", value: 64280, pct: "98.6%", color: "var(--em-chart-delivered)" },
  { label: "Bounced", value: 900, pct: "1.4%", color: "var(--em-chart-other)" },
  { label: "Blocked", value: 180, pct: "0.3%", color: "var(--em-danger)" },
];

const devices = [
  { label: "Mobile", value: 58.2, pct: "58.2%", color: "var(--em-chart-opened)" },
  { label: "Desktop", value: 33.4, pct: "33.4%", color: "var(--em-chart-delivered)" },
  { label: "Webmail", value: 8.4, pct: "8.4%", color: "var(--em-chart-converted)" },
];

const comparison = [
  { name: "CPHQ Course – Oct Intake", sent: "64,280", open: "76.4%", click: "14.8%", conv: "5.2%" },
  { name: "Healthcare Jobs Weekly", sent: "48,120", open: "69.8%", click: "11.4%", conv: "3.6%" },
  { name: "Free Lecture – Quality in Care", sent: "22,540", open: "78.9%", click: "16.2%", conv: "6.1%" },
  { name: "New Question Banks", sent: "31,900", open: "71.2%", click: "12.6%", conv: "4.8%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Analytics"]}
        icon={Activity}
        title="Email Marketing – Analytics"
        description="Delivery health, open and click trends, conversion funnel, and campaign comparison across your email program."
        right={
          <>
            <Pill icon={Globe}>test.imetsacademy.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--em-text-secondary)]">
          <Filter className="size-4" aria-hidden="true" /> Filters
        </span>
        <Pill>All Campaigns</Pill>
        <Pill>All Segments</Pill>
        <Pill>All Campaign Types</Pill>
        <Pill>All Delivery Statuses</Pill>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={Send} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="64,280" label="Emails Delivered" trend={<TrendBadge value="98.6%" />} />
        <KpiCard icon={MailOpen} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="42.8%" label="Open Rate" trend={<TrendBadge value="6.4 pp" />} />
        <KpiCard icon={MousePointerClick} iconBg="var(--em-blue-50)" iconColor="var(--em-chart-clicked)" value="8.6%" label="Click Rate" trend={<TrendBadge value="2.8 pp" />} />
        <KpiCard icon={Target} iconBg="var(--em-danger-bg)" iconColor="var(--em-danger)" value="4.2%" label="Conversion Rate" trend={<TrendBadge value="1.3 pp" />} />
        <KpiCard icon={TrendingDown} iconBg="var(--em-warning-bg)" iconColor="var(--em-paused)" value="0.6%" label="Unsubscribe Rate" trend={<TrendBadge value="0.2 pp" up={false} />} />
      </div>

      {/* Delivery health + trends */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-4" title="Delivery Health" icon={Send}>
          <div className="flex items-center gap-4">
            <DonutChart segments={delivery} centerValue="98.6%" centerLabel="Delivered" />
            <ul className="flex-1 space-y-2.5">
              {delivery.map((d) => (
                <LegendRow key={d.label} color={d.color} label={d.label} pct={d.pct} />
              ))}
            </ul>
          </div>
        </EmCard>

        <EmCard
          className="lg:col-span-8"
          title="Open & Click Trends"
          icon={Activity}
          action={
            <div className="flex items-center gap-3 text-[12px] font-medium text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-opened)" }} />Opens</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-clicked)" }} />Clicks</span>
            </div>
          }
        >
          <LineChart
            labels={["Sep 30", "Oct 4", "Oct 8", "Oct 12", "Oct 16", "Oct 20", "Oct 24", "Oct 28"]}
            yLabels={["50%", "40%", "30%", "20%", "10%", "0"]}
            yMax={50}
            series={[
              { color: "var(--em-chart-opened)", values: [34, 37, 39, 41, 43, 42, 44, 42.8], fill: true },
              { color: "var(--em-chart-clicked)", values: [6, 7, 7.5, 8, 8.4, 8, 8.8, 8.6] },
            ]}
          />
        </EmCard>
      </div>

      {/* Funnel + device */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-8" title="Conversion Funnel" icon={BarChart3}>
          <ul className="space-y-3.5">
            {funnel.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[13px] font-semibold text-[var(--em-text-body)]">{f.label}</span>
                <span className="relative h-8 flex-1 overflow-hidden rounded-lg" style={{ background: "var(--em-neutral-100)" }}>
                  <span className="absolute inset-y-0 start-0 rounded-lg" style={{ width: `${f.pct}%`, background: f.color, minWidth: "2.5rem" }} />
                </span>
                <span className="em-num w-16 shrink-0 text-end text-[13px] font-bold text-[var(--em-text-primary)]">{f.count}</span>
                <span className="em-num w-12 shrink-0 text-end text-[12px] text-[var(--em-text-secondary)]">{f.pct}%</span>
              </li>
            ))}
          </ul>
        </EmCard>

        <EmCard className="lg:col-span-4" title="Device / Client Breakdown" icon={Smartphone}>
          <div className="flex items-center gap-4">
            <DonutChart segments={devices} centerValue="Opens" centerLabel="by device" size={150} thickness={20} />
            <ul className="flex-1 space-y-2.5">
              {devices.map((d) => (
                <LegendRow key={d.label} color={d.color} label={d.label} pct={d.pct} />
              ))}
            </ul>
          </div>
        </EmCard>
      </div>

      {/* Comparison + bounce trends */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard className="lg:col-span-7" title="Campaign Comparison" icon={Mail} bodyClassName="px-0 pb-0">
          <div className="em-noscroll overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="text-[12px] font-semibold text-[var(--em-text-secondary)]" style={{ background: "var(--em-blue-50)" }}>
                  <th className="px-5 py-2.5 text-start">Campaign</th>
                  <th className="px-3 py-2.5 text-end">Delivered</th>
                  <th className="px-3 py-2.5 text-end">Open Rate</th>
                  <th className="px-3 py-2.5 text-end">Click Rate</th>
                  <th className="px-5 py-2.5 text-end">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr key={c.name} className="border-t" style={{ borderColor: "var(--em-neutral-100)" }}>
                    <td className="px-5 py-3 font-semibold text-[var(--em-text-primary)]">{c.name}</td>
                    <td className="em-num px-3 py-3 text-end text-[var(--em-text-secondary)]">{c.sent}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{c.open}</td>
                    <td className="em-num px-3 py-3 text-end font-semibold text-[var(--em-text-primary)]">{c.click}</td>
                    <td className="px-5 py-3 text-end">
                      <span className="em-num inline-block rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ color: "var(--em-success)", background: "var(--em-success-bg)" }}>{c.conv}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmCard>

        <EmCard
          className="lg:col-span-5"
          title="Bounce & Unsubscribe Trends"
          icon={TrendingDown}
          action={
            <div className="flex items-center gap-3 text-[12px] font-medium text-[var(--em-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-chart-other)" }} />Bounce</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--em-paused)" }} />Unsub</span>
            </div>
          }
        >
          <LineChart
            labels={["Sep 30", "Oct 8", "Oct 16", "Oct 24", "Oct 28"]}
            yLabels={["4%", "3%", "2%", "1%", "0"]}
            yMax={4}
            series={[
              { color: "var(--em-chart-other)", values: [1.8, 1.6, 1.5, 1.4, 1.4] },
              { color: "var(--em-paused)", values: [0.9, 0.8, 0.7, 0.6, 0.6] },
            ]}
            height={200}
          />
        </EmCard>
      </div>

      <p className="flex items-center gap-1.5 text-[12px] text-[var(--em-text-muted)]">
        <Info className="size-3.5" aria-hidden="true" />
        Reporting period: Last 28 Days. Rates are unique events ÷ delivered; conversions use last-click attribution.
      </p>
    </div>
  );
}
