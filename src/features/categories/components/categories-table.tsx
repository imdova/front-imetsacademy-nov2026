"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  CircleX,
  Copy,
  LayoutGrid,
  Layers,
  List,
  MoreVertical,
  Pencil,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { routes } from "@/config/routes";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AdminCategory } from "@/features/categories/data";
import { CATEGORY_ICONS, colorTint } from "@/features/categories/icons";

function StatusPill({ status }: { status: AdminCategory["status"] }) {
  const active = status === "active";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", active ? "bg-success-50 text-success" : "bg-surface-alt text-ink-muted")}>
      {active ? <CircleCheck className="size-3.5" aria-hidden="true" /> : <CircleX className="size-3.5" aria-hidden="true" />}
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function IconChip({ category, size = "md" }: { category: AdminCategory; size?: "md" | "lg" }) {
  const Icon = CATEGORY_ICONS[category.icon];
  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-xl", size === "lg" ? "size-14" : "size-10")}
      style={colorTint(category.color)}
      aria-hidden="true"
    >
      <Icon className={size === "lg" ? "size-7" : "size-5"} />
    </span>
  );
}

type SortKey = "order" | "name" | "courses" | "enrollments" | "created";
const PAGE_SIZE = 8;
const SORT_OPTIONS: { value: string; label: string; key: SortKey; dir: 1 | -1 }[] = [
  { value: "order", label: "Order", key: "order", dir: 1 },
  { value: "name", label: "Name", key: "name", dir: 1 },
  { value: "courses", label: "Most Courses", key: "courses", dir: -1 },
  { value: "enrollments", label: "Most Enrollments", key: "enrollments", dir: -1 },
  { value: "newest", label: "Newest", key: "created", dir: -1 },
];

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface pe-9 ps-4 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </label>
  );
}

export function CategoriesTable({ categories }: { categories: AdminCategory[] }) {
  const [items, setItems] = useState(categories);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortValue, setSortValue] = useState("order");
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sort = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0]!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = items.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (q && !`${c.name} ${c.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
    out.sort((a, b) => {
      switch (sort.key) {
        case "name":
          return a.name.localeCompare(b.name) * sort.dir;
        case "courses":
          return (a.courses - b.courses) * sort.dir;
        case "enrollments":
          return (a.enrollments - b.enrollments) * sort.dir;
        case "created":
          return (new Date(a.created).getTime() - new Date(b.created).getTime()) * sort.dir;
        default:
          return (a.order - b.order) * sort.dir;
      }
    });
    return out;
  }, [items, search, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((c) => c.id);
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

  function move(id: string, dir: "up" | "down") {
    setItems((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((x) => x.id === id);
      const swap = dir === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= sorted.length) return prev;
      const a = sorted[idx]!;
      const b = sorted[swap]!;
      return prev.map((x) => (x.id === a.id ? { ...x, order: b.order } : x.id === b.id ? { ...x, order: a.order } : x));
    });
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-4 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search categories</span>
          <input type="search" value={search} onChange={(e) => onFilter(setSearch)(e.target.value)} placeholder="Search categories…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-11 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Select label="Status" value={status} onChange={onFilter(setStatus)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <div className="inline-flex items-center gap-2">
            <span className="text-body-sm text-ink-subtle">Sort by:</span>
            <Select label="Sort by" value={sortValue} onChange={onFilter(setSortValue)}>
              {SORT_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </Select>
          </div>
          <div className="inline-flex overflow-hidden rounded-lg border border-border-input">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={cn("flex size-11 items-center justify-center transition-colors", view === "grid" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}>
              <LayoutGrid className="size-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={cn("flex size-11 items-center justify-center transition-colors", view === "list" ? "bg-primary text-on-dark" : "text-ink-muted hover:bg-surface-alt")}>
              <List className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary-50 px-4 py-2.5">
          <span className="text-body-sm font-semibold text-primary">{selected.size} selected</span>
          <button type="button" onClick={() => setSelected(new Set())} className="text-body-sm font-semibold text-primary hover:underline">Clear</button>
        </div>
      )}

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pageRows.map((c) => (
            <div key={c.id} className={cn("rounded-xl border bg-surface p-5 transition-colors", selected.has(c.id) ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40")}>
              <div className="flex items-start gap-3">
                <input type="checkbox" aria-label={`Select ${c.name}`} checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="mt-1 size-4 rounded border-border-input accent-primary" />
                <IconChip category={c} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{c.name}</p>
                  <p className="line-clamp-2 text-caption text-ink-subtle">{c.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-body-sm">
                <span className="inline-flex items-center gap-1.5 text-ink"><Layers className="size-4 text-ink-subtle" aria-hidden="true" />{c.courses}</span>
                <span className="inline-flex items-center gap-1.5 text-ink"><Users className="size-4 text-ink-subtle" aria-hidden="true" />{formatCount(c.enrollments)}</span>
                <StatusPill status={c.status} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[980px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-border text-caption text-ink-subtle">
                <th className="w-10 ps-4 pe-2 py-3"><input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} className="size-4 rounded border-border-input accent-primary" /></th>
                <th className="px-4 py-3 text-start font-semibold">Category</th>
                <th className="px-4 py-3 text-start font-semibold">Courses</th>
                <th className="px-4 py-3 text-start font-semibold">Enrollments</th>
                <th className="px-4 py-3 text-start font-semibold">Status</th>
                <th className="px-4 py-3 text-start font-semibold">Order</th>
                <th className="px-4 py-3 text-start font-semibold">Created</th>
                <th className="px-4 py-3 text-start font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((c) => {
                const checked = selected.has(c.id);
                const canReorder = sort.key === "order";
                return (
                  <tr key={c.id} className={cn("border-b border-border last:border-0 transition-colors", checked ? "bg-primary-50/40" : "hover:bg-surface-alt/50")}>
                    <td className="ps-4 pe-2 py-3"><input type="checkbox" aria-label={`Select ${c.name}`} checked={checked} onChange={() => toggleRow(c.id)} className="size-4 rounded border-border-input accent-primary" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <IconChip category={c} />
                        <div className="min-w-0">
                          <p className="truncate font-bold text-ink">{c.name}</p>
                          <p className="truncate text-caption text-ink-subtle">{c.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ink"><Layers className="size-4 text-ink-subtle" aria-hidden="true" />{c.courses}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ink"><Users className="size-4 text-ink-subtle" aria-hidden="true" />{formatCount(c.enrollments)}</span>
                    </td>
                    <td className="px-4 py-3"><StatusPill status={c.status} /></td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <button type="button" aria-label="Move up" disabled={!canReorder} onClick={() => move(c.id, "up")} className="inline-flex size-7 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-30 hover:border-primary hover:text-primary">
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center font-semibold text-ink">{c.order}</span>
                        <button type="button" aria-label="Move down" disabled={!canReorder} onClick={() => move(c.id, "down")} className="inline-flex size-7 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-30 hover:border-primary hover:text-primary">
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        </button>
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{formatCreated(c.created)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        <Link href={routes.admin.newCategory} aria-label="Edit category" className={iconAction}><Pencil className="size-4" aria-hidden="true" /></Link>
                        <button type="button" aria-label="Duplicate category" className={iconAction}><Copy className="size-4" aria-hidden="true" /></button>
                        <button type="button" aria-label="Delete category" className={iconAction}><Trash2 className="size-4" aria-hidden="true" /></button>
                        <button type="button" aria-label="More actions" className={iconAction}><MoreVertical className="size-4" aria-hidden="true" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} categories
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

function formatCreated(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
