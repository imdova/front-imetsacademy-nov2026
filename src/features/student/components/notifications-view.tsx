"use client";

import { useMemo, useState } from "react";
import {
  Award,
  Bell,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  GraduationCap,
  MoreVertical,
  Settings2,
  SlidersHorizontal,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type {
  NotificationCategory,
  NotificationPref,
  StudentNotification,
} from "@/features/student/notifications";

const CATEGORY_ICON: Record<NotificationCategory, LucideIcon> = {
  course: GraduationCap,
  payment: CreditCard,
  certificate: Award,
  account: User,
};

type Row = StudentNotification & { starred: boolean };
type Tab = "all" | NotificationCategory;
type Quick = "all" | "unread" | "read" | "starred";
const PAGE_SIZE = 6;

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "course", label: "Courses" },
  { key: "payment", label: "Payments" },
  { key: "certificate", label: "Certificates" },
  { key: "account", label: "Account" },
];

export function NotificationsView({
  items,
  preferences,
}: {
  items: StudentNotification[];
  preferences: NotificationPref[];
}) {
  const [rows, setRows] = useState<Row[]>(() => items.map((n) => ({ ...n, starred: false })));
  const [prefs, setPrefs] = useState(preferences);
  const [tab, setTab] = useState<Tab>("all");
  const [quick, setQuick] = useState<Quick>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const counts = useMemo(
    () => ({
      all: rows.length,
      course: rows.filter((r) => r.category === "course").length,
      payment: rows.filter((r) => r.category === "payment").length,
      certificate: rows.filter((r) => r.category === "certificate").length,
      account: rows.filter((r) => r.category === "account").length,
    }),
    [rows],
  );
  const quickCounts = useMemo(
    () => ({
      all: rows.length,
      unread: rows.filter((r) => r.unread).length,
      read: rows.filter((r) => !r.unread).length,
      starred: rows.filter((r) => r.starred).length,
    }),
    [rows],
  );

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (tab !== "all" && r.category !== tab) return false;
        if (quick === "unread" && !r.unread) return false;
        if (quick === "read" && r.unread) return false;
        if (quick === "starred" && !r.starred) return false;
        return true;
      }),
    [rows, tab, quick],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function resetPage(fn: () => void) {
    fn();
    setPage(1);
  }
  function markAllRead() {
    setRows((rs) => rs.map((r) => ({ ...r, unread: false })));
  }
  function toggleStar(id: string) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, starred: !r.starred } : r)));
  }
  function markRead(id: string) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, unread: false } : r)));
  }
  function toggleSelect(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  const allSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  function toggleSelectAll() {
    setSelected((s) => {
      const next = new Set(s);
      if (allSelected) pageRows.forEach((r) => next.delete(r.id));
      else pageRows.forEach((r) => next.add(r.id));
      return next;
    });
  }

  const QUICK: { key: Quick; label: string; icon: LucideIcon }[] = [
    { key: "all", label: "All Notifications", icon: Bell },
    { key: "unread", label: "Unread", icon: SlidersHorizontal },
    { key: "read", label: "Read", icon: CheckCheck },
    { key: "starred", label: "Starred", icon: Star },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Main */}
      <div className="rounded-xl border border-border bg-surface">
        <div className="flex gap-1 overflow-x-auto border-b border-border px-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => resetPage(() => setTab(t.key))}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors",
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <label className="flex cursor-pointer items-center gap-2 text-body-sm text-ink-muted">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="size-4 rounded border-border-input accent-primary"
            />
            Select All
          </label>
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary hover:underline"
          >
            <CheckCheck className="size-4" aria-hidden="true" />
            Mark All as Read
          </button>
        </div>

        <ul>
          {pageRows.map((r) => {
            const Icon = CATEGORY_ICON[r.category];
            return (
              <li
                key={r.id}
                className={cn(
                  "flex items-start gap-3 border-t border-border px-4 py-4 transition-colors",
                  r.unread && "bg-primary-50/40",
                )}
              >
                <input
                  type="checkbox"
                  checked={selected.has(r.id)}
                  onChange={() => toggleSelect(r.id)}
                  aria-label={`Select ${r.title}`}
                  className="mt-1 size-4 rounded border-border-input accent-primary"
                />
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <button
                  type="button"
                  onClick={() => markRead(r.id)}
                  className="min-w-0 flex-1 text-start"
                >
                  <p className="flex items-center gap-2 text-body-sm font-bold text-ink">
                    <span className="truncate">{r.title}</span>
                  </p>
                  <p className="mt-0.5 text-body-sm text-ink-muted">{r.body}</p>
                  {r.highlight && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary-50 px-2 py-1 text-caption font-semibold text-primary">
                      {r.highlight}
                    </span>
                  )}
                </button>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStar(r.id)}
                    aria-label={r.starred ? "Unstar" : "Star"}
                    aria-pressed={r.starred}
                    className="text-ink-subtle hover:text-orange"
                  >
                    <Star className={cn("size-4", r.starred && "fill-orange text-orange")} aria-hidden="true" />
                  </button>
                  {r.unread && <span className="size-2.5 rounded-full bg-primary" aria-label="Unread" />}
                  <span className="hidden text-caption text-ink-subtle sm:inline">{r.time}</span>
                  <MoreVertical className="size-4 text-ink-subtle" aria-hidden="true" />
                </div>
              </li>
            );
          })}
          {pageRows.length === 0 && (
            <li className="border-t border-border px-4 py-12 text-center text-body-sm text-ink-subtle">
              No notifications here.
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
          <p className="text-caption text-ink-subtle">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} notifications
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === safePage ? "page" : undefined}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold",
                  p === safePage
                    ? "bg-primary text-on-dark"
                    : "border border-border-input text-ink-muted hover:border-primary hover:text-primary",
                )}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Rail */}
      <aside className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Settings2 className="size-5 text-primary" aria-hidden="true" />
            Notification Settings
          </h2>
          <p className="mt-1 text-caption text-ink-subtle">Choose what you want to be notified about.</p>
          <ul className="mt-4 space-y-4">
            {prefs.map((p) => (
              <li key={p.key} className="flex items-center justify-between gap-3">
                <span className="text-body-sm text-ink">{p.label}</span>
                <Switch
                  checked={p.enabled}
                  aria-label={p.label}
                  onCheckedChange={(next) =>
                    setPrefs((ps) => ps.map((x) => (x.key === p.key ? { ...x, enabled: next } : x)))
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <SlidersHorizontal className="size-5 text-primary" aria-hidden="true" />
            Quick Filters
          </h2>
          <ul className="mt-4 space-y-1">
            {QUICK.map((q) => (
              <li key={q.key}>
                <button
                  type="button"
                  onClick={() => resetPage(() => setQuick(q.key))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors",
                    quick === q.key
                      ? "bg-primary-50 text-primary"
                      : "text-ink-muted hover:bg-surface-alt hover:text-ink",
                  )}
                >
                  <q.icon className="size-4" aria-hidden="true" />
                  <span className="flex-1 text-start">{q.label}</span>
                  <span className="text-caption text-ink-subtle">({quickCounts[q.key]})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
