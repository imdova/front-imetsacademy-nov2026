import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- Breadcrumb + page header ---------------- */

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--em-text-secondary)]">
      {items.map((it, i) => (
        <span key={it} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3.5 text-[var(--em-text-muted)]" aria-hidden="true" />}
          <span className={i === items.length - 1 ? "font-semibold text-[var(--em-text-primary)]" : ""}>
            {it}
          </span>
        </span>
      ))}
    </nav>
  );
}

export function Pill({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-10 items-center gap-2 rounded-xl border bg-white px-3 text-[13px] font-medium text-[var(--em-text-body)]"
      style={{ borderColor: "var(--em-border)" }}
    >
      {Icon && <Icon className="size-4 text-[var(--em-text-secondary)]" aria-hidden="true" />}
      {children}
      <ChevronDown className="size-4 text-[var(--em-text-secondary)]" aria-hidden="true" />
    </button>
  );
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  breadcrumb,
  right,
}: {
  icon: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: string[];
  right?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-xl text-white"
            style={{ background: "var(--em-primary)" }}
          >
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-[var(--em-text-primary)]">
              {title}
            </h1>
            {description && (
              <p className="mt-1 max-w-3xl text-[14px] text-[var(--em-text-secondary)]">
                {description}
              </p>
            )}
          </div>
        </div>
        {right && <div className="flex flex-wrap items-center gap-2">{right}</div>}
      </div>
    </div>
  );
}

/* ---------------- Trend badge ---------------- */

export function TrendBadge({
  value,
  up = true,
}: {
  value: string;
  up?: boolean;
}) {
  return (
    <span
      className="em-num inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold"
      style={{
        color: up ? "var(--em-success)" : "var(--em-danger)",
        background: up ? "var(--em-success-bg)" : "var(--em-danger-bg)",
      }}
    >
      {up ? <ArrowUp className="size-3" aria-hidden="true" /> : <ArrowDown className="size-3" aria-hidden="true" />}
      {value}
    </span>
  );
}

/* ---------------- KPI card ---------------- */

export function KpiCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  trend,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  trend?: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border bg-white p-4"
      style={{ borderColor: "var(--em-border)", boxShadow: "var(--em-shadow-card)" }}
    >
      <div className="flex items-start gap-3">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-xl"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="em-num text-[23px] font-bold leading-none text-[var(--em-text-primary)]">
              {value}
            </p>
            {trend}
          </div>
          <p className="mt-1.5 truncate text-[12.5px] text-[var(--em-text-secondary)]">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Card ---------------- */

export function EmCard({
  icon: Icon,
  title,
  action,
  children,
  className,
  bodyClassName,
  pad = true,
}: {
  icon?: LucideIcon;
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  pad?: boolean;
}) {
  return (
    <section
      className={cn("rounded-2xl border bg-white", className)}
      style={{ borderColor: "var(--em-border)", boxShadow: "var(--em-shadow-card)" }}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
          <h2 className="flex items-center gap-2 text-[16px] font-bold text-[var(--em-text-primary)]">
            {Icon && <Icon className="size-[18px] text-[var(--em-primary)]" aria-hidden="true" />}
            {title}
          </h2>
          {action}
        </header>
      )}
      <div className={cn(pad && "px-5 pb-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function ViewAll({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--em-primary)]"
    >
      View All
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

/* ---------------- Status badge ---------------- */

type StatusKind = "active" | "completed" | "scheduled" | "draft" | "paused" | "failed" | "bounced";

const STATUS: Record<StatusKind, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "var(--em-success)", bg: "var(--em-success-bg)" },
  completed: { label: "Completed", color: "var(--em-success)", bg: "var(--em-success-bg)" },
  scheduled: { label: "Scheduled", color: "var(--em-scheduled)", bg: "var(--em-info-bg)" },
  draft: { label: "Draft", color: "var(--em-draft)", bg: "var(--em-draft-bg)" },
  paused: { label: "Paused", color: "var(--em-paused)", bg: "var(--em-warning-bg)" },
  failed: { label: "Failed", color: "var(--em-danger)", bg: "var(--em-danger-bg)" },
  bounced: { label: "Bounced", color: "var(--em-danger)", bg: "var(--em-danger-bg)" },
};

export function StatusBadge({ status, label }: { status: StatusKind; label?: string }) {
  const s = STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold"
      style={{ color: s.color, background: s.bg }}
    >
      <span className="size-1.5 rounded-full" style={{ background: s.color }} aria-hidden="true" />
      {label ?? s.label}
    </span>
  );
}

/* ---------------- Quick action row ---------------- */

export function QuickAction({
  icon: Icon,
  label,
  primary = false,
  chevron = false,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
  chevron?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] font-semibold transition-colors",
        primary ? "text-white" : "text-[var(--em-text-body)] hover:bg-[var(--em-blue-50)]",
      )}
      style={primary ? { background: "var(--em-primary)" } : { background: "var(--em-surface-subtle)" }}
    >
      <Icon className={cn("size-[18px] shrink-0", primary ? "text-white" : "text-[var(--em-primary)]")} />
      <span className="flex-1 text-start">{label}</span>
      {chevron && (
        <ChevronRight
          className={cn("size-4", primary ? "text-white/80" : "text-[var(--em-text-muted)]")}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
