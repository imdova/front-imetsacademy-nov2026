"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock,
  Copy,
  Eye,
  FileText,
  FolderClosed,
  GripVertical,
  Info,
  Layers,
  Link2,
  ListChecks,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ToggleRight,
  Trash2,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type QType = "mc" | "matching" | "tf" | "short";
const QTYPE: Record<QType, { label: string; icon: LucideIcon; className: string }> = {
  mc: { label: "Multiple Choice", icon: CircleDot, className: "bg-primary-50 text-primary" },
  matching: { label: "Matching", icon: Link2, className: "bg-violet-50 text-violet" },
  tf: { label: "True / False", icon: ToggleRight, className: "bg-teal-50 text-teal" },
  short: { label: "Short Answer", icon: FileText, className: "bg-orange-50 text-orange" },
};

type Question = { text: string; type: QType; marks: number };
const QUESTIONS: Question[] = [
  { text: "Which of the following best defines a business strategy framework?", type: "mc", marks: 1 },
  { text: "The Plan-Do-Check-Act (PDCA) cycle is primarily used for:", type: "mc", marks: 1 },
  { text: "Match the following strategy models with their correct focus.", type: "matching", marks: 2 },
  { text: "A strategy framework provides a structured approach to decision-making.", type: "tf", marks: 1 },
  { text: "List two key benefits of implementing a strategy framework.", type: "short", marks: 3 },
  { text: "Porter's Five Forces is mainly used to analyze:", type: "mc", marks: 1 },
  { text: "The BCG matrix classifies products by market share and growth.", type: "tf", marks: 1 },
  { text: "Match each PESTLE factor with an example.", type: "matching", marks: 2 },
  { text: "A SWOT analysis evaluates internal and external factors.", type: "tf", marks: 1 },
  { text: "Which framework focuses on value chain activities?", type: "mc", marks: 1 },
  { text: "Explain the difference between corporate and business-level strategy.", type: "short", marks: 3 },
  { text: "The balanced scorecard measures performance across four perspectives.", type: "tf", marks: 1 },
  { text: "Which of these is NOT a generic competitive strategy?", type: "mc", marks: 1 },
  { text: "Match each strategy horizon with its time frame.", type: "matching", marks: 2 },
  { text: "Define 'sustainable competitive advantage' in one sentence.", type: "short", marks: 2 },
];

const STEPS = ["Quiz Details", "Add Questions", "Settings & Rules", "Review & Publish"];
const PAGE_SIZE = 5;

