import { ChevronDown } from "lucide-react";
import type { MethodShare, RevenuePoint } from "@/features/payments-admin/data";

/* ── Revenue trend (area + line) ──────────────────────────── */
export function RevenueTrendChart({ points }: { points: RevenuePoint[] }) {
  const W = 600;
  const H = 240;
  const padL = 44;
  const padR = 16;
  const padT = 20;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxY = 60000;
  const n = points.length;

  const x = (i: number) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v: number) => padT + (1 - v / maxY) * plotH;
  const bottom = padT + plotH;

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");
  const area = `${line} L${x(n - 1)},${bottom} L${x(0)},${bottom} Z`;
  const last = points[n - 1]!;
  const gridY = [0, 10000, 20000, 30000, 40000, 50000, 60000];

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-h4 text-ink">Revenue Trend</h3>
        <span className="relative inline-flex items-center">
          <select
            aria-label="Period"
            defaultValue="6m"
            className="h-9 cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-3 pe-8 text-caption font-medium text-ink outline-none focus-visible:border-primary"
          >
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 size-3.5 text-ink-subtle" aria-hidden="true" />
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-52 w-full" role="img" aria-label="Revenue trend over the last six months">
        <defs>
          <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridY.map((g) => (
          <g key={g}>
            <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 4" />
            <text x={padL - 8} y={y(g) + 4} textAnchor="end" className="fill-ink-subtle" style={{ fontSize: 10 }}>
              {g === 0 ? "0" : `${g / 1000}K`}
            </text>
          </g>
        ))}
        <path d={area} fill="url(#revArea)" />
        <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={p.label} cx={x(i)} cy={y(p.value)} r={i === n - 1 ? 5 : 3.5} fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2.5" />
        ))}
        {points.map((p, i) => (
          <text key={p.label} x={x(i)} y={H - 8} textAnchor="middle" className="fill-ink-subtle" style={{ fontSize: 10 }}>
            {p.label}
          </text>
        ))}
        {/* last-point callout */}
        <g transform={`translate(${x(n - 1) - 34}, ${y(last.value) - 30})`}>
          <rect width="68" height="22" rx="6" fill="var(--color-primary)" />
          <text x="34" y="15" textAnchor="middle" fill="white" style={{ fontSize: 11, fontWeight: 700 }}>
            ${last.value.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ── Payment methods (donut) ──────────────────────────────── */
const SEG_COLORS = ["var(--color-primary)", "var(--color-violet)", "var(--color-teal)", "var(--color-border-input)"];

export function PaymentMethodsDonut({
  segments,
  centerValue,
}: {
  segments: MethodShare[];
  centerValue: string;
}) {
  const r = 52;
  const C = 2 * Math.PI * r;
  const lens = segments.map((s) => (s.pct / 100) * C);
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-h4 text-ink">Payment Methods</h3>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative size-36 shrink-0">
          <svg viewBox="0 0 140 140" className="size-36 -rotate-90" role="img" aria-label="Payment methods breakdown">
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-surface-alt)" strokeWidth="16" />
            {segments.map((s, i) => (
              <circle
                key={s.label}
                cx="70"
                cy="70"
                r={r}
                fill="none"
                stroke={SEG_COLORS[i % SEG_COLORS.length]}
                strokeWidth="16"
                strokeDasharray={`${lens[i]} ${C - lens[i]!}`}
                strokeDashoffset={-offsets[i]!}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-body font-extrabold text-ink">{centerValue}</span>
            <span className="text-caption text-ink-subtle">Revenue</span>
          </div>
        </div>
        <ul className="min-w-0 flex-1 space-y-2.5">
          {segments.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2 text-body-sm">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: SEG_COLORS[i % SEG_COLORS.length] }} aria-hidden="true" />
              <span className="flex-1 truncate text-ink-muted">{s.label}</span>
              <span className="font-bold text-ink">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
