import { CircleCheck, Clock, Layers, Play } from "lucide-react";
import type { LearningProgress } from "@/features/student/data";

export function LearningProgressRing({ progress }: { progress: LearningProgress }) {
  const size = 120;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (progress.percent / 100) * c;

  const rows = [
    { icon: Layers, value: progress.total, label: "Total Courses", color: "text-primary" },
    { icon: Play, value: progress.inProgress, label: "In Progress", color: "text-primary" },
    { icon: CircleCheck, value: progress.completed, label: "Completed", color: "text-success" },
    { icon: Clock, value: progress.notStarted, label: "Not Started", color: "text-ink-subtle" },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="text-h4 mb-4 text-ink">My Learning Progress</h2>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="var(--color-surface-alt)"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-h3 font-extrabold text-ink">
            {progress.percent}%
          </span>
        </div>
        <ul className="flex-1 space-y-2.5">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center gap-2 text-body-sm">
              <row.icon className={`size-4 shrink-0 ${row.color}`} aria-hidden="true" />
              <span className="font-bold text-ink">{row.value}</span>
              <span className="text-ink-muted">{row.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
