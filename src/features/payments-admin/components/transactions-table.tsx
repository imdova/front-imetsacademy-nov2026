"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  Clock,
  CreditCard,
  Eye,
  Landmark,
  Layers,
  MoreVertical,
  RotateCcw,
  Search,
  Wallet,
} from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  AdminTransaction,
  CourseTint,
  PaymentMethodKind,
  TxnStatus,
} from "@/features/payments-admin/data";

const courseTint: Record<CourseTint, string> = {
  blue: "from-primary-50 to-primary-100 text-primary",
  teal: "from-teal-50 to-teal-50 text-teal",
  violet: "from-violet-50 to-violet-50 text-violet",
  warm: "from-orange-50 to-orange-50 text-orange",
};

const METHOD: Record<PaymentMethodKind, { label: string; icon: typeof CreditCard }> = {
  credit: { label: "Credit Card", icon: CreditCard },
  paypal: { label: "PayPal", icon: Wallet },
  bank: { label: "Bank Transfer", icon: Landmark },
};

const STATUS: Record<TxnStatus, { className: string; icon: typeof CircleCheck; label: string }> = {
  successful: { className: "bg-success-50 text-success", icon: CircleCheck, label: "Successful" },
  pending: { className: "bg-orange-50 text-orange", icon: Clock, label: "Pending" },
  refunded: { className: "bg-rose-50 text-rose", icon: RotateCcw, label: "Refunded" },
};

function StatusPill({ status }: { status: TxnStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", s.className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {s.label}
    </span>
  );
}

function Select({ icon: Icon, label, value, onChange, children }: { icon: typeof Calendar; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative inline-flex items-center">
      <Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-9 pe-9 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </label>
  );
}

const TABS = [
  { key: "transactions", label: "Transactions", icon: Banknote },
  { key: "refunds", label: "Refunds", icon: RotateCcw },
  { key: "payouts", label: "Payouts", icon: Building2 },
] as const;
type TabKey = (typeof TABS)[number]["key"];
const PAGE_SIZE = 7;

export function TransactionsTable({ transactions }: { transactions: AdminTransaction[] }) {
  const [tab, setTab] = useState<TabKey>("transactions");
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("all");
  const [status, setStatus] = useState("all");
  const [course, setCourse] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const courses = useMemo(() => [...new Set(transactions.map((t) => t.course))].sort(), [transactions]);

  const base = tab === "refunds" ? transactions.filter((t) => t.status === "refunded") : transactions;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return base.filter((t) => {
      if (method !== "all" && t.method !== method) return false;
      if (status !== "all" && t.status !== status) return false;
      if (course !== "all" && t.course !== course) return false;
      if (q && !`${t.id} ${t.student.name} ${t.student.email} ${t.course}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [base, method, status, course, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((t) => t.id);
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const toggleAll = () =>
    setSelected((s) => {
      const next = new Set(s);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  const toggleRow = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const onFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <div className="rounded-xl border border-border bg-surface">
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border px-2">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => { setTab(t.key); setPage(1); }} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
            <t.icon className="size-4" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "payouts" ? (
        <div className="flex flex-col items-center gap-2 px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><Building2 className="size-6" aria-hidden="true" /></span>
          <p className="text-h4 text-ink">Payouts</p>
          <p className="max-w-sm text-body-sm text-ink-subtle">Instructor and partner payouts will appear here once the backend is connected.</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
            <label className="relative flex min-w-[220px] flex-1 items-center">
              <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
              <span className="sr-only">Search transactions</span>
              <input type="search" value={search} onChange={(e) => onFilter(setSearch)(e.target.value)} placeholder="Search by transaction ID, student, or course…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Select icon={Calendar} label="Time" value="all" onChange={() => {}}>
                <option value="all">All Time</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </Select>
              <Select icon={Layers} label="Course" value={course} onChange={onFilter(setCourse)}>
                <option value="all">All Courses</option>
                {courses.map((c) => (<option key={c} value={c}>{c}</option>))}
              </Select>
              <Select icon={CreditCard} label="Payment method" value={method} onChange={onFilter(setMethod)}>
                <option value="all">All Payment Methods</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </Select>
              <Select icon={CircleCheck} label="Status" value={status} onChange={onFilter(setStatus)}>
                <option value="all">All Statuses</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto border-t border-border">
            <table className="w-full min-w-[1040px] border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-border text-caption text-ink-subtle">
                  <th className="w-10 ps-4 pe-2 py-3"><input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} className="size-4 rounded border-border-input accent-primary" /></th>
                  <th className="px-4 py-3 text-start font-semibold">Transaction ID</th>
                  <th className="px-4 py-3 text-start font-semibold">Student</th>
                  <th className="px-4 py-3 text-start font-semibold">Course / Item</th>
                  <th className="px-4 py-3 text-start font-semibold">Amount</th>
                  <th className="px-4 py-3 text-start font-semibold">Payment Method</th>
                  <th className="px-4 py-3 text-start font-semibold">Status</th>
                  <th className="px-4 py-3 text-start font-semibold">Date</th>
                  <th className="px-4 py-3 text-start font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((t) => {
                  const checked = selected.has(t.id);
                  const M = METHOD[t.method];
                  return (
                    <tr key={t.id} className={cn("border-b border-border last:border-0 transition-colors", checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50")}>
                      <td className="ps-4 pe-2 py-3"><input type="checkbox" aria-label={`Select ${t.id}`} checked={checked} onChange={() => toggleRow(t.id)} className="size-4 rounded border-border-input accent-primary" /></td>
                      <td className="px-4 py-3 font-semibold text-primary">{t.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar initials={t.student.initials} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate font-bold text-ink">{t.student.name}</p>
                            <p className="truncate text-caption text-ink-subtle">{t.student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br", courseTint[t.courseTint])}>
                            <BookOpen className="size-4" aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-ink">{t.course}</p>
                            <p className="text-caption text-ink-subtle">Course</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-ink">{formatPrice(t.amount)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink">
                          <M.icon className="size-4 text-ink-subtle" aria-hidden="true" />
                          {M.label}
                        </span>
                      </td>
                      <td className="px-4 py-3"><StatusPill status={t.status} /></td>
                      <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{formatDateTime(t.date)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          <button type="button" aria-label="View transaction" className={iconAction}><Eye className="size-4" aria-hidden="true" /></button>
                          <button type="button" aria-label="More actions" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <p className="text-caption text-ink-subtle">
              Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
            </p>
            <div className="flex items-center gap-1">
              <PagerBtn label="First" disabled={safePage === 1} onClick={() => setPage(1)}><ChevronsLeft className="size-4" aria-hidden="true" /></PagerBtn>
              <PagerBtn label="Previous" disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft className="size-4" aria-hidden="true" /></PagerBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} type="button" onClick={() => setPage(p)} aria-current={p === safePage ? "page" : undefined} className={cn("inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold", p === safePage ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary hover:text-primary")}>{p}</button>
              ))}
              <PagerBtn label="Next" disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}><ChevronRight className="size-4" aria-hidden="true" /></PagerBtn>
              <PagerBtn label="Last" disabled={safePage === totalPages} onClick={() => setPage(totalPages)}><ChevronsRight className="size-4" aria-hidden="true" /></PagerBtn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const iconAction = "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function PagerBtn({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return `${date}, ${time}`;
}
