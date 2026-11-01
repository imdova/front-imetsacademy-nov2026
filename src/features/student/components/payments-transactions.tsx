"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Download,
  GraduationCap,
  Layers,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Transaction, TxnKind } from "@/features/student/payments";

type Tab = "all" | TxnKind;
const PAGE_SIZE = 5;

const KIND_ICON: Record<TxnKind, LucideIcon> = {
  course: GraduationCap,
  subscription: Crown,
  bundle: Layers,
};

const STATUS_VARIANT = {
  Paid: "success",
  Refunded: "neutral",
  Pending: "warm",
} as const;

const TABS: { key: Tab; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All Transactions", icon: ListChecks },
  { key: "course", label: "Courses", icon: GraduationCap },
  { key: "subscription", label: "Subscriptions", icon: Crown },
  { key: "bundle", label: "Bundles", icon: Layers },
];

export function PaymentsTransactions({ transactions }: { transactions: Transaction[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (tab === "all" ? transactions : transactions.filter((t) => t.kind === tab)),
    [transactions, tab],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex gap-1 overflow-x-auto border-b border-border px-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setTab(t.key);
              setPage(1);
            }}
            className={cn(
              "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors",
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            <t.icon className="size-4" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-start">
          <thead>
            <tr className="border-b border-border text-caption text-ink-subtle">
              <th className="px-4 py-3 text-start font-semibold">Transaction</th>
              <th className="px-4 py-3 text-start font-semibold">Item</th>
              <th className="px-4 py-3 text-start font-semibold">Amount</th>
              <th className="px-4 py-3 text-start font-semibold">Date</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
              <th className="px-4 py-3 text-start font-semibold">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((t) => {
              const Icon = KIND_ICON[t.kind];
              return (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-4 text-body-sm font-semibold text-ink-muted">#{t.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-body-sm font-bold text-ink">{t.item}</p>
                        <p className="text-caption text-ink-subtle">{t.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-body-sm font-bold text-ink">{t.amount}</td>
                  <td className="px-4 py-4 text-body-sm text-ink-muted">{t.date}</td>
                  <td className="px-4 py-4">
                    <Badge variant={STATUS_VARIANT[t.status]}>{t.status}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted"
                      aria-hidden="true"
                    >
                      <Download className="size-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
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
  );
}
