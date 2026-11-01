import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import { routes } from "@/config/routes";
import { QuizBuilder } from "@/features/quizzes/components/quiz-builder";

export const metadata: Metadata = { title: "Add New Quiz · Admin" };

export default function AdminNewQuizPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-body-sm">
        <Link href={routes.admin.courses} className="font-medium text-primary hover:underline">Courses</Link>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="text-ink-muted">Quizzes</span>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="text-ink-muted">Add New Quiz</span>
      </nav>

      <div className="flex items-start gap-3">
        <Link href={routes.admin.courses} aria-label="Back to courses" className="mt-1 inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted hover:border-primary hover:text-primary">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <ClipboardCheck className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-h1 text-ink">Add New Quiz</h1>
          <p className="mt-1 text-body text-ink-muted">
            Create a quiz for a course, add questions, set grading rules, and publish.
          </p>
        </div>
      </div>

      <QuizBuilder cancelHref={routes.admin.courses} />
    </div>
  );
}