export function QuizBuilder({ cancelHref }: { cancelHref: string }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("Module 2 Quiz: Strategic Frameworks");
  const [description, setDescription] = useState(
    "Assess your understanding of strategic frameworks, models, and their application in business organizations.",
  );
  const [quizType, setQuizType] = useState<"graded" | "practice" | "survey">("graded");
  const [visibility, setVisibility] = useState<"draft" | "publish" | "schedule">("draft");
  const [totalMarks, setTotalMarks] = useState("15");
  const [passing, setPassing] = useState("60");
  const [timeLimit, setTimeLimit] = useState("30");
  const [attempts, setAttempts] = useState("2");
  const [showAnswers, setShowAnswers] = useState(true);
  const [shuffle, setShuffle] = useState(true);
  const [qPage, setQPage] = useState(1);

  const qTotalPages = Math.ceil(QUESTIONS.length / PAGE_SIZE);
  const qRows = QUESTIONS.slice((qPage - 1) * PAGE_SIZE, qPage * PAGE_SIZE);
  const marksPerQuestion = (Number(totalMarks || 0) / QUESTIONS.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <ol className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {STEPS.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start transition-colors",
                  active ? "border-primary bg-primary text-on-dark" : done ? "border-primary/30 bg-primary-50 text-primary" : "border-border bg-surface text-ink-muted hover:border-primary/40",
                )}
              >
                <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-caption font-bold", active ? "bg-on-dark text-primary" : done ? "bg-primary text-on-dark" : "bg-surface-alt text-ink-muted")}>
                  {done ? <Check className="size-4" aria-hidden="true" /> : i + 1}
                </span>
                <span className="text-body-sm font-semibold">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {step === 0 ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Basic info */}
            <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
                <FileText className="size-5 text-primary" aria-hidden="true" />
                Basic Information
              </h2>
              <div className="mt-5 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="quiz-title" className="block text-body-sm font-semibold text-ink">Quiz Title <span className="text-danger">*</span></label>
                  <div className="relative">
                    <input id="quiz-title" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 120))} className={cn(inputCls, "pe-16")} />
                    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-caption text-ink-subtle">{title.length} / 120</span>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="quiz-course" className="block text-body-sm font-semibold text-ink">Course <span className="text-danger">*</span></label>
                    <SelectControl id="quiz-course" icon={Layers} defaultValue="Strategic Management (IM-SMD-001)" options={["Strategic Management (IM-SMD-001)", "Business Analytics (IM-BA-002)", "Digital Transformation (IM-DT-003)"]} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="quiz-module" className="block text-body-sm font-semibold text-ink">Module <span className="text-danger">*</span></label>
                    <SelectControl id="quiz-module" icon={FolderClosed} defaultValue="Module 2: Strategic Analysis" options={["Module 1: Strategy Fundamentals", "Module 2: Strategic Analysis", "Module 3: Strategy Formulation"]} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="quiz-desc" className="block text-body-sm font-semibold text-ink">Description (Optional)</label>
                  <div className="relative">
                    <textarea id="quiz-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value.slice(0, 500))} className={cn(inputCls, "h-auto resize-none py-3 pe-4")} />
                    <span className="pointer-events-none absolute bottom-2 end-3 text-caption text-ink-subtle">{description.length} / 500</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Questions */}
            <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
                <ListChecks className="size-5 text-primary" aria-hidden="true" />
                Questions
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto] sm:items-center">
                <StatTile icon={<Layers className="size-5" />} tone="primary" value={QUESTIONS.length} label="Questions" />
                <StatTile icon={<Trophy className="size-5" />} tone="warm" value={totalMarks} label="Total Marks" />
                <StatTile icon={<BarChart3 className="size-5" />} tone="violet" value={marksPerQuestion} label="Marks per Question" />
                <Button className="h-full min-h-14 sm:w-auto"><Plus className="size-4" aria-hidden="true" />Add Questions</Button>
              </div>

              <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[640px] border-collapse text-body-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-alt text-caption text-ink-subtle">
                      <th className="w-8 ps-3 py-2.5" />
                      <th className="w-10 px-2 py-2.5 text-start font-semibold">#</th>
                      <th className="px-3 py-2.5 text-start font-semibold">Question</th>
                      <th className="px-3 py-2.5 text-start font-semibold">Type</th>
                      <th className="px-3 py-2.5 text-start font-semibold">Marks</th>
                      <th className="px-3 py-2.5 text-start font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qRows.map((q, i) => {
                      const n = (qPage - 1) * PAGE_SIZE + i + 1;
                      const t = QTYPE[q.type];
                      return (
                        <tr key={n} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                          <td className="ps-3 py-3 text-ink-subtle"><GripVertical className="size-4" aria-hidden="true" /></td>
                          <td className="px-2 py-3 font-semibold text-ink-muted">{n}</td>
                          <td className="px-3 py-3 text-ink"><span className="line-clamp-1">{q.text}</span></td>
                          <td className="px-3 py-3">
                            <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold", t.className)}>
                              <t.icon className="size-3.5" aria-hidden="true" />
                              {t.label}
                            </span>
                          </td>
                          <td className="px-3 py-3 font-semibold text-ink">{q.marks}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-0.5">
                              <button type="button" aria-label="Edit question" className={iconAction}><Pencil className="size-4" aria-hidden="true" /></button>
                              <button type="button" aria-label="Duplicate question" className={iconAction}><Copy className="size-4" aria-hidden="true" /></button>
                              <button type="button" aria-label="Delete question" className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-danger-50 hover:text-danger"><Trash2 className="size-4" aria-hidden="true" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-caption text-ink-subtle">Showing {(qPage - 1) * PAGE_SIZE + 1}–{Math.min(qPage * PAGE_SIZE, QUESTIONS.length)} of {QUESTIONS.length} questions</p>
                <div className="flex items-center gap-1">
                  <button type="button" aria-label="Previous" disabled={qPage === 1} onClick={() => setQPage((p) => Math.max(1, p - 1))} className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary"><ChevronLeft className="size-4" aria-hidden="true" /></button>
                  {Array.from({ length: qTotalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} type="button" onClick={() => setQPage(p)} aria-current={p === qPage ? "page" : undefined} className={cn("inline-flex size-9 items-center justify-center rounded-md text-body-sm font-semibold", p === qPage ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary hover:text-primary")}>{p}</button>
                  ))}
                  <button type="button" aria-label="Next" disabled={qPage === qTotalPages} onClick={() => setQPage((p) => Math.min(qTotalPages, p + 1))} className="inline-flex size-9 items-center justify-center rounded-md border border-border-input text-ink-muted disabled:opacity-40 hover:border-primary hover:text-primary"><ChevronRight className="size-4" aria-hidden="true" /></button>
                </div>
              </div>
            </section>
          </div>

          {/* Rail */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                <Info className="size-5 text-primary" aria-hidden="true" />
                Quiz Settings
              </h3>
              <p className="mt-3 text-body-sm font-semibold text-ink">Quiz Type</p>
              <div className="mt-2 space-y-2">
                <RadioCard checked={quizType === "graded"} onChange={() => setQuizType("graded")} title="Graded Quiz" hint="Scores are calculated and recorded." />
                <RadioCard checked={quizType === "practice"} onChange={() => setQuizType("practice")} title="Practice Quiz" hint="For self-assessment (no grades)." />
                <RadioCard checked={quizType === "survey"} onChange={() => setQuizType("survey")} title="Survey / Ungraded" hint="Collect responses without grading." />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                <Trophy className="size-5 text-primary" aria-hidden="true" />
                Grading &amp; Rules
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <SmallField label="Total Marks" required>
                  <input value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} className={smallInput} />
                </SmallField>
                <SmallField label="Passing Score" required>
                  <div className="relative flex items-center">
                    <input value={passing} onChange={(e) => setPassing(e.target.value)} className={cn(smallInput, "pe-8")} />
                    <span className="pointer-events-none absolute end-3 text-caption text-ink-subtle">%</span>
                  </div>
                </SmallField>
                <SmallField label="Time Limit">
                  <div className="relative flex items-center">
                    <Clock className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
                    <input value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} className={cn(smallInput, "ps-9")} />
                  </div>
                </SmallField>
                <SmallField label="Attempts Allowed">
                  <div className="relative flex items-center">
                    <RefreshCw className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
                    <select value={attempts} onChange={(e) => setAttempts(e.target.value)} className={cn(smallInput, "ps-9 pe-8 cursor-pointer appearance-none")}>
                      {["1", "2", "3", "Unlimited"].map((o) => (<option key={o} value={o}>{o}</option>))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-2.5 size-4 text-ink-subtle" aria-hidden="true" />
                  </div>
                </SmallField>
              </div>
              <div className="mt-4 space-y-3">
                <label className="flex items-center justify-between gap-3 text-body-sm font-medium text-ink">
                  Show Correct Answers After Submission
                  <Switch checked={showAnswers} onCheckedChange={setShowAnswers} aria-label="Show correct answers after submission" />
                </label>
                <label className="flex items-center justify-between gap-3 text-body-sm font-medium text-ink">
                  Shuffle Questions
                  <Switch checked={shuffle} onCheckedChange={setShuffle} aria-label="Shuffle questions" />
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
                <Eye className="size-5 text-primary" aria-hidden="true" />
                Visibility
              </h3>
              <div className="mt-3 space-y-2">
                <RadioCard checked={visibility === "draft"} onChange={() => setVisibility("draft")} title="Draft" hint="Save and continue later." />
                <RadioCard checked={visibility === "publish"} onChange={() => setVisibility("publish")} title="Publish" hint="Make the quiz available to students." />
                <RadioCard checked={visibility === "schedule"} onChange={() => setVisibility("schedule")} title="Schedule" hint="Publish automatically at a specific date and time." />
              </div>
            </section>
          </aside>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><ListChecks className="size-6" aria-hidden="true" /></span>
          <p className="text-h4 text-ink">{STEPS[step]}</p>
          <p className="max-w-sm text-body-sm text-ink-subtle">This step is part of the builder preview and will be wired to the backend next.</p>
          <Button variant="outline" className="mt-2" onClick={() => setStep(0)}>Back to Quiz Details</Button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft className="size-5" aria-hidden="true" />
            Back
          </Button>
        ) : (
          <Button asChild variant="outline" size="lg">
            <Link href={cancelHref}>Cancel</Link>
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button size="lg" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
            Save &amp; Continue
            <ChevronRight className="size-5" aria-hidden="true" />
          </Button>
        ) : (
          <Button size="lg">
            <Save className="size-5" aria-hidden="true" />
            Publish Quiz
          </Button>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";
const smallInput =
  "h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body-sm font-semibold text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";
const iconAction = "inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function SelectControl({ id, icon: Icon, defaultValue, options }: { id: string; icon: LucideIcon; defaultValue: string; options: string[] }) {
  return (
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
      <select id={id} defaultValue={defaultValue} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-9 pe-9 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </div>
  );
}

function StatTile({ icon, value, label, tone }: { icon: React.ReactNode; value: React.ReactNode; label: string; tone: "primary" | "warm" | "violet" }) {
  const tones = { primary: "bg-primary-50 text-primary", warm: "bg-orange-50 text-orange", violet: "bg-violet-50 text-violet" };
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", tones[tone])}>{icon}</span>
      <div>
        <p className="text-h4 font-extrabold leading-none text-ink">{value}</p>
        <p className="mt-1 text-caption text-ink-subtle">{label}</p>
      </div>
    </div>
  );
}

function SmallField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-caption font-semibold text-ink">{label}{required && <span className="text-danger"> *</span>}</label>
      {children}
    </div>
  );
}

function RadioCard({ checked, onChange, title, hint }: { checked: boolean; onChange: () => void; title: string; hint: string }) {
  return (
    <button type="button" role="radio" aria-checked={checked} onClick={onChange} className={cn("flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-start transition-colors", checked ? "border-primary bg-primary-50" : "border-border-input hover:border-primary/40")}>
      <span className={cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border", checked ? "border-primary" : "border-border-input")}>
        {checked && <span className="size-2 rounded-full bg-primary" />}
      </span>
      <span className="min-w-0">
        <span className="block text-body-sm font-bold text-ink">{title}</span>
        <span className="block text-caption text-ink-subtle">{hint}</span>
      </span>
    </button>
  );
}
