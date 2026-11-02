"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Monitor,
  Users,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/container";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";

type LiveCourse = {
  title: string;
  start: string;
  weeks: number;
  instructor: { name: string; role: string; initials: string };
  grad: string;
};

const liveCourses: LiveCourse[] = [
  {
    title: "Strategic Management for Business Leaders",
    start: "Nov 10, 2026",
    weeks: 6,
    instructor: { name: "Dr. Karim Mostafa", role: "Business Strategy Expert", initials: "KM" },
    grad: "from-navy-800 to-navy-950",
  },
  {
    title: "Project Management Professional (PMP® Preparation)",
    start: "Nov 17, 2026",
    weeks: 8,
    instructor: {
      name: "Dr. Rania Fouad",
      role: "PMO & Project Management Consultant",
      initials: "RF",
    },
    grad: "from-orange to-navy-900",
  },
  {
    title: "Business Analytics for Decision Making",
    start: "Nov 24, 2026",
    weeks: 6,
    instructor: { name: "Dr. Ahmed Saleh", role: "Business Analytics Expert", initials: "AS" },
    grad: "from-teal to-navy-900",
  },
];

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous courses" : "Next courses"}
      className="flex size-10 items-center justify-center rounded-pill border border-border bg-surface text-ink transition-colors hover:border-primary hover:text-primary cursor-pointer"
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}

/** Upcoming Live Courses — horizontally scrollable cohort cards. */
export function HomeLiveCourses() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <Container as="section" className="py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-h2 text-ink">Upcoming Live Courses</h2>
          <p className="text-body text-ink-muted">
            Join our next live cohorts and learn directly from industry experts.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <ArrowButton dir="prev" onClick={() => scroll(-1)} />
          <ArrowButton dir="next" onClick={() => scroll(1)} />
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {liveCourses.map((course) => (
          <article
            key={course.title}
            className="flex shrink-0 basis-[86%] snap-start flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm sm:basis-[47%] lg:basis-[calc((100%-3rem)/3)]"
          >
            <div className={cn("relative h-44 bg-gradient-to-br", course.grad)}>
              <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-danger px-2.5 py-1 text-xs font-bold text-on-dark">
                <span className="size-1.5 rounded-full bg-on-dark" aria-hidden="true" />
                Live
              </span>
              <div className="absolute start-3 bottom-3 rounded-md bg-surface px-3 py-2 shadow-sm">
                <p className="flex items-center gap-1 text-[11px] font-medium text-ink-subtle">
                  <CalendarDays className="size-3" aria-hidden="true" />
                  Cohort Starts
                </p>
                <p className="text-[13px] font-bold text-ink">{course.start}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-h4 font-display text-ink">
                <Link
                  href={routes.courses}
                  className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {course.title}
                </Link>
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" />
                  {course.weeks} Weeks
                </span>
                <span className="inline-flex items-center gap-1.5 border-s border-border ps-3">
                  <Monitor className="size-4" aria-hidden="true" />
                  Live via Zoom
                </span>
                <span className="inline-flex items-center gap-1.5 border-s border-border ps-3">
                  <Users className="size-4" aria-hidden="true" />
                  Limited Seats
                </span>
              </div>

              <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <Avatar initials={course.instructor.initials} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-ink">
                    {course.instructor.name}
                  </p>
                  <p className="truncate text-caption text-ink-muted">{course.instructor.role}</p>
                </div>
                <Link
                  href={routes.courses}
                  aria-label={`View ${course.title}`}
                  className="ms-auto flex size-9 shrink-0 items-center justify-center rounded-pill bg-primary text-on-dark transition-colors hover:bg-primary-hover"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
