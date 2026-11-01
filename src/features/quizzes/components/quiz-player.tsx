"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Check,
  ChevronLeft,
  CircleDot,
  Clock,
  GraduationCap,
  Grid2x2,
  Info,
  LayoutGrid,
  Trophy,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Option = { key: string; label: string };
type Question = { text: string; options: Option[]; correct: string; marks: number };

const QUESTIONS: Question[] = [
  {
    text: "Which of the following best defines a business strategy framework?",
    options: [
      { key: "A", label: "A set of financial policies to control operating costs." },
      { key: "B", label: "A structured model that guides decision-making, competitive positioning and organizational performance." },
      { key: "C", label: "A software system for managing company operations." },
      { key: "D", label: "A regulatory checklist used only for audits." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "The Plan-Do-Check-Act (PDCA) cycle is primarily used for:",
    options: [
      { key: "A", label: "Continuous improvement of processes." },
      { key: "B", label: "Calculating quarterly revenue." },
      { key: "C", label: "Hiring new employees." },
      { key: "D", label: "Designing marketing campaigns only." },
    ],
    correct: "A",
    marks: 1,
  },
  {
    text: "Porter's Five Forces is mainly used to analyze:",
    options: [
      { key: "A", label: "A company's internal culture." },
      { key: "B", label: "Industry attractiveness and competitive intensity." },
      { key: "C", label: "Employee satisfaction." },
      { key: "D", label: "Software architecture." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "A SWOT analysis evaluates which of the following?",
    options: [
      { key: "A", label: "Only external opportunities." },
      { key: "B", label: "Only internal strengths." },
      { key: "C", label: "Strengths, weaknesses, opportunities and threats." },
      { key: "D", label: "Financial ratios exclusively." },
    ],
    correct: "C",
    marks: 1,
  },
  {
    text: "Which of the following best describes a strategy framework?",
    options: [
      { key: "A", label: "A set of financial policies to control costs." },
      { key: "B", label: "A structured model that guides strategy, execution and performance." },
      { key: "C", label: "A software system for managing operations." },
      { key: "D", label: "A regulatory checklist used only for accreditation." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "The BCG matrix classifies products based on:",
    options: [
      { key: "A", label: "Price and location." },
      { key: "B", label: "Market share and market growth." },
      { key: "C", label: "Color and size." },
      { key: "D", label: "Employee count." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "PESTLE analysis primarily examines which environment?",
    options: [
      { key: "A", label: "The internal environment." },
      { key: "B", label: "The macro (external) environment." },
      { key: "C", label: "The IT environment only." },
      { key: "D", label: "The physical office environment." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "A sustainable competitive advantage is best explained by resources that are:",
    options: [
      { key: "A", label: "Cheap and easy to copy." },
      { key: "B", label: "Valuable, rare, inimitable and organized (VRIO)." },
      { key: "C", label: "Supported only by a large budget." },
      { key: "D", label: "Available to all competitors." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "Which generic strategy focuses on being the lowest-cost producer?",
    options: [
      { key: "A", label: "Differentiation." },
      { key: "B", label: "Cost leadership." },
      { key: "C", label: "Focus." },
      { key: "D", label: "Diversification." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "The balanced scorecard measures performance across how many perspectives?",
    options: [
      { key: "A", label: "Two." },
      { key: "B", label: "Three." },
      { key: "C", label: "Four." },
      { key: "D", label: "Five." },
    ],
    correct: "C",
    marks: 1,
  },
  {
    text: "Corporate-level strategy is mainly concerned with:",
    options: [
      { key: "A", label: "Day-to-day task scheduling." },
      { key: "B", label: "Which businesses the organization should compete in." },
      { key: "C", label: "Designing a single product feature." },
      { key: "D", label: "Office seating plans." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "Which of the following is an example of a substitute product?",
    options: [
      { key: "A", label: "A competitor's identical product." },
      { key: "B", label: "Video calls replacing business travel." },
      { key: "C", label: "A supplier's raw material." },
      { key: "D", label: "A new market entrant's product." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "Rivalry among existing competitors tends to be higher when:",
    options: [
      { key: "A", label: "Industry growth is high." },
      { key: "B", label: "There are only a few competitors." },
      { key: "C", label: "Exit barriers are high." },
      { key: "D", label: "Products are highly differentiated." },
    ],
    correct: "C",
    marks: 1,
  },
  {
    text: "The primary purpose of strategic management is to:",
    options: [
      { key: "A", label: "Reduce headcount." },
      { key: "B", label: "Achieve sustained competitive advantage." },
      { key: "C", label: "Increase short-term costs." },
      { key: "D", label: "Avoid long-term planning." },
    ],
    correct: "B",
    marks: 1,
  },
  {
    text: "Which tool assesses a firm's internal resources and capabilities?",
    options: [
      { key: "A", label: "PESTLE analysis." },
      { key: "B", label: "Porter's Five Forces." },
      { key: "C", label: "VRIO framework." },
      { key: "D", label: "BCG matrix." },
    ],
    correct: "C",
    marks: 1,
  },
];

const START_SECONDS = 24 * 60 + 36;

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizPlayer() {
  const total = QUESTIONS.length;
  const [answers, setAnswers] = useState<Record<number, string>>({ 0: "B", 1: "A", 2: "B", 3: "C", 4: "B" });
  const [current, setCurrent] = useState(4);
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const answeredCount = Object.keys(answers).length;
  const percent = Math.round((answeredCount / total) * 100);
  const q = QUESTIONS[current]!;
  const low = seconds <= 60;

  const navStates = useMemo(
    () =>
      QUESTIONS.map((_, i) => (i === current ? "current" : answers[i] !== undefined ? "answered" : "todo")),
    [answers, current],
  );

  function choose(key: string) {
    setAnswers((a) => ({ ...a, [current]: key }));
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-navy-900 p-5 text-on-dark md:p-6">
        <GraduationCap className="pointer-events-none absolute end-56 top-1/2 hidden size-40 -translate-y-1/2 text-white/5 lg:block" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="size-8" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-body-sm text-white/70">Strategic Management (IM-SMD-101)</p>
            <h1 className="text-h2 text-on-dark">Module 2 Quiz: Strategic Frameworks</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-body-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><LayoutGrid className="size-4" aria-hidden="true" />{total} Questions</span>
              <span className="inline-flex items-center gap-1.5"><Trophy className="size-4" aria-hidden="true" />{total} Marks</span>
              <span className="inline-flex items-center gap-1.5"><Check className="size-4" aria-hidden="true" />Passing Score: 60%</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/20">
            <Clock className="size-7 text-white/80" aria-hidden="true" />
            <div>
              <p className="text-caption text-white/70">Time Remaining</p>
              <p className={cn("text-h3 font-extrabold tabular-nums", low ? "text-rose" : "text-on-dark")}>{fmt(seconds)}</p>
            </div>
            <button type="button" aria-label="Toggle panel" className="ms-1 inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-on-dark hover:bg-white/20">
              <Grid2x2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main */}
        <div className="space-y-5">
          {/* Progress */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between text-body-sm">
              <span className="font-bold text-ink">Question {current + 1} of {total}</span>
              <span className="font-semibold text-ink-muted">{percent}% Complete</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-pill bg-surface-alt">
              <div className="h-full rounded-pill bg-primary transition-[width]" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Question */}
          <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary-50 px-2.5 py-1 text-body-sm font-bold text-primary">Q{current + 1}</span>
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary">
                  <CircleDot className="size-3.5" aria-hidden="true" />
                  Multiple Choice
                </span>
              </div>
              <span className="rounded-md bg-surface-alt px-2.5 py-1 text-caption font-semibold text-ink-muted">{q.marks} Mark</span>
            </div>

            <h2 className="mt-4 text-h3 text-ink">{q.text}</h2>

            <fieldset className="mt-5 space-y-3">
              <legend className="sr-only">Answer options</legend>
              {q.options.map((o) => {
                const checked = answers[current] === o.key;
                return (
                  <label key={o.key} className={cn("flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors", checked ? "border-primary bg-primary-50" : "border-border-input hover:border-primary/40 hover:bg-surface-alt")}>
                    <input type="radio" name={`q-${current}`} value={o.key} checked={checked} onChange={() => choose(o.key)} className="sr-only" />
                    <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-2", checked ? "border-primary" : "border-border-input")}>
                      {checked && <span className="size-2.5 rounded-full bg-primary" />}
                    </span>
                    <span className="font-bold text-ink">{o.key}.</span>
                    <span className="flex-1 text-body text-ink">{o.label}</span>
                  </label>
                );
              })}
            </fieldset>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
                <ChevronLeft className="size-4" aria-hidden="true" />
                Previous
              </Button>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                  <Link href={routes.student.courses}>
                    <Bookmark className="size-4" aria-hidden="true" />
                    Save &amp; Exit
                  </Link>
                </Button>
                {current === total - 1 ? (
                  <Button>Submit Quiz</Button>
                ) : (
                  <Button onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}>
                    Next Question
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rail */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
              <BarChart3 className="size-5 text-primary" aria-hidden="true" />
              Quiz Progress
            </h3>
            <div className="mt-4 flex items-center justify-between text-body-sm">
              <span className="text-ink-muted">{answeredCount} of {total} answered</span>
              <span className="font-bold text-primary">{percent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-pill bg-surface-alt">
              <div className="h-full rounded-pill bg-primary" style={{ width: `${percent}%` }} />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
              <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
              Questions
            </h3>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {QUESTIONS.map((_, i) => {
                const state = navStates[i];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-current={state === "current" ? "step" : undefined}
                    aria-label={`Question ${i + 1}`}
                    className={cn(
                      "flex h-10 items-center justify-center gap-1 rounded-lg text-body-sm font-bold transition-colors",
                      state === "current"
                        ? "bg-primary text-on-dark"
                        : state === "answered"
                          ? "bg-success-50 text-success"
                          : "bg-surface-alt text-ink-muted hover:bg-primary-50",
                    )}
                  >
                    {i + 1}
                    {state === "answered" && <Check className="size-3.5" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
              <Info className="size-5 text-primary" aria-hidden="true" />
              Legend
            </h3>
            <ul className="mt-4 space-y-3 text-body-sm">
              <li className="flex items-center gap-3">
                <span className="size-6 rounded-md border-2 border-primary" aria-hidden="true" />
                <span className="text-ink-muted">Current Question</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-success-50 text-success" aria-hidden="true"><Check className="size-3.5" /></span>
                <span className="text-ink-muted">Answered</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="size-6 rounded-md bg-surface-alt" aria-hidden="true" />
                <span className="text-ink-muted">Not Answered</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
