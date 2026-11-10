/* Lightweight inline-SVG charts for the Email Marketing area (no chart lib). */

export type Segment = { label: string; value: number; color: string };

export function DonutChart({
  segments,
  size = 184,
  thickness = 22,
  centerValue,
  centerLabel,
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  centerValue: string;
  centerLabel: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={centerLabel}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--em-neutral-100)"
          strokeWidth={thickness}
        />
        {segments.map((s) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </g>
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="em-num"
        style={{ fontSize: 24, fontWeight: 800, fill: "var(--em-text-primary)" }}
      >
        {centerValue}
      </text>
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 11, fontWeight: 500, fill: "var(--em-text-secondary)" }}
      >
        {centerLabel}
      </text>
    </svg>
  );
}

export type LineSeries = { color: string; values: number[]; fill?: boolean };

export function LineChart({
  labels,
  series,
  yLabels,
  yMax,
  height = 230,
}: {
  labels: string[];
  series: LineSeries[];
  yLabels: string[]; // top → bottom
  yMax?: number;
  height?: number;
}) {
  const W = 680;
  const H = height;
  const padL = 40;
  const padR = 14;
  const padT = 12;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = yMax ?? Math.max(1, ...series.flatMap((s) => s.values));
  const n = labels.length;

  const x = (i: number) => padL + (plotW * i) / Math.max(1, n - 1);
  const y = (v: number) => padT + plotH * (1 - v / max);

  const rows = yLabels.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="xMidYMid meet" role="img">
      {/* grid + y labels */}
      {yLabels.map((lab, i) => {
        const gy = padT + (plotH * i) / (rows - 1);
        return (
          <g key={lab + i}>
            <line x1={padL} y1={gy} x2={W - padR} y2={gy} stroke="var(--em-chart-grid)" strokeWidth={1} />
            <text
              x={padL - 8}
              y={gy}
              textAnchor="end"
              dominantBaseline="middle"
              className="em-num"
              style={{ fontSize: 11, fill: "var(--em-text-muted)" }}
            >
              {lab}
            </text>
          </g>
        );
      })}
      {/* x labels */}
      {labels.map((lab, i) => (
        <text
          key={lab + i}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          style={{ fontSize: 11, fill: "var(--em-text-muted)" }}
        >
          {lab}
        </text>
      ))}
      {/* series */}
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
        const areaPts = `${padL},${padT + plotH} ${pts} ${W - padR},${padT + plotH}`;
        return (
          <g key={si}>
            {s.fill && <polygon points={areaPts} fill={s.color} opacity={0.12} />}
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
            {s.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={3.5} fill="#fff" stroke={s.color} strokeWidth={2} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Compact area sparkline (e.g. Subscriber Growth). */
export function AreaSpark({
  values,
  color = "var(--em-success)",
  height = 120,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  const W = 320;
  const H = height;
  const padT = 8;
  const padB = 8;
  const plotH = H - padT - padB;
  const max = Math.max(1, ...values);
  const min = Math.min(...values);
  const span = Math.max(1, max - min);
  const x = (i: number) => (W * i) / Math.max(1, values.length - 1);
  const y = (v: number) => padT + plotH * (1 - (v - min) / span);
  const pts = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" role="img">
      <polygon points={`0,${H} ${pts} ${W},${H}`} fill={color} opacity={0.14} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/** Donut legend row. */
export function LegendRow({
  color,
  label,
  pct,
  count,
}: {
  color: string;
  label: string;
  pct: string;
  count?: string;
}) {
  return (
    <li className="flex items-center gap-2 text-[13px]">
      <span className="size-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
      <span className="flex-1 truncate text-[var(--em-text-body)]">{label}</span>
      <span className="em-num font-bold text-[var(--em-text-primary)]">{pct}</span>
      {count && <span className="em-num w-16 text-end text-[var(--em-text-secondary)]">{count}</span>}
    </li>
  );
}
