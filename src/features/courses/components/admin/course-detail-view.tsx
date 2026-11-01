"use client";

import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  CirclePlay,
  CircleCheck,
  Copy,
  Database,
  FileText,
  Globe,
  GraduationCap,
  Info,
  Languages,
  LayoutGrid,
  Lock,
  Megaphone,
  Monitor,
  Pencil,
  Plus,
  Settings,
  Signal,
  Tag,
  Target,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import type { CourseWithRelations } from "@/features/courses/schemas";
import { COURSE_STATUS_LABEL } from "@/features/courses/schemas";
import { EnrollmentsTab } from "@/features/courses/components/admin/enrollments-tab";
import { formatCount, formatPrice } from "@/lib/format";
import { Avatar } from "@/components/shared/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "curriculum", label: "Curriculum", icon: BookOpen },
  { key: "enrollments", label: "Enrollments", icon: Users },
  { key: "pricing", label: "Pricing", icon: Tag },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "marketing", label: "Marketing", icon: Megaphone },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function minutes(total: number): string {
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

function levelFor(months: number): "Beginner" | "Intermediate" | "Advanced" {
  if (months <= 2) return "Beginner";
  if (months === 3) return "Intermediate";
  return "Advanced";
}

export function CourseDetailView({ course }: { course: CourseWithRelations }) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [status, setStatus] = useState(course.status);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [enroll, setEnroll] = useState(true);

  const lessons = course.curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const sections = course.curriculum.length;
  const weeks = course.durationMonths * 4;
  const revenue = course.price * course.enrolled;
  const certificates = Math.round(course.enrolled * 0.65);
  const avgProgress = Math.min(95, 50 + Math.round(course.rating * 8));
  const level = levelFor(course.durationMonths);
  const fullPrice = course.oldPrice ?? course.price;
  const discountPrice = course.oldPrice ? course.price : null;
  const updated = new Date(course.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* Main column */}
      <div className="space-y-6">
        {/* Hero */}
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-5 md:flex-row">
          <div className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-navy-800 to-navy-900 md:w-64">
            <CirclePlay className="size-12 text-white/70" aria-hidden="true" />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-pill bg-black/40 px-2.5 py-1 text-caption font-semibold text-white backdrop-blur">
              <CirclePlay className="size-3.5" aria-hidden="true" />
              {lessons} Lessons
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-h2 text-ink">{course.title}</h2>
            <p className="mt-1 text-body-sm text-ink-muted">{course.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="info">{course.category.name}</Badge>
              <Chip icon={Signal}>{level}</Chip>
              <Chip icon={CirclePlay}>{weeks} Weeks</Chip>
              <Chip icon={Globe}>{course.language}</Chip>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StatusPill status={status} />
              <span className="text-caption text-ink-subtle">Last updated: {updated}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors",
                tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              <t.icon className="size-4" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" || tab === "curriculum" ? (
          <>
            {tab === "overview" && (
              <>
                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MiniStat icon={<Users className="size-5" />} tone="primary" value={formatCount(course.enrolled)} label="Total Enrollments" trend="+12%" />
                  <MiniStat icon={<CirclePlay className="size-5" />} tone="teal" value={`${avgProgress}%`} label="Avg. Progress" trend="+5%" />
                  <MiniStat icon={<GraduationCap className="size-5" />} tone="violet" value={formatCount(certificates)} label="Certificates Issued" trend="+18%" />
                  <MiniStat icon={<Database className="size-5" />} tone="warm" value={formatPrice(revenue)} label="Total Revenue" trend="+27%" />
                </div>

                {/* Overview + Description */}
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-xl border border-border bg-surface p-5">
                    <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                      <Info className="size-5 text-primary" aria-hidden="true" />
                      Course Overview
                    </h3>
                    <dl className="mt-4 divide-y divide-border text-body-sm">
                      <OverviewRow icon={FileText} label="Course Code" value={course.code} />
                      <OverviewRow icon={Monitor} label="Format" value={course.learningMode} />
                      <OverviewRow icon={Signal} label="Level" value={level} />
                      <OverviewRow icon={CirclePlay} label="Duration" value={`${weeks} Weeks`} />
                      <OverviewRow icon={Languages} label="Language" value={course.language} />
                      <OverviewRow icon={GraduationCap} label="Category" value={course.category.name} />
                    </dl>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-5">
                    <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                      <FileText className="size-5 text-primary" aria-hidden="true" />
                      Description
                    </h3>
                    <p className="mt-3 text-body-sm text-ink-muted">{course.description}</p>
                    <h4 className="mt-5 inline-flex items-center gap-2 text-body font-bold text-ink">
                      <Target className="size-4 text-primary" aria-hidden="true" />
                      Learning Outcomes
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {course.whatYouLearn.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-body-sm text-ink-muted">
                          <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Curriculum */}
            <Curriculum course={course} sections={sections} lessons={lessons} />
          </>
        ) : tab === "enrollments" ? (
          <EnrollmentsTab totalEnrollments={course.enrolled} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
              {(() => {
                const Icon = TABS.find((t) => t.key === tab)!.icon;
                return <Icon className="size-6" aria-hidden="true" />;
              })()}
            </span>
            <p className="text-h4 text-ink">{TABS.find((t) => t.key === tab)!.label}</p>
            <p className="max-w-sm text-body-sm text-ink-subtle">
              This section is part of the admin preview and will be wired to the backend next.
            </p>
          </div>
        )}
      </div>

      {/* Rail */}
      <aside className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Database className="size-5 text-primary" aria-hidden="true" />
            Course Status
          </h3>
          <label className="relative mt-4 flex items-center">
            <span className="sr-only">Course status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-4 pe-9 text-body-sm font-semibold text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
            >
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
          </label>

          <h3 className="mt-6 inline-flex items-center gap-2 text-h4 text-ink">
            <Globe className="size-5 text-primary" aria-hidden="true" />
            Visibility
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVisibility("public")}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-body-sm font-semibold transition-colors",
                visibility === "public" ? "border-primary bg-primary-50 text-primary" : "border-border-input text-ink-muted hover:border-primary",
              )}
            >
              <Globe className="size-4" aria-hidden="true" />
              Public
            </button>
            <button
              type="button"
              onClick={() => setVisibility("private")}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-body-sm font-semibold transition-colors",
                visibility === "private" ? "border-primary bg-primary-50 text-primary" : "border-border-input text-ink-muted hover:border-primary",
              )}
            >
              <Lock className="size-4" aria-hidden="true" />
              Private
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Tag className="size-5 text-primary" aria-hidden="true" />
            Enrollment &amp; Pricing
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-ink">Price</label>
              <input
                defaultValue={formatPrice(fullPrice)}
                className="h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-ink">Discount Price (Optional)</label>
              <input
                defaultValue={discountPrice ? formatPrice(discountPrice) : ""}
                placeholder="—"
                className="h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2.5 text-body-sm font-medium text-ink">
              <input
                type="checkbox"
                checked={enroll}
                onChange={(e) => setEnroll(e.target.checked)}
                className="size-4 rounded border-border-input accent-primary"
              />
              Enable Enrollment
            </label>
            <Button variant="outline-primary" block>
              <Tag className="size-4" aria-hidden="true" />
              Manage Pricing &amp; Offers
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Users className="size-5 text-primary" aria-hidden="true" />
            Course Instructors
          </h3>
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-border p-3">
            <Avatar initials={course.instructor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-sm font-bold text-ink">{course.instructor.name}</p>
              <p className="text-caption text-ink-subtle">Course Instructor</p>
            </div>
            <button type="button" aria-label="Edit instructor" className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary">
              <Pencil className="size-4" aria-hidden="true" />
            </button>
          </div>
          <Button variant="outline-primary" block className="mt-3">
            <Plus className="size-4" aria-hidden="true" />
            Add Instructor
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Chip({ icon: Icon, children }: { icon: typeof Signal; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border-input bg-surface px-2.5 py-1 text-caption font-medium text-ink">
      <Icon className="size-3.5 text-ink-subtle" aria-hidden="true" />
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: CourseWithRelations["status"] }) {
  const style =
    status === "published"
      ? "bg-success-50 text-success"
      : status === "scheduled"
        ? "bg-teal-50 text-teal"
        : status === "draft"
          ? "bg-orange-50 text-orange"
          : "bg-surface-alt text-ink-muted";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", style)}>
      <CircleCheck className="size-3.5" aria-hidden="true" />
      {COURSE_STATUS_LABEL[status]}
    </span>
  );
}

