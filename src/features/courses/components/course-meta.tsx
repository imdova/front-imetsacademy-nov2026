import { CalendarDays, Monitor, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/** Meta row: duration · mode · sessions. Unit is always "Sessions" (not Lectures). */
export function CourseMeta({
  durationMonths,
  learningMode,
  sessions,
  tone = "light",
  className,
}: {
  durationMonths: number;
  learningMode: string;
  sessions: number;
  tone?: "light" | "on-dark";
  className?: string;
}) {
  const color = tone === "on-dark" ? "text-on-dark-muted" : "text-ink-subtle";
  const divider = tone === "on-dark" ? "border-white/20" : "border-border";
  const items = [
    { icon: CalendarDays, label: `${durationMonths} Months` },
    { icon: Monitor, label: learningMode },
    { icon: Users, label: `${sessions} Sessions` },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-caption", color, className)}>
      {items.map((item, i) => (
        <span
          key={item.label}
          className={cn("inline-flex items-center gap-1.5", i > 0 && `border-s ps-3 ${divider}`)}
        >
          <item.icon className="size-4" aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  );
}
