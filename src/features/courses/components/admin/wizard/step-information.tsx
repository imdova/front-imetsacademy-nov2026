"use client";

import { useFormContext } from "react-hook-form";
import { CalendarDays, CircleCheck, Eye, Globe, GraduationCap, Info, Layers, Lightbulb, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TextField } from "@/components/shared/form/text-field";
import { TextareaField } from "@/components/shared/form/textarea-field";
import { CourseMeta } from "@/features/courses/components/course-meta";
import {
  COURSE_TYPE_OPTIONS,
  DURATION_OPTIONS,
  LANGUAGE_OPTIONS,
  LEARNING_MODE_OPTIONS,
  SESSIONS_OPTIONS,
  type CreateCourseForm,
} from "@/features/courses/wizard-schema";
import { CourseTypeToggle } from "@/features/courses/components/admin/wizard/course-type-toggle";
import { FormSelect } from "@/features/courses/components/admin/wizard/form-select";
import { ThumbnailField } from "@/features/courses/components/admin/wizard/thumbnail-field";

const SUBCATEGORIES = [
  "Strategic Management",
  "Leadership",
  "Project Management",
  "Digital Transformation",
  "Business Operations",
  "Finance & Analytics",
  "Marketing",
].map((v) => ({ value: v, label: v }));

const TIPS = [
  "Use a clear and compelling course title.",
  "Write a concise and value-focused summary.",
  "Choose the right category and type.",
  "Use a high-quality cover image (16:9).",
];

export function StepInformation({ categories }: { categories: { slug: string; name: string }[] }) {
  const { control, watch } = useFormContext<CreateCourseForm>();
  const [title, summary, courseType, thumbnail, durationMonths, learningMode, sessions] = watch([
    "title",
    "summary",
    "courseType",
    "thumbnail",
    "durationMonths",
    "learningMode",
    "sessions",
  ]);
  const typeLabel = COURSE_TYPE_OPTIONS.find((o) => o.value === courseType)?.label ?? "Diploma";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <header className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
            <Info className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-h3 text-ink">Course Information</h2>
            <p className="text-body-sm text-ink-muted">Enter the key details about your course.</p>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            control={control}
            name="title"
            label="Course Title *"
            placeholder="e.g. Strategic Management Diploma"
            showLabel
          />
          <CourseTypeToggle control={control} name="courseType" label="Course Type" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormSelect
            control={control}
            name="categorySlug"
            label="Category"
            required
            placeholder="Select a category"
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          />
          <FormSelect
            control={control}
            name="subcategory"
            label="Subcategory"
            placeholder="Select a subcategory"
            options={SUBCATEGORIES}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextareaField
            control={control}
            name="summary"
            label="Course Summary *"
            placeholder="A short, value-focused description of the course."
            maxLength={300}
            rows={4}
            showLabel
          />
          <ThumbnailField control={control} name="thumbnail" label="Course Thumbnail (Cover Image)" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormSelect
            control={control}
            name="durationMonths"
            label="Duration"
            required
            numeric
            options={DURATION_OPTIONS}
            icon={<CalendarDays className="size-5" />}
          />
          <FormSelect
            control={control}
            name="learningMode"
            label="Learning Mode"
            required
            options={LEARNING_MODE_OPTIONS}
            icon={<Monitor className="size-5" />}
          />
          <FormSelect
            control={control}
            name="sessions"
            label="Total Sessions"
            required
            numeric
            options={SESSIONS_OPTIONS}
            icon={<Layers className="size-5" />}
          />
          <FormSelect
            control={control}
            name="language"
            label="Language"
            required
            options={LANGUAGE_OPTIONS}
            icon={<Globe className="size-5" />}
          />
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="mb-4 inline-flex items-center gap-2 text-h4 text-ink">
            <Eye className="size-5 text-primary" aria-hidden="true" />
            Course Preview
          </h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="relative h-32 bg-navy-800">
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data-URL preview
                <img src={thumbnail} alt="" className="h-full w-full object-cover" />
              ) : (
                <GraduationCap
                  className="absolute end-3 bottom-1 size-16 text-white/10"
                  aria-hidden="true"
                />
              )}
              <Badge variant="program" className="absolute start-3 top-3">
                {typeLabel}
              </Badge>
            </div>
            <div className="space-y-2 p-4">
              <p className="font-display text-[18px] leading-6 font-bold text-ink">
                {title || "Course title"}
              </p>
              <p className="line-clamp-2 text-body-sm text-ink-muted">
                {summary || "Your course summary will appear here."}
              </p>
              <CourseMeta
                durationMonths={durationMonths || 1}
                learningMode={learningMode || "Live on Zoom"}
                sessions={sessions || 1}
                className="pt-1"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-accent-50 bg-accent-50/40 p-5">
          <h3 className="mb-3 inline-flex items-center gap-2 text-h4 text-ink">
            <Lightbulb className="size-5 text-accent-strong" aria-hidden="true" />
            Tips for Success
          </h3>
          <ul className="space-y-2">
            {TIPS.map((tip) => (
              <li key={tip} className="flex gap-2 text-body-sm text-ink-muted">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
