import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/config/routes";
import { AssignmentsView } from "@/features/assignments/components/assignments-view";

export const metadata: Metadata = { title: "Assignments · Instructor" };

export default function Page() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-body-sm">
        <Link href={routes.instructor.courses} className="font-medium text-primary hover:underline">My Courses</Link>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="text-ink-muted">Strategic Management (IM-SMD-101)</span>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="font-semibold text-ink">Assignments</span>
      </nav>
      <AssignmentsView />
    </div>
  );
}
