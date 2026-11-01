"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Course Information", "Course Content", "Review & Publish"];

/** 3-step progress header. Completed steps are clickable to go back. */
export function WizardStepper({
  step,
  onStepClick,
}: {
  step: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <ol className="flex items-start">
      {STEPS.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <Fragment key={label}>
            <li className="flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={i > step}
                onClick={() => i <= step && onStepClick?.(i)}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 text-body-sm font-bold transition-colors",
                  done || current
                    ? "border-primary bg-primary text-on-dark"
                    : "border-border-input bg-surface text-ink-subtle",
                  i <= step && "cursor-pointer",
                )}
              >
                {done ? <Check className="size-5" aria-hidden="true" /> : i + 1}
              </button>
              <span
                className={cn(
                  "max-w-[9rem] text-center text-body-sm",
                  current ? "font-bold text-primary" : done ? "font-semibold text-ink" : "text-ink-subtle",
                )}
              >
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <div
                className={cn("mt-5 h-0.5 flex-1 rounded-full", done ? "bg-primary" : "bg-border")}
                aria-hidden="true"
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
