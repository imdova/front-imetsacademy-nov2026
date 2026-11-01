"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  RotateCcw,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Quiz } from "@/features/player/data";

function formatTime(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizRunner({ quiz, slug }: { quiz: Quiz; slug: string }) {
  const total = quiz.questions.length;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(quiz.timeLimitMin * 60);

  const submit = useCallback(() => setSubmitted(true), []);

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        const next = s - 1;
        if (next <= 0) setSubmitted(true);
        return Math.max(0, next);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const correctCount = useMemo(
    () => quiz.questions.filter((q) => answers[q.id] === q.correct).length,
    [answers, quiz.questions],
  );
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= quiz.passingScore;
  const answeredCount = Object.keys(answers).length;

  function reset() {
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setSecondsLeft(quiz.timeLimitMin * 60);
  }

  /* ---------- Results ---------- */
  if (submitted) {
    const circumference = 2 * Math.PI * 52;
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
          <div className="relative mx-auto size-36">
            <svg viewBox="0 0 120 120" className="size-36 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" strokeWidth="12" className="stroke-surface-alt" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                className={passed ? "stroke-success" : "stroke-danger"}
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - score / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-display-lg font-extrabold text-ink">{score}%</span>
              <span className="text-caption text-ink-subtle">Score</span>
            </div>
          </div>

          <h1 className={cn("mt-6 text-h2", passed ? "text-success" : "text-danger")}>
            {passed ? "Congratulations, you passed!" : "You didn't pass this time"}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-body text-ink-muted">
            You answered {correctCount} out of {total} questions correctly. The passing score for this
            quiz is {quiz.passingScore}%.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-success-50 p-4">
              <p className="text-h3 font-extrabold text-success">{correctCount}</p>
              <p className="text-caption text-ink-muted">Correct</p>
            </div>
            <div className="rounded-lg bg-danger-50 p-4">
              <p className="text-h3 font-extrabold text-danger">{total - correctCount}</p>
              <p className="text-caption text-ink-muted">Incorrect</p>
            </div>
            <div className="rounded-lg bg-surface-alt p-4">
              <p className="text-h3 font-extrabold text-ink">{quiz.passingScore}%</p>
              <p className="text-caption text-ink-muted">Passing</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Retake Quiz
            </Button>
            {passed ? (
              <Button asChild>
                <Link href={routes.player.lesson(slug)}>Continue learning</Link>
              </Button>
            ) : (
              <Button asChild variant="primary">
                <Link href={routes.player.lesson(slug)}>Review the lesson</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Review */}
        <div className="space-y-4">
          <h2 className="text-h4 text-ink">Review your answers</h2>
          {quiz.questions.map((q, i) => {
            const chosen = answers[q.id];
            const isCorrect = chosen === q.correct;
            return (
              <div key={q.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                  ) : (
                    <CircleX className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
                  )}
                  <div className="flex-1 space-y-3">
                    <p className="text-body font-semibold text-ink">
                      {i + 1}. {q.text}
                    </p>
                    <ul className="space-y-2">
                      {q.options.map((o) => {
                        const isAnswer = o.key === q.correct;
                        const isChosen = o.key === chosen;
                        return (
                          <li
                            key={o.key}
                            className={cn(
                              "flex items-center gap-2 rounded-lg border px-3 py-2 text-body-sm",
                              isAnswer
                                ? "border-success bg-success-50 text-ink"
                                : isChosen
                                  ? "border-danger bg-danger-50 text-ink"
                                  : "border-border text-ink-muted",
                            )}
                          >
                            <span className="font-bold">{o.key}.</span>
                            <span className="flex-1">{o.label}</span>
                            {isAnswer && <span className="text-caption font-bold text-success">Correct</span>}
                            {isChosen && !isAnswer && (
                              <span className="text-caption font-bold text-danger">Your answer</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Taking ---------- */
  const q = quiz.questions[current];
  if (!q) return null;
  const low = secondsLeft <= 60;
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-primary">Quiz</p>
          <h1 className="text-h4 text-ink">{quiz.module}</h1>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-body-sm font-bold tabular-nums",
            low ? "bg-danger-50 text-danger" : "bg-surface-alt text-ink",
          )}
        >
          <Clock className="size-4" aria-hidden="true" />
          {formatTime(secondsLeft)}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-caption text-ink-subtle">
          <span>
            Question {current + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-2 overflow-hidden rounded-pill bg-surface-alt">
          <div
            className="h-full rounded-pill bg-primary transition-[width]"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-h4 text-ink">{q.text}</p>
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Answer options</legend>
          {q.options.map((o) => {
            const checked = answers[q.id] === o.key;
            return (
              <label
                key={o.key}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-body transition-colors",
                  checked
                    ? "border-primary bg-primary-50 text-ink"
                    : "border-border-input text-ink-muted hover:border-primary hover:bg-surface-alt",
                )}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={o.key}
                  checked={checked}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.key }))}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-caption font-bold",
                    checked ? "border-primary bg-primary text-on-dark" : "border-border-input text-ink-muted",
                  )}
                >
                  {o.key}
                </span>
                <span className="flex-1">{o.label}</span>
              </label>
            );
          })}
        </fieldset>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </Button>
        {current === total - 1 ? (
          <Button onClick={submit}>Submit Quiz</Button>
        ) : (
          <Button onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}>
            Next
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="mb-3 text-caption font-semibold text-ink-muted">Question navigator</p>
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((item, i) => {
            const isAnswered = answers[item.id] !== undefined;
            const isCurrent = i === current;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(i)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Go to question ${i + 1}`}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg text-body-sm font-bold transition-colors",
                  isCurrent
                    ? "bg-primary text-on-dark"
                    : isAnswered
                      ? "bg-primary-50 text-primary"
                      : "bg-surface-alt text-ink-muted hover:bg-primary-50",
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
