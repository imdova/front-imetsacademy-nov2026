import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Globe,
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Tag,
  Tags,
  TrendingUp,
  Trash2,
  UserCheck,
  UserPlus,
  UserRound,
  Users,
  UserX,
} from "lucide-react";
import {
  EmCard,
  KpiCard,
  PageHeader,
  Pill,
  QuickAction,
  TrendBadge,
  ViewAll,
} from "@/components/email-marketing/em-ui";
import { EmTabs } from "@/components/email-marketing/em-tabs";
import { AreaSpark, DonutChart, LegendRow } from "@/components/email-marketing/em-charts";
import { cn } from "@/lib/utils";

const segments = [
  { name: "All Subscribers", count: "24,860", pct: "100%", icon: Users, active: true },
  { name: "Students", count: "12,080", pct: "48.6%", icon: Users },
  { name: "Job Seekers", count: "7,060", pct: "28.4%", icon: UserRound },
  { name: "Professionals (HCPs)", count: "3,180", pct: "12.8%", icon: UserCheck },
  { name: "Free Lecture Leads", count: "1,840", pct: "7.4%", icon: Mail },
  { name: "Inactive (90+ Days)", count: "700", pct: "2.8%", icon: Clock },
];

const demographics = [
  { label: "Egypt", value: 42.6, pct: "42.6%", color: "var(--em-chart-delivered)" },
  { label: "Saudi Arabia", value: 28.4, pct: "28.4%", color: "var(--em-chart-opened)" },
  { label: "UAE", value: 8.9, pct: "8.9%", color: "var(--em-chart-converted)" },
  { label: "Other GCC", value: 7.3, pct: "7.3%", color: "var(--em-chart-clicked)" },
  { label: "Other", value: 12.8, pct: "12.8%", color: "var(--em-chart-other)" },
];

type Seg = "Students" | "Professionals" | "Job Seekers" | "Free Lecture";
const subscribers: { email: string; initials: string; seg: Seg; source: string; date: string }[] = [
  { email: "ahmed.ali@email.com", initials: "AA", seg: "Students", source: "Course Enrollment", date: "Oct 28, 2026" },
  { email: "sara.mohamed@email.com", initials: "SM", seg: "Professionals", source: "Free Lecture", date: "Oct 27, 2026" },
  { email: "mahmoud.ahmed@email.com", initials: "MA", seg: "Job Seekers", source: "Job Portal", date: "Oct 26, 2026" },
  { email: "nour.mostafa@email.com", initials: "NM", seg: "Students", source: "Website Signup", date: "Oct 26, 2026" },
  { email: "hana.ali@email.com", initials: "HA", seg: "Free Lecture", source: "Landing Page", date: "Oct 25, 2026" },
];

const segColor: Record<Seg, { color: string; bg: string }> = {
  Students: { color: "var(--em-primary)", bg: "var(--em-blue-100)" },
  Professionals: { color: "var(--em-paused)", bg: "var(--em-warning-bg)" },
  "Job Seekers": { color: "var(--em-primary)", bg: "var(--em-blue-100)" },
  "Free Lecture": { color: "var(--em-paused)", bg: "var(--em-warning-bg)" },
};

const interestTags = [
  { label: "CPHQ", count: "6,420" },
  { label: "Quality", count: "5,980" },
  { label: "Infection Control", count: "4,260" },
  { label: "Healthcare Mgmt", count: "3,820" },
  { label: "Jobs", count: "3,180" },
  { label: "Diploma", count: "2,940" },
];

function Pct({ children, color }: { children: string; color: string }) {
  return <span className="em-num text-[12px] font-bold" style={{ color }}>({children})</span>;
}

