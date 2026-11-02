"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { HomeCourseCard } from "@/components/home/home-course-card";
import type { CourseWithRelations } from "@/features/courses/schemas";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "all", label: "All Courses" },
  { key: "diploma", label: "Diploma" },
  { key: "certification-prep", label: "Certification Prep" },
  { key: "short", label: "Short Course" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function matches(course: CourseWithRelations, tab: TabKey): boolean {
  if (tab === "all") return true;
  if (tab === "short") return course.durationMonths <= 2;
  return course.programType === tab;
}

export function HomeFeaturedCourses({ courses }: { courses: CourseWithRelations[] }) {
  const [tab, setTab] = useState<TabKey>("all");
  const filtered = courses.filter((c) => matches(c, tab)).slice(0, 3);

  return (
    <Container as="section" className="py-12 md:py-16">
      <SectionHeading
        title="Featured Courses"
        action={
          <Link
            href={routes.courses}
            className="group inline-flex items-center gap-1 text-body-sm font-semibold text-primary"
          >
            View All Courses
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={cn(
              "rounded-pill px-4 py-2 text-body-sm font-semibold transition cursor-pointer",
              tab === t.key
                ? "bg-primary text-on-dark"
                : "border border-border bg-surface text-ink-muted hover:border-primary hover:text-primary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((course) => <HomeCourseCard key={course.id} course={course} />)
        ) : (
          <p className="text-body-sm text-ink-muted">No courses in this category yet.</p>
        )}
      </div>
    </Container>
  );
}
