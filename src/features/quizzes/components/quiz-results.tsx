"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  Download,
  Lightbulb,
  ListChecks,
  Megaphone,
  Minus,
  RotateCcw,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QStatus = "correct" | "incorrect" | "notanswered";
type Review = {
  q: number;
  status: QStatus;
  question: string;
  yourAnswer: string;
  correctAnswer?: string;
  got: number;
  total: number;
};
type Topic = { name: string; pct: number };

const QUIZ = "Module 2 Quiz: Strategic Frameworks";

const PASSED = {
  percent: 84,
  score: "42 / 50",
  correct: 12,
  incorrect: 2,
  notAnswered: 1,
  total: 15,
  topics: [
    { name: "Strategy Concepts & Principles", pct: 100 },
    { name: "Strategic Frameworks & Models", pct: 80 },
    { name: "Analysis & Diagnosis", pct: 100 },
    { name: "Competitive Positioning", pct: 50 },
  ] as Topic[],
  reviews: [
    { q: 1, status: "correct", question: "Which of the following best defines a business strategy framework?", yourAnswer: "B. A structured model that guides strategy, execution and performance.", got: 4, total: 4 },
    { q: 2, status: "correct", question: "The Plan-Do-Check-Act (PDCA) cycle is primarily used for:", yourAnswer: "A. Continuous improvement.", got: 4, total: 4 },
    { q: 3, status: "incorrect", question: "Which framework focuses on value-chain activities?", yourAnswer: "B. BCG Matrix.", correctAnswer: "A. Porter's Value Chain.", got: 0, total: 4 },
    { q: 4, status: "correct", question: "Match the following strategy models with their correct focus.", yourAnswer: "(All matches correct)", got: 6, total: 6 },
    { q: 5, status: "notanswered", question: "A strategy framework provides a structured approach to:", yourAnswer: "Not answered", got: 0, total: 4 },
  ] as Review[],
} as const;

const FAILED = {
  percent: 48,
  score: "24 / 50",
  correct: 6,
  incorrect: 8,
  notAnswered: 1,
  total: 15,
  topics: [
    { name: "Strategy Concepts & Principles", pct: 75 },
    { name: "Strategic Frameworks & Models", pct: 40 },
    { name: "Analysis & Diagnosis", pct: 33 },
    { name: "Competitive Positioning", pct: 50 },
  ] as Topic[],
  reviews: [
    { q: 1, status: "correct", question: "Which of the following best defines a business strategy framework?", yourAnswer: "B. A structured model that guides strategy, execution and performance.", got: 4, total: 4 },
    { q: 2, status: "incorrect", question: "The Plan-Do-Check-Act (PDCA) cycle is primarily used for:", yourAnswer: "C. Marketing strategy.", correctAnswer: "A. Continuous improvement.", got: 0, total: 4 },
    { q: 3, status: "incorrect", question: "Which framework focuses on value-chain activities?", yourAnswer: "D. SWOT analysis.", correctAnswer: "A. Porter's Value Chain.", got: 0, total: 4 },
    { q: 4, status: "correct", question: "Match the following strategy models with their correct focus.", yourAnswer: "(All matches correct)", got: 6, total: 6 },
    { q: 5, status: "incorrect", question: "A strategy framework provides a structured approach to:", yourAnswer: "B. Reducing marketing costs.", correctAnswer: "A. Decision-making and execution.", got: 0, total: 4 },
  ] as Review[],
} as const;

const STATUS_ICON: Record<QStatus, { icon: LucideIcon; className: string }> = {
  correct: { icon: CircleCheck, className: "text-success" },
  incorrect: { icon: CircleX, className: "text-danger" },
  notanswered: { icon: Minus, className: "text-ink-subtle" },
};

function topicColor(pct: number): string {
  if (pct >= 70) return "bg-success";
  if (pct >= 50) return "bg-orange";
  return "bg-danger";
}

const TABS = [
  { key: "review", label: "Question Review", icon: ListChecks },
  { key: "summary", label: "Answers Summary", icon: BarChart3 },
  { key: "feedback", label: "Feedback", icon: Megaphone },
] as const;

