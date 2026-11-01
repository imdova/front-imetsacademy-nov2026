import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LEAD = [29, 30]; // trailing days of the previous month
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const TODAY = 8;
const DOTS = new Set([5, 11, 18, 25]);

/** Static learning calendar (UI preview — November 2026). */
export function LearningCalendar() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          className="inline-flex size-8 items-center justify-center rounded-md text-ink-subtle hover:bg-surface-alt hover:text-ink"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <p className="text-body-sm font-bold text-ink">November 2026</p>
        <button
          type="button"
          aria-label="Next month"
          className="inline-flex size-8 items-center justify-center rounded-md text-ink-subtle hover:bg-surface-alt hover:text-ink"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-caption">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 font-semibold text-ink-subtle">
            {d}
          </span>
        ))}
        {LEAD.map((d) => (
          <span key={`lead-${d}`} className="py-1.5 text-ink-subtle/40">
            {d}
          </span>
        ))}
        {DAYS.map((d) => (
          <span key={d} className="relative flex justify-center py-1">
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full",
                d === TODAY ? "bg-primary font-semibold text-on-dark" : "text-ink",
              )}
            >
              {d}
            </span>
            {DOTS.has(d) && d !== TODAY && (
              <span
                className="absolute bottom-0.5 size-1 rounded-full bg-primary"
                aria-hidden="true"
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
