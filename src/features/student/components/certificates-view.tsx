"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Crown,
  Download,
  Eye,
  ExternalLink,
  GraduationCap,
  MoreHorizontal,
  Search,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/features/student/certificates";

type Tab = "all" | "course" | "program";
const PAGE_SIZE = 5;

export function CertificatesView({
  items,
  studentName,
}: {
  items: Certificate[];
  studentName: string;
}) {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [page, setPage] = useState(1);

  const counts = {
    all: items.length,
    course: items.filter((c) => c.kind === "course").length,
    program: items.filter((c) => c.kind === "program").length,
  };

  const filtered = useMemo(
    () =>
      items.filter((c) => {
        if (tab !== "all" && c.kind !== tab) return false;
        if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [items, tab, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const selected = items.find((c) => c.id === selectedId) ?? items[0];

  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: `All Certificates (${counts.all})` },
    { key: "course", label: `Course Certificates (${counts.course})` },
    { key: "program", label: `Program Certificates (${counts.program})` },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* Main */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setTab(t.key);
                  setPage(1);
                }}
                className={cn(
                  "shrink-0 border-b-2 px-3 py-2 text-body-sm font-semibold transition-colors",
                  tab === t.key
                    ? "border-primary text-primary"
                    : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {pageRows.map((c) => {
            const active = c.id === selected?.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border bg-surface p-3 text-start transition-colors",
                    active ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40",
                  )}
                >
                  <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-50 to-accent-50 text-primary">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body font-bold text-ink">{c.title}</p>
                    <p className="text-caption text-ink-subtle">
                      {c.type} · Completed: {c.completed}
                    </p>
                  </div>
                  {c.distinction && (
                    <Badge variant="program" className="hidden shrink-0 gap-1 sm:inline-flex">
                      <Crown className="size-3.5" aria-hidden="true" />
                      With Distinction
                    </Badge>
                  )}
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted" aria-hidden="true">
                      <Download className="size-4" />
                    </span>
                    <span className="hidden size-9 items-center justify-center rounded-md border border-border-input text-ink-muted sm:inline-flex" aria-hidden="true">
                      <Eye className="size-4" />
                    </span>
                    <span className="hidden size-9 items-center justify-center rounded-md border border-border-input text-ink-muted sm:inline-flex" aria-hidden="true">
                      <MoreHorizontal className="size-4" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="text-caption text-ink-subtle">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} certificates
        </p>
      </div>

      {/* Rail */}
      <aside className="space-y-5">
        <div className="flex items-center gap-3">
          <label className="relative flex flex-1 items-center">
            <Search className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
            <span className="sr-only">Search certificates</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search certificates…"
              className="h-10 w-full rounded-lg border border-border-input bg-surface ps-9 pe-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
            />
          </label>
        </div>

        {selected && (
          <>
            <div>
              <p className="mb-2 text-body-sm font-bold text-ink">Certificate Preview</p>
              <div className="rounded-xl border-2 border-primary/20 bg-surface p-5 shadow-sm">
                <div className="rounded-lg border border-accent/40 bg-linear-to-b from-surface to-primary-50/30 p-5 text-center">
                  <div className="flex justify-center">
                    <Logo />
                  </div>
                  <p className="mt-3 text-h4 font-extrabold text-primary">Certificate of Completion</p>
                  <p className="mt-2 text-caption text-ink-subtle">This is to certify that</p>
                  <p className="mt-1 text-h4 text-ink">{studentName}</p>
                  <p className="mt-1 text-caption text-ink-subtle">has successfully completed the course</p>
                  <p className="mt-1 text-body font-bold text-ink">{selected.title}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div className="text-start">
                      <p className="border-t border-ink-subtle/40 pt-1 text-caption text-ink-subtle">
                        Course Director
                      </p>
                    </div>
                    <span className="flex size-10 items-center justify-center rounded-full bg-accent text-ink">
                      <Crown className="size-5" aria-hidden="true" />
                    </span>
                    <div className="text-end">
                      <p className="text-caption text-ink-subtle">Issued on</p>
                      <p className="text-caption font-semibold text-ink">{selected.completed}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button block>
              <Download className="size-4" aria-hidden="true" />
              Download Certificate (PDF)
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="size-4" aria-hidden="true" />
                Share on LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="size-4" aria-hidden="true" />
                Share Certificate
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-3 text-body-sm font-bold text-ink">Certificate Details</p>
              <dl className="space-y-3 text-body-sm">
                <Row label="Course" value={selected.title} />
                <Row label="Completed On" value={selected.completed} />
                <Row label="Grade" value={selected.grade} />
                <Row label="Certificate ID" value={selected.certId} />
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-subtle">Verification</dt>
                  <dd>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      <BadgeCheck className="size-4" aria-hidden="true" />
                      Verify Certificate
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-ink-subtle">{label}</dt>
      <dd className="text-end font-semibold text-ink">{value}</dd>
    </div>
  );
}
