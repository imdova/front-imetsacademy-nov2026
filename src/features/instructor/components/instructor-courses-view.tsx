"use client";

import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  FolderClosed,
  GraduationCap,
  Layers,
  Mail,
  MoreVertical,
  PlayCircle,
  Presentation,
  Search,
  Star,
  Upload,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CourseTab = "content" | "students" | "quizzes" | "assignments" | "results" | "communication";
const COURSE_TABS: { key: CourseTab; label: string; icon: LucideIcon }[] = [
  { key: "content", label: "Course Content", icon: PlayCircle },
  { key: "students", label: "Students", icon: Users },
  { key: "quizzes", label: "Quizzes", icon: ClipboardCheck },
  { key: "assignments", label: "Assignments", icon: ClipboardList },
  { key: "results", label: "Results & Feedback", icon: BarChart3 },
  { key: "communication", label: "Communication", icon: Mail },
];

type ListTab = "all" | "active" | "archived";
type CourseItem = { id: string; title: string; status: "Active" | "Archived"; students: number; modules: number };
const COURSES: CourseItem[] = [
  { id: "c1", title: "Strategic Management", status: "Active", students: 1248, modules: 8 },
  { id: "c2", title: "Business Operations & Management", status: "Active", students: 842, modules: 6 },
  { id: "c3", title: "Leadership & Team Management", status: "Active", students: 693, modules: 5 },
  { id: "c4", title: "Business Analytics", status: "Archived", students: 310, modules: 7 },
];

type LessonKind = "video" | "pdf" | "ppt" | "quiz" | "assignment";
const LESSON_ICON: Record<LessonKind, LucideIcon> = { video: PlayCircle, pdf: FileText, ppt: Presentation, quiz: ClipboardCheck, assignment: ClipboardList };
type Lesson = { kind: LessonKind; title: string; meta: string; status: "Published" | "Active" };
type Module = { title: string; lessons: number; items?: Lesson[] };

const MODULES: Module[] = [
  {
    title: "Module 1: Introduction to Strategic Management",
    lessons: 4,
    items: [
      { kind: "video", title: "1.1 What is Strategic Management?", meta: "12:30", status: "Published" },
      { kind: "pdf", title: "1.2 Strategy Dimensions & Frameworks (PDF)", meta: "2.4 MB", status: "Published" },
      { kind: "ppt", title: "1.3 Strategy Models (PPT)", meta: "5.8 MB", status: "Published" },
      { kind: "quiz", title: "Module 1 Quiz", meta: "10 Questions", status: "Published" },
      { kind: "assignment", title: "Assignment: Strategy in Your Organization", meta: "Due in 7 days", status: "Active" },
    ],
  },
  { title: "Module 2: Strategic Analysis Methodologies", lessons: 5 },
  { title: "Module 3: Competitive Positioning", lessons: 4 },
  { title: "Module 4: Performance Measurement", lessons: 4 },
  { title: "Module 5: Strategy Execution", lessons: 4 },
  { title: "Module 6: Strategy Tools & Techniques", lessons: 5 },
  { title: "Module 7: Leadership in Strategy", lessons: 3 },
  { title: "Module 8: Capstone Project", lessons: 3 },
];

const ACTIVITY = [
  { icon: Upload, text: "Uploaded: Strategy_Models.pptx", time: "2 hours ago", tint: "text-primary" },
  { icon: ClipboardCheck, text: "Published: Module 1 Quiz", time: "4 hours ago", tint: "text-success" },
  { icon: Mail, text: "Sent feedback to 24 students", time: "Yesterday", tint: "text-violet" },
  { icon: ClipboardList, text: "Created: Assignment – Strategy in Your Org", time: "Yesterday", tint: "text-orange" },
];

