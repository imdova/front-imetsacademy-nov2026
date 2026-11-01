import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "teal" | "violet" | "warm" | "rose";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary",
  teal: "bg-teal-50 text-teal",
  violet: "bg-violet-50 text-violet",
  warm: "bg-orange-50 text-orange",
  rose: "bg-rose-50 text-rose",
};

/** KPI tile with a big value, label below, and a trend pill (admin dashboards). */
export function TrendStat({
  icon,
  value,
  label,
  trend,
  tone = "primary",
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  trend?: string;
  tone?: Tone;
}) {
  const down = trend?.trim().startsWith("-");
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl",
          toneClass[tone],
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-stat font-extrabold text-ink">{value}</span>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-pill px-1.5 py-0.5 text-caption font-bold",
                down ? "bg-danger-50 text-danger" : "bg-success-50 text-success",
              )}
            >
              {down ? (
                <TrendingDown className="size-3" aria-hidden="true" />
              ) : (
                <TrendingUp className="size-3" aria-hidden="true" />
              )}
              {trend}
            </span>
          )}
        </div>
        <p className="truncate text-body-sm text-ink-muted">{label}</p>
      </div>
    </div>
  );
}