function MiniStat({
  icon,
  value,
  label,
  trend,
  tone,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  trend: string;
  tone: "primary" | "teal" | "violet" | "warm";
}) {
  const tones = {
    primary: "bg-primary-50 text-primary",
    teal: "bg-teal-50 text-teal",
    violet: "bg-violet-50 text-violet",
    warm: "bg-orange-50 text-orange",
  };
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className={cn("flex size-10 items-center justify-center rounded-lg", tones[tone])}>{icon}</span>
        <span className="inline-flex items-center gap-0.5 rounded-pill bg-success-50 px-1.5 py-0.5 text-caption font-bold text-success">
          <TrendingUp className="size-3" aria-hidden="true" />
          {trend}
        </span>
      </div>
      <p className="mt-3 text-stat font-extrabold text-ink">{value}</p>
      <p className="text-caption text-ink-muted">{label}</p>
    </div>
  );
}

function OverviewRow({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="inline-flex items-center gap-2 text-ink-muted">
        <Icon className="size-4 text-ink-subtle" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-end font-semibold text-ink">{value}</dd>
    </div>
  );
}

function Curriculum({
  course,
  sections,
  lessons,
}: {
  course: CourseWithRelations;
  sections: number;
  lessons: number;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
          <BookOpen className="size-5 text-primary" aria-hidden="true" />
          Curriculum
          <span className="text-body-sm font-normal text-ink-subtle">
            ({sections} Sections · {lessons} Lessons)
          </span>
        </h3>
        <Button variant="outline" size="sm">
          <Plus className="size-4" aria-hidden="true" />
          Add Section
        </Button>
      </div>

      <ul className="mt-4 space-y-2">
        {course.curriculum.map((m, i) => {
          const mins = m.lessons.reduce((n, l) => n + l.durationMin, 0);
          const isOpen = open.has(i);
          return (
            <li key={m.title} className="rounded-lg border border-border">
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex min-w-0 flex-1 items-center gap-3 text-start"
                >
                  <ChevronDown className={cn("size-4 shrink-0 text-ink-subtle transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                  <BookOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate font-semibold text-ink">
                    {i + 1}. {m.title.replace(/^Module\s*\d+:\s*/i, "")}
                  </span>
                </button>
                <span className="hidden shrink-0 text-caption text-ink-subtle sm:inline">
                  {m.lessons.length} Lessons · {minutes(mins)}
                </span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <IconBtn label="Edit section"><Pencil className="size-4" aria-hidden="true" /></IconBtn>
                  <IconBtn label="Duplicate section"><Copy className="size-4" aria-hidden="true" /></IconBtn>
                  <IconBtn label="Delete section"><Trash2 className="size-4" aria-hidden="true" /></IconBtn>
                </div>
              </div>
              {isOpen && (
                <ul className="divide-y divide-border border-t border-border">
                  {m.lessons.map((l) => (
                    <li key={l.code} className="flex items-center gap-3 px-4 py-2.5 ps-11 text-body-sm">
                      <CirclePlay className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-ink">
                        <span className="text-ink-subtle">{l.code}</span> {l.title}
                      </span>
                      <span className="shrink-0 text-caption text-ink-subtle">{l.durationMin} min</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary">
      {children}
    </button>
  );
}