export function QuizResults({ passed }: { passed: boolean }) {
  const d = passed ? PASSED : FAILED;
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("review");
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (q: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(q)) n.delete(q);
      else n.add(q);
      return n;
    });

  const ring = 2 * Math.PI * 54;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-body-sm">
        <Link href={routes.student.dashboard} className="font-medium text-primary hover:underline">My Learning</Link>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="text-ink-muted">Strategic Management (IM-SMD-101)</span>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="text-ink-muted">{QUIZ}</span>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
        <span className="font-semibold text-ink">Quiz Results</span>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-navy-900 p-6 text-on-dark md:p-8">
        <div className="relative grid gap-6 lg:grid-cols-[auto_1fr_auto_auto] lg:items-center">
          <span className={cn("flex size-20 shrink-0 items-center justify-center rounded-2xl", passed ? "bg-accent/20 text-accent" : "bg-rose/20 text-rose")}>
            {passed ? <Trophy className="size-11" aria-hidden="true" /> : <CircleX className="size-11" aria-hidden="true" />}
          </span>

          <div className="min-w-0">
            <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-bold", passed ? "bg-success text-on-dark" : "bg-rose text-on-dark")}>
              <CircleCheck className="size-3.5" aria-hidden="true" />
              Quiz Completed
            </span>
            <h1 className="mt-2 text-display-lg font-extrabold text-on-dark">
              {passed ? "Congratulations!" : "Unfortunately, you did not pass."}
            </h1>
            <p className="mt-1 max-w-xl text-body text-white/80">
              {passed
                ? "You have passed the quiz."
                : "Your score is below the passing score of 60%. Don't worry — you can review the results, study the recommended topics, and try again."}
            </p>
          </div>

          {/* Score ring */}
          <div className="relative size-36 shrink-0 justify-self-center">
            <svg viewBox="0 0 120 120" className="size-36 -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="54" fill="none" strokeWidth="10" className="stroke-white/15" />
              <circle cx="60" cy="60" r="54" fill="none" strokeWidth="10" strokeLinecap="round" className={passed ? "stroke-success" : "stroke-rose"} strokeDasharray={ring} strokeDashoffset={ring * (1 - d.percent / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-h1 font-extrabold text-on-dark">{d.percent}%</span>
              <span className="text-caption text-white/70">Score</span>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2.5 border-white/15 ps-0 lg:border-s lg:ps-6">
            <HeroStat icon={Target} label="Score:" value={d.score} />
            <HeroStat icon={CircleCheck} label="Passing Score:" value="60%" />
            <HeroStat icon={Clock} label="Time Taken:" value="18:24 / 30:00" />
            <HeroStat icon={CalendarDays} label="Completed:" value="Oct 31, 2026 – 02:16 PM" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main */}
        <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <BarChart3 className="size-5 text-primary" aria-hidden="true" />
            Result Summary
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard icon={CircleCheck} tone="success" value={d.correct} label="Correct Answers" />
            <SummaryCard icon={CircleX} tone="danger" value={d.incorrect} label="Incorrect Answers" />
            <SummaryCard icon={Minus} tone="violet" value={d.notAnswered} label="Not Answered" />
            <SummaryCard icon={ListChecks} tone="primary" value={d.total} label="Total Questions" />
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-border">
            {TABS.map((t) => (
              <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex items-center gap-2 border-b-2 px-3 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
                <t.icon className="size-4" aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>

          {tab === "review" ? (
            <ul className="mt-4 space-y-3">
              {d.reviews.map((r) => {
                const S = STATUS_ICON[r.status];
                const isOpen = open.has(r.q);
                const positive = r.got > 0;
                return (
                  <li key={r.q} className="rounded-xl border border-border">
                    <div className="flex items-start gap-3 p-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-caption font-bold text-ink-muted">Q{r.q}</span>
                      <S.icon className={cn("mt-1 size-5 shrink-0", S.className)} aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-ink">{r.question}</p>
                        <p className="mt-0.5 text-body-sm text-ink-muted">
                          {r.status === "notanswered" ? "Not answered" : <>Your answer: {r.yourAnswer}</>}
                        </p>
                        {r.status === "incorrect" && r.correctAnswer && (
                          <p className="mt-0.5 text-body-sm text-success">Correct answer: {r.correctAnswer}</p>
                        )}
                      </div>
                      <span className={cn("shrink-0 rounded-md px-2.5 py-1 text-caption font-bold", positive ? "bg-success-50 text-success" : "bg-rose-50 text-rose")}>
                        {positive ? `+${r.got}` : r.got} / {r.total}
                      </span>
                      <button type="button" aria-label="Toggle details" onClick={() => toggle(r.q)} className="shrink-0 text-ink-subtle hover:text-ink">
                        <ChevronDown className={cn("size-5 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                      </button>
                    </div>
                    {isOpen && (
                      <div className="border-t border-border bg-surface-alt/50 px-4 py-3 text-body-sm text-ink-muted">
                        {r.status === "correct"
                          ? "Well done — your answer matches the model answer for this question."
                          : r.status === "incorrect"
                            ? "Review this topic: your selection didn't match the correct answer shown above."
                            : "This question was left blank. Unanswered questions score zero."}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                {(() => { const Icon = TABS.find((t) => t.key === tab)!.icon; return <Icon className="size-6" aria-hidden="true" />; })()}
              </span>
              <p className="text-h4 text-ink">{TABS.find((t) => t.key === tab)!.label}</p>
              <p className="max-w-sm text-body-sm text-ink-subtle">This view is part of the results preview and will be wired to the backend next.</p>
            </div>
          )}
        </div>

        {/* Rail */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
              <Target className="size-5 text-primary" aria-hidden="true" />
              Performance by Topic
            </h3>
            <ul className="mt-4 space-y-4">
              {d.topics.map((t) => (
                <li key={t.name}>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-ink">{t.name}</span>
                    <span className="font-bold text-ink">{t.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-surface-alt">
                    <div className={cn("h-full rounded-pill", topicColor(t.pct))} style={{ width: `${t.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {passed ? (
            <section className="rounded-xl border border-border bg-primary-50/50 p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                <Megaphone className="size-5 text-primary" aria-hidden="true" />
                Instructor Feedback
              </h3>
              <p className="mt-3 text-body-sm text-ink-muted">
                Great work! You demonstrated a strong understanding of strategic frameworks. Review the
                competitive positioning section to improve further.
              </p>
            </section>
          ) : (
            <section className="rounded-xl border border-danger/20 bg-rose-50/50 p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                <Lightbulb className="size-5 text-danger" aria-hidden="true" />
                Next Steps to Pass
              </h3>
              <ul className="mt-3 space-y-2.5 text-body-sm text-ink-muted">
                {[
                  "Review the incorrect questions and their explanations.",
                  "Re-study the top topics where your score was low.",
                  "Focus on Strategic Frameworks & Models and Analysis.",
                  "Retake the quiz after further revision.",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button className="col-span-2 sm:col-span-1">
              <RotateCcw className="size-4" aria-hidden="true" />
              Retake Quiz
            </Button>
            {passed ? (
              <>
                <Button variant="outline-primary">
                  <BarChart3 className="size-4" aria-hidden="true" />
                  View Attempts
                </Button>
                <Button asChild variant="outline-primary">
                  <Link href={routes.student.courses}><BookOpen className="size-4" aria-hidden="true" />Back to Course</Link>
                </Button>
                <Button variant="outline-primary">
                  Next Activity
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary">
                  <BookOpen className="size-4" aria-hidden="true" />
                  Review Course Material
                </Button>
                <Button variant="outline-primary">
                  <Download className="size-4" aria-hidden="true" />
                  Download Results
                </Button>
                <Button asChild variant="outline-primary">
                  <Link href={routes.student.courses}><ArrowRight className="size-4 rotate-180" aria-hidden="true" />Back to Course</Link>
                </Button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function HeroStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <p className="flex items-center gap-2 whitespace-nowrap text-body-sm">
      <Icon className="size-4 shrink-0 text-white/70" aria-hidden="true" />
      <span className="text-white/70">{label}</span>
      <span className="font-bold text-on-dark">{value}</span>
    </p>
  );
}

function SummaryCard({ icon: Icon, tone, value, label }: { icon: LucideIcon; tone: "success" | "danger" | "violet" | "primary"; value: number; label: string }) {
  const tones = {
    success: "bg-success-50 text-success",
    danger: "bg-rose-50 text-danger",
    violet: "bg-violet-50 text-violet",
    primary: "bg-primary-50 text-primary",
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-4">
      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-stat font-extrabold leading-none text-ink">{value}</p>
        <p className="mt-1 text-caption text-ink-muted">{label}</p>
      </div>
    </div>
  );
}
