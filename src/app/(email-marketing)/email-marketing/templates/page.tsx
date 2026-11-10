import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FolderCog,
  Globe,
  Layers,
  LayoutGrid,
  List,
  Mail,
  MailOpen,
  MoreHorizontal,
  MousePointerClick,
  Play,
  Plus,
  Search,
  Target,
  Upload,
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
import { cn } from "@/lib/utils";

const categories = [
  { name: "All Templates", count: 86, active: true },
  { name: "Course & Enrollment", count: 18 },
  { name: "Free Lecture & Leads", count: 12 },
  { name: "Job & Career", count: 10 },
  { name: "Events & Webinars", count: 8 },
  { name: "News & Updates", count: 9 },
  { name: "Promotions & Offers", count: 11 },
  { name: "Notifications", count: 8 },
  { name: "System Emails", count: 6 },
  { name: "Custom Templates", count: 4 },
];

const templates: { name: string; category: string; status: "active" | "draft"; grad: string }[] = [
  { name: "Course Enrollment", category: "Course & Enrollment", status: "active", grad: "from-[var(--em-primary)] to-[var(--em-navy)]" },
  { name: "Free Lecture Invite", category: "Free Lecture & Leads", status: "active", grad: "from-[var(--em-blue-700)] to-[var(--em-navy)]" },
  { name: "Job Opportunities", category: "Job & Career", status: "active", grad: "from-[var(--em-primary)] to-[var(--em-blue-700)]" },
  { name: "Event Invitation", category: "Events & Webinars", status: "active", grad: "from-[var(--em-navy)] to-[var(--em-primary)]" },
  { name: "Discount Offer", category: "Promotions & Offers", status: "active", grad: "from-[var(--em-primary)] to-[var(--em-navy)]" },
  { name: "Account Update", category: "Notifications", status: "active", grad: "from-[var(--em-blue-700)] to-[var(--em-navy)]" },
  { name: "Welcome Email", category: "System Emails", status: "active", grad: "from-[var(--em-primary)] to-[var(--em-blue-700)]" },
  { name: "Course Feedback", category: "Custom Template", status: "draft", grad: "from-[var(--em-navy)] to-[var(--em-primary)]" },
];

const performance = [
  { icon: Mail, label: "Emails Sent", value: "64,280" },
  { icon: MailOpen, label: "Open Rate", value: "12.6%" },
  { icon: MousePointerClick, label: "Click Rate", value: "2.8%" },
  { icon: Target, label: "Conversion Rate", value: "4.2%" },
];

