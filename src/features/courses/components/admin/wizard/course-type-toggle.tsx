"use client";

import { type Control, type FieldValues, type Path, useController } from "react-hook-form";
import { Award, Check, GraduationCap, Zap, type LucideIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { COURSE_TYPE_OPTIONS, type CourseType } from "@/features/courses/wizard-schema";
import { cn } from "@/lib/utils";

const typeIcon: Record<CourseType, LucideIcon> = {
  diploma: GraduationCap,
  certificate: Award,
  "short-course": Zap,
};

/** Segmented control for the course type (Diploma / Certificate / Short Course). */
export function CourseTypeToggle<T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
}) {
  const { field } = useController({ control, name });
  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        {label}
        <span className="text-danger"> *</span>
      </Label>
      <div className="grid grid-cols-3 gap-3">
        {COURSE_TYPE_OPTIONS.map((option) => {
          const Icon = typeIcon[option.value];
          const active = field.value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => field.onChange(option.value)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-2 rounded-md border px-3 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                active
                  ? "border-primary bg-primary-50 text-primary"
                  : "border-border-input text-ink-muted hover:border-primary hover:text-primary",
              )}
            >
              {active && <Check className="absolute end-2 top-2 size-4 text-primary" aria-hidden="true" />}
              <Icon className="size-6" aria-hidden="true" />
              <span className="text-body-sm font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
