"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarCheck,
  ChevronRight,
  Coins,
  Settings,
  Share2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const explorerCategories: { label: string; icon: LucideIcon }[] = [
  { label: "Leadership & People Management", icon: Users },
  { label: "Operations & Process Excellence", icon: Settings },
  { label: "Strategy & Business Growth", icon: BarChart3 },
  { label: "Finance & Business Control", icon: Coins },
  { label: "Project Management", icon: Share2 },
  { label: "Marketing & Customer Value", icon: Briefcase },
];

/** Next cohort start — drives the countdown (matches the first live cohort). */
const COHORT_START = new Date("2026-11-10T09:00:00Z").getTime();

function computeRemaining() {
  const diff = Math.max(0, COHORT_START - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Countdown() {
  const [t, setT] = useState<ReturnType<typeof computeRemaining> | null>(null);

  useEffect(() => {
    const tick = () => setT(computeRemaining());
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: t ? pad(t.days) : "--" },
    { label: "Hours", value: t ? pad(t.hours) : "--" },
    { label: "Minutes", value: t ? pad(t.minutes) : "--" },
    { label: "Seconds", value: t ? pad(t.seconds) : "--" },
  ];

  return (
    <div>
      <p className="text-caption font-bold tracking-wide text-ink-muted uppercase">
        Next Cohort Starts In
      </p>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-[60px] rounded-lg bg-surface px-3 py-2 text-center shadow-sm"
          >
            <p className="font-display text-2xl font-extrabold text-ink tabular-nums">{u.value}</p>
            <p className="text-caption text-ink-muted">{u.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Explore band — course-category explorer + next-cohort countdown. */
export function HomeExploreBand() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    scroller.current?.scrollBy({ left: scroller.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-surface">
      <Container className="py-12 md:py-16">
        {/* Course explorer */}
        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-center">
          <div>
            <h2 className="text-h2 text-ink">Explore Business Management Courses</h2>
            <p className="text-body-sm mt-2 text-ink-muted">
              Practical programs designed to build your management, leadership, and business
              capabilities.
            </p>
            <Link
              href={routes.courses}
              className="group mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-primary"
            >
              View All Courses
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="relative">
            <div
              ref={scroller}
              className="flex gap-3 overflow-x-auto pb-2 pe-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {explorerCategories.map((cat, i) => (
                <Link
                  key={cat.label}
                  href={routes.courses}
                  className={cn(
                    "flex min-w-[140px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl p-4 text-center transition-colors",
                    i === 0
                      ? "bg-primary text-on-dark"
                      : "bg-primary-50 text-primary hover:bg-primary-100",
                  )}
                >
                  <cat.icon className="size-7 shrink-0" aria-hidden="true" />
                  <span
                    className={cn(
                      "text-caption font-bold",
                      i === 0 ? "text-on-dark" : "text-ink",
                    )}
                  >
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="More categories"
              className="absolute end-0 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-pill border border-border bg-surface text-ink shadow-md transition-colors hover:border-primary hover:text-primary cursor-pointer"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Next cohort countdown band */}
        <div className="mt-8 rounded-2xl bg-primary-50 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-10">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-on-dark shadow-sm">
                <CalendarCheck className="size-7" aria-hidden="true" />
              </span>
              <div className="lg:border-e lg:border-border lg:pe-10">
                <h3 className="text-h3 text-ink">Next Live Cohorts</h3>
                <p className="text-body-sm max-w-xs text-ink-muted">
                  Join upcoming live courses and learn with a new cohort in real time.
                </p>
              </div>
            </div>

            <Countdown />

            <div className="flex flex-col items-start gap-3">
              <Button asChild variant="accent" size="lg" className="rounded-pill">
                <Link href={routes.courses}>
                  Reserve Your Seat
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <span className="inline-flex items-center gap-2 text-body-sm font-medium text-ink-muted">
                <Users className="size-4 text-primary" aria-hidden="true" />
                Limited Seats Available
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