const recent = [
  { name: "Course Enrollment – v2", date: "Oct 28, 2026" },
  { name: "Free Lecture Invite – v3", date: "Oct 27, 2026" },
  { name: "Job Opportunities – v2", date: "Oct 26, 2026" },
  { name: "Event Invitation – v1", date: "Oct 25, 2026" },
  { name: "Discount Offer – v4", date: "Oct 24, 2026" },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <PageHeader
        breadcrumb={["Dashboard", "Marketing", "Email Marketing", "Templates"]}
        icon={Mail}
        title="Email Marketing – Templates"
        description="Create, manage, and reuse professional email templates for your campaigns and automations."
        right={
          <>
            <Pill icon={Globe}>imetsedu.com</Pill>
            <Pill icon={CalendarDays}>Last 28 Days</Pill>
          </>
        }
      />

      <EmTabs />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={Mail} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="86" label="Total Templates" />
        <KpiCard icon={Layers} iconBg="var(--em-success-bg)" iconColor="var(--em-success)" value="24" label="Active Templates" />
        <KpiCard icon={MailOpen} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="12.6%" label="Avg. Open Rate" trend={<TrendBadge value="6.4 pp" />} />
        <KpiCard icon={MousePointerClick} iconBg="var(--em-blue-50)" iconColor="var(--em-primary)" value="2.8%" label="Avg. Click Rate" trend={<TrendBadge value="1.2 pp" />} />
        <KpiCard icon={Target} iconBg="var(--em-danger-bg)" iconColor="var(--em-danger)" value="4.2%" label="Avg. Conversion Rate" trend={<TrendBadge value="1.3 pp" />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Category rail */}
        <EmCard className="lg:col-span-3" title="Template Categories" icon={Layers}>
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                    c.active ? "text-white" : "text-[var(--em-text-body)] hover:bg-[var(--em-blue-50)]",
                  )}
                  style={c.active ? { background: "var(--em-primary)" } : undefined}
                >
                  <LayoutGrid className={cn("size-4 shrink-0", c.active ? "text-white" : "text-[var(--em-text-muted)]")} aria-hidden="true" />
                  <span className="flex-1 text-start">{c.name}</span>
                  <span className={cn("em-num text-[12px] font-bold", c.active ? "text-white/90" : "text-[var(--em-text-secondary)]")}>{c.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </EmCard>

        {/* Template grid */}
        <section className="lg:col-span-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[var(--em-text-muted)]" aria-hidden="true" />
              <input
                placeholder="Search templates (name or subject)…"
                className="h-10 w-full rounded-xl border bg-white ps-9 pe-3 text-[13px] placeholder:text-[var(--em-text-muted)] focus:outline-none"
                style={{ borderColor: "var(--em-border)" }}
              />
            </div>
            <button type="button" className="flex h-10 items-center gap-1.5 rounded-xl border bg-white px-3 text-[13px] font-medium" style={{ borderColor: "var(--em-border)" }}>
              All Status <ChevronDown className="size-4" aria-hidden="true" />
            </button>
            <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: "var(--em-border)" }}>
              <button type="button" aria-label="Grid view" className="grid size-10 place-items-center text-white" style={{ background: "var(--em-primary)" }}><LayoutGrid className="size-4" /></button>
              <button type="button" aria-label="List view" className="grid size-10 place-items-center bg-white text-[var(--em-text-secondary)]"><List className="size-4" /></button>
            </div>
            <button type="button" className="flex h-10 items-center gap-1.5 rounded-xl px-3 text-[13px] font-semibold text-white" style={{ background: "var(--em-primary)" }}>
              <Plus className="size-4" aria-hidden="true" /> Create Template
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => (
              <div key={t.name} className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--em-border)", boxShadow: "var(--em-shadow-card)" }}>
                <div className={cn("relative h-20 bg-gradient-to-br", t.grad)}>
                  <span className="absolute left-2 top-2 flex items-center gap-1 text-[8px] font-bold text-white">
                    <BookOpen className="size-2.5 text-[var(--em-gold)]" aria-hidden="true" /> IMETS
                  </span>
                  <span className="absolute right-0 bottom-0 h-7 w-12 rounded-tl-xl" style={{ background: "var(--em-gold)", opacity: 0.4 }} />
                </div>
                <div className="space-y-1.5 p-2.5">
                  <span className="inline-block rounded-full px-2 py-0.5 text-[9.5px] font-semibold" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                    {t.category}
                  </span>
                  <p className="truncate text-[12.5px] font-bold text-[var(--em-text-primary)]">{t.name}</p>
                  <div className="flex items-center justify-between">
                    <StatusBadge status={t.status} />
                    <MoreHorizontal className="size-4 text-[var(--em-text-muted)]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="em-num text-[12.5px] text-[var(--em-text-secondary)]">Showing 1–8 of 86 templates</p>
            <div className="flex items-center gap-1">
              <TplPage><ChevronLeft className="size-4" /></TplPage>
              <TplPage active>1</TplPage>
              <TplPage>2</TplPage>
              <TplPage>3</TplPage>
              <TplPage>4</TplPage>
              <TplPage>5</TplPage>
              <span className="px-1 text-[var(--em-text-muted)]">…</span>
              <TplPage>11</TplPage>
              <TplPage><ChevronRight className="size-4" /></TplPage>
            </div>
            <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border bg-white px-3 text-[12.5px] font-medium" style={{ borderColor: "var(--em-border)" }}>
              8 per page <ChevronDown className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Right rail */}
        <div className="space-y-4 lg:col-span-3">
          <EmCard title="Template Performance" icon={Target}>
            <ul className="space-y-3">
              {performance.map((p) => (
                <li key={p.label} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                    <p.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[13px] text-[var(--em-text-body)]">{p.label}</span>
                  <span className="em-num text-[14px] font-bold text-[var(--em-text-primary)]">{p.value}</span>
                </li>
              ))}
            </ul>
          </EmCard>

          <EmCard title="Quick Actions" icon={Plus}>
            <div className="space-y-2">
              <QuickAction icon={Plus} label="Create New Template" chevron />
              <QuickAction icon={Upload} label="Import Template (HTML)" chevron />
              <QuickAction icon={Copy} label="Duplicate Template" chevron />
              <QuickAction icon={Download} label="Export Template" chevron />
              <QuickAction icon={FolderCog} label="Manage Categories" chevron />
            </div>
          </EmCard>

          <EmCard title="Recent Templates" icon={Mail} action={<ViewAll />}>
            <ul className="space-y-3">
              {recent.map((r) => (
                <li key={r.name} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg" style={{ background: "var(--em-blue-50)", color: "var(--em-primary)" }}>
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-[var(--em-text-primary)]">{r.name}</span>
                  <span className="em-num text-[11.5px] text-[var(--em-text-muted)]">{r.date}</span>
                </li>
              ))}
            </ul>
          </EmCard>
        </div>
      </div>
    </div>
  );
}

function TplPage({ children, active }: { children: React.ReactNode; active?: boolean }) {
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
