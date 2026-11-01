import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "teal" | "violet" | "warm" | "rose";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary",
  teal: "bg-teal-50 text-teal",
  violet: "bg-violet-50 text-violet",
  warm: "bg-orange-50 text-orange",
  rose: "bg-rose-50 text-rose",
};

/** KPI card (design-system `.im-stat`): tinted icon, label, number, trend/hint. */
export function StatCard({
  icon,
  label,
  value,
  hint,
  trend,
  tone = "primary",
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: string;
  tone?: Tone;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-surface p-5">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-pill",
          toneClass[tone],
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] leading-[18px] text-ink-muted">{label}</p>
        <p className="text-stat text-ink">{value}</p>
        {trend ? (
          <p className="inline-flex items-center gap-1 text-caption text-success">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            {trend}
          </p>
        ) : hint ? (
          <p className="text-caption text-ink-subtle">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
