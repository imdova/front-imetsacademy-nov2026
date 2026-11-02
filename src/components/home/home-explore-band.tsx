"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  Megaphone,
  Radio,
  Settings,
  Share2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type Accent = "primary" | "teal" | "violet" | "orange" | "success";

const ACCENTS: Record<Accent, { bar: string; icon: string; grad: string }> = {
  primary: { bar: "bg-primary", icon: "text-primary", grad: "from-primary to-navy-900" },
  teal: { bar: "bg-teal", icon: "text-teal", grad: "from-teal to-navy-900" },
  violet: { bar: "bg-violet", icon: "text-violet", grad: "from-violet to-navy-900" },
  orange: { bar: "bg-orange", icon: "text-orange", grad: "from-orange to-navy-900" },
  success: { bar: "bg-success", icon: "text-success", grad: "from-success to-navy-900" },
};

const explorerCategories: { label: string; icon: LucideIcon; accent: Accent }[] = [
  { label: "Leadership & People Management", icon: Users, accent: "primary" },
  { label: "Operations & Process Excellence", icon: Settings, accent: "teal" },
  { label: "Strategy & Business Growth", icon: BarChart3, accent: "violet" },
  { label: "Finance & Business Control", icon: Coins, accent: "orange" },
  { label: "Project Management", icon: Share2, accent: "success" },
  { label: "Marketing & Customer Value", icon: Megaphone, accent: "primary" },
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
      <p className="flex items-center gap-2 text-caption font-bold tracking-wide text-ink-muted uppercase">
        <Radio className="size-4 text-primary" aria-hidden="true" />
        Next Cohort Starts In
      </p>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-[62px] rounded-xl bg-surface px-3 py-3 text-center shadow-sm"
          >
            <p className="font-display text-3xl leading-none font-extrabold text-ink tabular-nums">
              {u.value}
            </p>
            <p className="mt-1 text-caption text-ink-muted">{u.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Stylized brand calendar illustration. */
function CalendarMark() {
  return (
    <div className="relative size-16 shrink-0">
      <div className="absolute inset-0 rounded-xl bg-primary shadow-md" />
      <div className="absolute inset-x-[6px] top-[9px] bottom-[6px] overflow-hidden rounded-md bg-surface">
        <div className="h-3 w-full bg-primary/80" />
        <div className="grid grid-cols-4 gap-[3px] p-[5px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-1.5 rounded-[2px] bg-primary-100" />
          ))}
        </div>
      </div>
      <span className="absolute -end-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-pill bg-accent text-ink shadow">
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    </div>
  );
}

/** Explore band — image-topped course explorer + next-cohort countdown. */
export function HomeExploreBand() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-surface">
      <Container className="py-12 md:py-16">
        {/* Course explorer */}
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="text-overline text-primary">Business Management</p>
            <h2 className="text-h2 mt-3 text-ink">
              Explore Business Management <span className="text-primary">Courses</span>
            </h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-1 w-14 rounded-pill bg-gradient-to-r from-primary to-accent"
            />
            <p className="text-body-sm mt-4 text-ink-muted">
              Practical programs designed to build your management, leadership, and business
              capabilities.
            </p>
            <Button asChild variant="outline-primary" className="mt-5 rounded-pill">
              <Link href={routes.courses}>
                View All Courses
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous categories"
              className="absolute start-0 top-[38%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-pill border border-border bg-surface text-ink shadow-md transition-colors hover:border-primary hover:text-primary cursor-pointer max-sm:hidden"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <div
              ref={scroller}
              className="flex snap-x gap-4 overflow-x-auto px-1 pb-3 sm:px-11 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {explorerCategories.map((cat) => {
                const a = ACCENTS[cat.accent];
                return (
                  <Link
                    key={cat.label}
                    href={routes.courses}
                    className="group block w-[200px] shrink-0 snap-start overflow-hidden rounded-xl bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className={cn("relative h-28 bg-gradient-to-br", a.grad)}>
                      <cat.icon
                        className="absolute end-3 bottom-2 size-16 text-white/15"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="relative px-4 pb-4 pt-7">
                      <span
                        className={cn(
                          "absolute -top-5 start-4 flex size-10 items-center justify-center rounded-lg bg-surface shadow-md",
                          a.icon,
                        )}
                      >
                        <cat.icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="font-display text-[15px] leading-tight font-bold text-ink">
                        {cat.label}
                      </p>
                    </div>
                    <div className={cn("h-1.5", a.bar)} />
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="More categories"
              className="absolute end-0 top-[38%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-pill border border-border bg-surface text-ink shadow-md transition-colors hover:border-primary hover:text-primary cursor-pointer max-sm:hidden"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            <div className="mt-4 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 rounded-pill transition-all",
                    i === 0 ? "w-5 bg-primary" : "w-2 bg-border",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Next cohort countdown band */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 md:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute end-0 bottom-0 h-28 w-48 bg-primary/10"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-10">
            <div className="flex items-center gap-4 lg:border-e lg:border-primary-100 lg:pe-10">
              <CalendarMark />
              <div>
                <h3 className="text-h3 text-ink">Next Live Cohort</h3>
                <p className="text-body-sm max-w-xs text-ink-muted">
                  Join our upcoming live course and learn with a new cohort in real time.
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