export default function AudiencesPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Audiences"]}
        icon={Mail}
        title="Email Marketing – Audiences"
        description="Manage your email subscribers, segment your audience, and build targeted lists for higher engagement and conversions."
        right={
          <>
            <Pill icon={Globe}>test.imetsacademy.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={Users} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="24,860" label="Total Subscribers" trend={<TrendBadge value="12.6%" />} />
        <KpiCard icon={UserCheck} iconBg="var(--em-success-bg)" iconColor="var(--em-success)" value="21,480" label="Active Subscribers" trend={<Pct color="var(--em-success)">86.4%</Pct>} />
        <KpiCard icon={UserX} iconBg="var(--em-danger-bg)" iconColor="var(--em-danger)" value="3,380" label="Unsubscribed" trend={<Pct color="var(--em-danger)">13.6%</Pct>} />
        <KpiCard icon={UserPlus} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="+2,780" label="New Subscribers" trend={<TrendBadge value="12.6%" />} />
        <KpiCard icon={TrendingUp} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="4.2%" label="List Growth Rate" trend={<TrendBadge value="1.3 pp" />} />
      </div>

      {/* Segments + growth + demographics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <EmCard title="Audience Segments" icon={Users} action={<ViewAll />}>
          <ul className="space-y-1.5">
            {segments.map((s) => (
              <li
                key={s.name}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5", s.active && "")}
                style={s.active ? { background: "var(--em-blue-50)" } : undefined}
              >
                <span className={cn("grid size-8 place-items-center rounded-lg")} style={{ background: "var(--em-blue-100)", color: "var(--em-primary)" }}>
                  <s.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="flex-1 text-[13.5px] font-semibold text-[var(--em-text-primary)]">{s.name}</span>
                <span className="em-num text-[13px] font-bold text-[var(--em-text-primary)]">{s.count}</span>
                <span className="em-num w-12 text-end text-[12px] text-[var(--em-text-secondary)]">{s.pct}</span>
              </li>
            ))}
          </ul>
        </EmCard>

        <EmCard title="Subscribers Growth" icon={TrendingUp}>
          <div className="pt-6">
            <AreaSpark values={[18000, 19200, 20100, 21000, 22200, 23100, 24000, 24860]} height={190} />
            <div className="mt-2 flex justify-between text-[11px] text-[var(--em-text-muted)]">
              <span>Sep 30</span><span>Oct 8</span><span>Oct 16</span><span>Oct 24</span><span>Oct 28</span>
            </div>
          </div>
        </EmCard>

        <EmCard title="Audience Demographics" icon={Globe}>
          <div className="flex items-center gap-4">
            <DonutChart segments={demographics} centerValue="24,860" centerLabel="Subscribers" />
            <ul className="flex-1 space-y-2.5">
              {demographics.map((d) => (
                <LegendRow key={d.label} color={d.color} label={d.label} pct={d.pct} />
              ))}
            </ul>
          </div>
        </EmCard>
      </div>

      {/* Audience list + right rail */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <EmCard
          className="lg:col-span-8"
          title="Audience List"
          icon={Users}
          bodyClassName="px-0 pb-0"
          action={
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--em-text-muted)]" aria-hidden="true" />
                <input
                  placeholder="Search subscribers (name, email, or tag)…"
                  className="h-9 w-56 rounded-lg border bg-white ps-8 pe-3 text-[12.5px] placeholder:text-[var(--em-text-muted)] focus:outline-none"
                  style={{ borderColor: "var(--em-border)" }}
                />
              </div>
              <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border bg-white px-3 text-[12.5px] font-medium" style={{ borderColor: "var(--em-border)" }}>
                All Segments <ChevronDown className="size-3.5" aria-hidden="true" />
              </button>
              <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-semibold text-white" style={{ background: "var(--em-primary)" }}>
                <Plus className="size-4" aria-hidden="true" /> Add Subscribers
              </button>
            </div>
          }
        >
          <div className="em-noscroll overflow-x-auto">
            <table className="w-full min-w-[620px] text-[13px]">
              <thead>
                <tr className="text-[12px] font-semibold text-[var(--em-text-secondary)]" style={{ background: "var(--em-blue-50)" }}>
                  <th className="w-10 px-5 py-2.5"><input type="checkbox" aria-label="Select all" /></th>
                  <th className="px-3 py-2.5 text-start">Subscriber</th>
                  <th className="px-3 py-2.5 text-start">Segment</th>
                  <th className="px-3 py-2.5 text-start">Source</th>
                  <th className="px-3 py-2.5 text-start">Subscribed At</th>
                  <th className="px-3 py-2.5 text-start">Status</th>
                  <th className="px-5 py-2.5 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s.email} className="border-t" style={{ borderColor: "var(--em-neutral-100)" }}>
                    <td className="px-5 py-3"><input type="checkbox" aria-label={`Select ${s.email}`} /></td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-full bg-[var(--em-blue-100)] text-[11px] font-bold text-[var(--em-primary)]">{s.initials}</span>
                        <span className="font-medium text-[var(--em-text-primary)]">{s.email}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold" style={{ color: segColor[s.seg].color, background: segColor[s.seg].bg }}>{s.seg}</span>
                    </td>
                    <td className="px-3 py-3 text-[var(--em-text-secondary)]">{s.source}</td>
                    <td className="em-num px-3 py-3 text-[var(--em-text-secondary)]">{s.date}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--em-success)]">
                        <span className="size-1.5 rounded-full" style={{ background: "var(--em-success)" }} /> Active
                      </span>
                    </td>
                    <td className="px-5 py-3 text-end"><MoreHorizontal className="ms-auto size-4 text-[var(--em-text-muted)]" aria-hidden="true" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5" style={{ borderTop: "1px solid var(--em-neutral-100)" }}>
            <p className="em-num text-[12.5px] text-[var(--em-text-secondary)]">Showing 1–5 of 24,860</p>
            <div className="flex items-center gap-1">
              <PageBtn><ChevronLeft className="size-4" /></PageBtn>
              <PageBtn active>1</PageBtn>
              <PageBtn>2</PageBtn>
              <PageBtn>3</PageBtn>
              <PageBtn>4</PageBtn>
              <PageBtn>5</PageBtn>
              <span className="px-1 text-[var(--em-text-muted)]">…</span>
              <PageBtn>4,972</PageBtn>
              <PageBtn><ChevronRight className="size-4" /></PageBtn>
            </div>
          </div>
        </EmCard>

        <div className="space-y-4 lg:col-span-4">
          <EmCard title="Quick Actions" icon={Tag}>
            <div className="space-y-2">
              <QuickAction icon={Plus} label="Create New Segment" chevron />
              <QuickAction icon={UserPlus} label="Import Subscribers (CSV)" chevron />
              <QuickAction icon={Download} label="Export Audience (CSV / Excel)" chevron />
              <QuickAction icon={Tags} label="Add Tags to Subscribers" chevron />
              <QuickAction icon={Trash2} label="Remove Inactive Subscribers" chevron />
              <QuickAction icon={RefreshCw} label="Sync from Platform (Students/Jobs)" chevron />
            </div>
          </EmCard>

          <EmCard title="Top Interest Tags" icon={Tags} action={<ViewAll />}>
            <div className="flex flex-wrap gap-2">
              {interestTags.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                  {t.label} <span className="em-num text-[var(--em-text-secondary)]">({t.count})</span>
                </span>
              ))}
            </div>
          </EmCard>
        </div>
      </div>
    </div>
  );
}

function PageBtn({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "em-num grid h-8 min-w-8 place-items-center rounded-lg px-2 text-[12.5px] font-semibold",
        active ? "text-white" : "border bg-white text-[var(--em-text-body)]",
      )}
      style={active ? { background: "var(--em-primary)" } : { borderColor: "var(--em-border)" }}
    >
      {children}
    </button>
  );
}
