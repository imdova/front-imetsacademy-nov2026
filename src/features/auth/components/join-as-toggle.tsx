"use client";

import { type Control, type FieldValues, type Path, useController } from "react-hook-form";
import { Building2, Check, User } from "lucide-react";
import { JOIN_AS_OPTIONS } from "@/features/auth/schemas";
import { cn } from "@/lib/utils";

const icons = { individual: User, business: Building2 } as const;

/** "I'm joining as a" segmented control (Individual Learner / Business). */
export function JoinAsToggle<T extends FieldValues>({
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
      <p className="text-body-sm font-semibold text-ink">
        {label}
        <span className="text-danger"> *</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        {JOIN_AS_OPTIONS.map((option) => {
          const Icon = icons[option.value];
          const active = field.value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => field.onChange(option.value)}
              className={cn(
                "flex items-center gap-2 rounded-md border px-3 py-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                active
                  ? "border-primary bg-primary-50 text-primary"
                  : "border-border-input text-ink-muted hover:border-primary",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="flex-1 text-body-sm font-semibold text-ink">{option.label}</span>
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  active ? "border-primary bg-primary text-on-dark" : "border-border-input",
                )}
              >
                {active && <Check className="size-3" aria-hidden="true" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
