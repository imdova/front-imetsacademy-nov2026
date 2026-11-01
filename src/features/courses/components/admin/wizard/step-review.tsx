"use client";

import { useFormContext, useController } from "react-hook-form";
import {
  CalendarClock,
  CircleCheck,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Monitor,
  Pencil,
  Rocket,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  COURSE_TYPE_OPTIONS,
  type CreateCourseForm,
  type PublishOption,
} from "@/features/courses/wizard-schema";
import { cn } from "@/lib/utils";

const PUBLISH_OPTIONS: { value: PublishOption; title: string; desc: string; icon: typeof Globe }[] = [
  { value: "publish-now", title: "Publish Now", desc: "Make the course live and visible to learners.", icon: Globe },
  { value: "schedule", title: "Schedule Publish", desc: "Set a future date and time to go live.", icon: CalendarClock },
  { value: "draft", title: "Save as Draft", desc: "Keep it as a draft and publish later.", icon: FileText },
];

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-border-input px-3 py-1.5 text-body-sm font-medium text-ink-muted hover:border-primary hover:text-primary"
    >
      <Pencil className="size-3.5" aria-hidden="true" />
      Edit
    </button>
  );
}

function SummaryRow({
  icon,
  title,
  children,
  onEdit,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-alt/50 p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
          {icon}
        </span>
        <div>
          <p className="font-display text-[15px] font-bold text-ink">{title}</p>
          <p className="text-body-sm text-ink-muted">{children}</p>
        </div>
      </div>
      <EditButton onClick={onEdit} />
    </div>
  );
}

export function StepReview({
  categories,
  onEdit,
}: {
  categories: { slug: string; name: string }[];
  onEdit: (step: number) => void;
}) {
  const { control, watch } = useFormContext<CreateCourseForm>();
  const { field: publishField } = useController({ control, name: "publishOption" });
  const values = watch();

  const typeLabel = COURSE_TYPE_OPTIONS.find((o) => o.value === values.courseType)?.label ?? "";
  const categoryName = categories.find((c) => c.slug === values.categorySlug)?.name ?? "—";
  const totalLessons = values.curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const totalMin = values.curriculum.reduce(
    (n, m) => n + m.lessons.reduce((s, l) => s + (Number(l.durationMin) || 0), 0),
    0,
  );
  const duration = `${Math.floor(totalMin / 60)}:${String(totalMin % 60).padStart(2, "0")}:00`;

  const checklist = [
    { label: "Course information is complete.", ok: Boolean(values.title && values.summary && values.categorySlug) },
    { label: "At least one module and lesson are added.", ok: totalLessons > 0 },
    { label: "Course thumbnail (cover image) is uploaded.", ok: Boolean(values.thumbnail) },
    {
      label: "Duration, learning mode, and language are set.",
      ok: Boolean(values.durationMonths && values.learningMode && values.language),
    },
    { label: "Certificate and enrollment settings are configured.", ok: true },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Review */}
      <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
        <header className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
            <Eye className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-h3 text-ink">Review Course Details</h2>
            <p className="text-body-sm text-ink-muted">
              Verify your course information, content, and settings before publishing.
            </p>
          </div>
        </header>

        <div className="flex gap-4 rounded-lg border border-border p-4">
          <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-md bg-navy-800">
            {values.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element -- local data-URL preview
              <img src={values.thumbnail} alt="" className="h-full w-full object-cover" />
            ) : (
              <GraduationCap className="absolute end-2 bottom-1 size-12 text-white/10" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-h4 text-ink">{values.title || "Untitled course"}</h3>
              <EditButton onClick={() => onEdit(0)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="program">{typeLabel}</Badge>
              <Badge variant="info">{categoryName}</Badge>
              <Badge variant="neutral">{values.durationMonths} Months</Badge>
            </div>
            <p className="line-clamp-2 text-body-sm text-ink-muted">{values.summary}</p>
          </div>
        </div>

        <SummaryRow icon={<Layers className="size-5" />} title="Course Content" onEdit={() => onEdit(1)}>
          {values.curriculum.length} Modules · {totalLessons} Lessons · {duration} Total Duration
        </SummaryRow>
        <SummaryRow icon={<Monitor className="size-5" />} title="Learning & Delivery" onEdit={() => onEdit(0)}>
          {values.learningMode} · {values.sessions} Sessions · {values.language}
        </SummaryRow>
        <SummaryRow icon={<Settings className="size-5" />} title="Enrollment & Settings" onEdit={() => onEdit(0)}>
          Enrollment: Open · Certificate: Enabled · Visibility: Public
        </SummaryRow>
      </div>

      {/* Publish */}
      <aside className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <header className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <Rocket className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-h3 text-ink">Publish Your Course</h2>
              <p className="text-body-sm text-ink-muted">Choose a publishing option.</p>
            </div>
          </header>

          <p className="mb-2 text-body-sm font-semibold text-ink">Course Status</p>
          <div className="space-y-3">
            {PUBLISH_OPTIONS.map(({ value, title, desc, icon: Icon }) => {
              const selected = publishField.value === value;
              return (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                    selected ? "border-primary bg-primary-50" : "border-border-input hover:border-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="publishOption"
                    value={value}
                    checked={selected}
                    onChange={() => publishField.onChange(value)}
                    className="mt-1 accent-[var(--color-primary)]"
                  />
                  <Icon className={cn("mt-0.5 size-5 shrink-0", selected ? "text-primary" : "text-ink-subtle")} aria-hidden="true" />
                  <span>
                    <span className="block text-body-sm font-semibold text-ink">{title}</span>
                    <span className="block text-caption text-ink-muted">{desc}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 inline-flex items-center gap-2 text-h4 text-ink">
            <CircleCheck className="size-5 text-success" aria-hidden="true" />
            Pre-publish Checklist
          </h3>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item.label} className="flex gap-3 text-body-sm">
                <CircleCheck
                  className={cn("mt-0.5 size-4 shrink-0", item.ok ? "text-success" : "text-ink-subtle/40")}
                  aria-hidden="true"
                />
                <span className={item.ok ? "text-ink" : "text-ink-subtle"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