export function InstructorCoursesView() {
  const [listTab, setListTab] = useState<ListTab>("all");
  const [selectedId, setSelectedId] = useState("c1");
  const [tab, setTab] = useState<CourseTab>("content");
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const selected = COURSES.find((c) => c.id === selectedId) ?? COURSES[0]!;
  const list = COURSES.filter((c) => (listTab === "all" ? true : listTab === "active" ? c.status === "Active" : c.status === "Archived"));
  const counts = { all: COURSES.length, active: COURSES.filter((c) => c.status === "Active").length, archived: COURSES.filter((c) => c.status === "Archived").length };
  const toggle = (i: number) => setOpen((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-h1 text-ink">Enrolled Courses</h1>
        <p className="mt-1 text-body text-ink-muted">Courses assigned to you by the admin. Manage content, assessments, and student learning.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left list */}
        <div className="space-y-3">
          <div className="flex gap-2">
            {([["all", `All Courses (${counts.all})`], ["active", `Active (${counts.active})`], ["archived", `Archived (${counts.archived})`]] as const).map(([k, label]) => (
              <button key={k} type="button" onClick={() => setListTab(k)} className={cn("rounded-pill px-3 py-1.5 text-caption font-semibold transition-colors", listTab === k ? "bg-primary text-on-dark" : "border border-border-input text-ink-muted hover:border-primary")}>{label}</button>
            ))}
          </div>
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
            <span className="sr-only">Search courses</span>
            <input type="search" placeholder="Search courses…" className="h-11 w-full rounded-lg border border-border-input bg-surface ps-9 pe-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
          </label>
          <ul className="space-y-3">
            {list.map((c) => {
              const active = c.id === selectedId;
              return (
                <li key={c.id}>
                  <button type="button" onClick={() => setSelectedId(c.id)} className={cn("flex w-full items-center gap-3 rounded-xl border bg-surface p-3 text-start transition-colors", active ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40")}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-50 to-primary-100 text-primary"><GraduationCap className="size-6" aria-hidden="true" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-bold text-ink">{c.title}</p>
                        <span className={cn("shrink-0 rounded-pill px-2 py-0.5 text-[11px] font-bold", c.status === "Active" ? "bg-success-50 text-success" : "bg-surface-alt text-ink-muted")}>{c.status}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-3 text-caption text-ink-subtle">
                        <span className="inline-flex items-center gap-1"><Users className="size-3.5" aria-hidden="true" />{c.students.toLocaleString()} Students</span>
                        <span className="inline-flex items-center gap-1"><Layers className="size-3.5" aria-hidden="true" />{c.modules} Modules</span>
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right detail */}
        <div className="space-y-5">
          {/* Course header */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-navy-900 text-on-dark"><GraduationCap className="size-9" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <h2 className="text-h2 text-ink">{selected.title}</h2>
                <p className="text-body-sm text-ink-muted">Course Code: IM-SMD-101 <span className={cn("ms-2 inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-bold", selected.status === "Active" ? "bg-success-50 text-success" : "bg-surface-alt text-ink-muted")}>{selected.status}</span></p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-body-sm text-ink-muted">
                  <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-ink-subtle" aria-hidden="true" /><b className="text-ink">{selected.students.toLocaleString()}</b> Students</span>
                  <span className="inline-flex items-center gap-1.5"><Layers className="size-4 text-ink-subtle" aria-hidden="true" /><b className="text-ink">{selected.modules}</b> Modules</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-orange text-orange" aria-hidden="true" /><b className="text-ink">4.9</b> (328 Reviews)</span>
                </div>
              </div>
              <Button variant="outline-primary" className="shrink-0 self-start"><PlayCircle className="size-4" aria-hidden="true" />View as Student</Button>
            </div>
            <div className="mt-4 flex gap-1 overflow-x-auto border-t border-border pt-2">
              {COURSE_TABS.map((t) => (
                <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
                  <t.icon className="size-4" aria-hidden="true" />{t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "content" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* Curriculum */}
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Layers className="size-5 text-primary" aria-hidden="true" />Course Curriculum</h3>
                    <p className="text-caption text-ink-subtle">8 Modules • 32 Lessons</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><ChevronDown className="size-4" aria-hidden="true" />Expand All</Button>
                    <Button size="sm"><Upload className="size-4" aria-hidden="true" />Upload Material</Button>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {MODULES.map((m, i) => {
                    const isOpen = open.has(i);
                    return (
                      <li key={m.title} className="rounded-lg border border-border">
                        <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-3 text-start">
                          <ChevronDown className={cn("size-4 shrink-0 text-ink-subtle transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                          <FolderClosed className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate font-semibold text-ink">{m.title}</span>
                          <span className="shrink-0 text-caption text-ink-subtle">{m.lessons} Lessons</span>
                        </button>
                        {isOpen && m.items && (
                          <ul className="divide-y divide-border border-t border-border">
                            {m.items.map((l) => {
                              const Icon = LESSON_ICON[l.kind];
                              return (
                                <li key={l.title} className="flex items-center gap-3 px-4 py-2.5 ps-11">
                                  <Icon className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                                  <span className="min-w-0 flex-1 truncate text-body-sm text-ink">{l.title}</span>
                                  <span className="shrink-0 text-caption text-ink-subtle">{l.meta}</span>
                                  <span className={cn("shrink-0 rounded-pill px-2 py-0.5 text-[11px] font-bold", l.status === "Published" ? "bg-success-50 text-success" : "bg-primary-50 text-primary")}>{l.status}</span>
                                  <button type="button" aria-label="More" className="shrink-0 text-ink-subtle hover:text-ink"><MoreVertical className="size-4" aria-hidden="true" /></button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Overview + actions */}
              <aside className="space-y-5">
                <section className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><BarChart3 className="size-5 text-primary" aria-hidden="true" />Course Overview</h3>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-body-sm"><span className="text-ink-muted">Completion Rate</span><span className="font-bold text-ink">72%</span></div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-surface-alt"><div className="h-full rounded-pill bg-primary" style={{ width: "72%" }} /></div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <MiniStat icon={Users} value="1,248" label="Students" />
                    <MiniStat icon={ClipboardCheck} value="86%" label="Avg. Quiz Score" />
                    <MiniStat icon={GraduationCap} value="94%" label="Assignment Submission" />
                  </div>
                </section>

                <section className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Zap className="size-5 text-primary" aria-hidden="true" />Quick Actions</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <QuickAction icon={Upload} title="Upload Material" sub="(PDF, PPT, Video)" />
                    <QuickAction icon={ClipboardCheck} title="Create Quiz" sub="(Graded / Practice)" />
                    <QuickAction icon={ClipboardList} title="Add Assignment" sub="(File / Text / Project)" />
                    <QuickAction icon={Mail} title="Send Feedback" sub="(to Students)" />
                  </div>
                </section>

                <section className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="inline-flex items-center gap-2 text-h4 text-ink"><Clock className="size-5 text-primary" aria-hidden="true" />Recent Activity</h3>
                    <button type="button" className="text-caption font-semibold text-primary hover:underline">View All</button>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {ACTIVITY.map((a) => (
                      <li key={a.text} className="flex items-center gap-3 text-body-sm">
                        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt", a.tint)}><a.icon className="size-4" aria-hidden="true" /></span>
                        <span className="min-w-0 flex-1 truncate text-ink">{a.text}</span>
                        <span className="shrink-0 text-caption text-ink-subtle">{a.time}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">{(() => { const Icon = COURSE_TABS.find((t) => t.key === tab)!.icon; return <Icon className="size-6" aria-hidden="true" />; })()}</span>
              <p className="text-h4 text-ink">{COURSE_TABS.find((t) => t.key === tab)!.label}</p>
              <p className="max-w-sm text-body-sm text-ink-subtle">This tab is part of the instructor preview and will be wired to the backend next.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="rounded-lg bg-surface-alt p-2.5">
      <Icon className="mx-auto size-4 text-primary" aria-hidden="true" />
      <p className="mt-1 font-extrabold text-ink">{value}</p>
      <p className="text-[11px] leading-tight text-ink-subtle">{label}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, title, sub }: { icon: LucideIcon; title: string; sub: string }) {
  return (
    <button type="button" className="flex flex-col items-start gap-1.5 rounded-lg border border-border-input p-3 text-start transition-colors hover:border-primary hover:bg-primary-50">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <span className="text-body-sm font-bold text-ink">{title}</span>
      <span className="text-[11px] text-ink-subtle">{sub}</span>
    </button>
  );
}
