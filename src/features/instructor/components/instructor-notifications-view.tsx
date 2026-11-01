"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  CheckCheck,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Info,
  Mail,
  Megaphone,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Star,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "all", label: "All Notifications", icon: Bell },
  { key: "course", label: "Course Activity", icon: Mail },
  { key: "student", label: "Student Activity", icon: Users },
  { key: "assessments", label: "Assessments", icon: ClipboardCheck },
  { key: "announcements", label: "Announcements", icon: Megaphone },
  { key: "system", label: "System Updates", icon: SlidersHorizontal },
] as const;

type Notif = {
  id: string;
  group: "Today" | "Yesterday";
  icon: LucideIcon;
  tint: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  course?: string;
  module?: string;
  stats?: { submissions: number; passed: number; failed: number; avg: number };
  nextSteps?: string[];
};

const NOTIFS: Notif[] = [
  {
    id: "n1",
    group: "Today",
    icon: ClipboardCheck,
    tint: "bg-success-50 text-success",
    title: "New Quiz Submission",
    body: "12 students submitted the quiz “Strategic Frameworks” in IM-SMD-101.",
    time: "10:24 AM",
    unread: true,
    course: "Strategic Management (IM-SMD-101)",
    module: "Module 2: Strategic Frameworks",
    stats: { submissions: 12, passed: 8, failed: 4, avg: 66 },
    nextSteps: [
      "Review and grade student attempts (if required).",
      "Send feedback to students.",
      "Analyze quiz results and performance.",
    ],
  },
  { id: "n2", group: "Today", icon: UserPlus, tint: "bg-primary-50 text-primary", title: "New Student Enrollment", body: "5 new students enrolled in “Strategic Management (IM-SMD-101)”.", time: "09:17 AM", unread: true },
  { id: "n3", group: "Today", icon: FileText, tint: "bg-orange-50 text-orange", title: "Assignment Submitted", body: "3 students submitted the assignment “Case Study: Market Entry”.", time: "08:42 AM", unread: false },
  { id: "n4", group: "Yesterday", icon: MessageCircle, tint: "bg-violet-50 text-violet", title: "New Student Message", body: "A student sent you a message regarding the upcoming quiz.", time: "Yesterday, 7:28 PM", unread: false },
  { id: "n5", group: "Yesterday", icon: Star, tint: "bg-primary-50 text-primary", title: "Quiz Grading Reminder", body: "You have 8 quiz attempts pending review in “IM-SMD-101”.", time: "Yesterday, 3:15 PM", unread: false },
  { id: "n6", group: "Yesterday", icon: Megaphone, tint: "bg-teal-50 text-teal", title: "Platform Announcement", body: "New features are now available: enhanced quiz reports and bulk feedback.", time: "Yesterday, 11:00 AM", unread: false },
];

export function InstructorNotificationsView() {
  const [tab, setTab] = useState("all");
  const [selectedId, setSelectedId] = useState("n1");
  const selected = NOTIFS.find((n) => n.id === selectedId) ?? NOTIFS[0]!;
  const groups: Notif["group"][] = ["Today", "Yesterday"];

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm">
        <span className="font-medium text-primary">Settings</span>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink-muted">Notifications</span>
      </nav>
      <div className="flex items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary"><Bell className="size-6" aria-hidden="true" /></span>
        <div>
          <h1 className="text-h1 text-ink">Notifications</h1>
          <p className="mt-1 text-body text-ink-muted">Stay informed about your courses, students, assessments, and platform updates.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-body-sm font-semibold transition-colors", tab === t.key ? "border-primary bg-primary text-on-dark" : "border-border bg-surface text-ink-muted hover:border-primary/40")}>
            <t.icon className="size-4" aria-hidden="true" />{t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* List */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center gap-2">
            <label className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
              <span className="sr-only">Search notifications</span>
              <input type="search" placeholder="Search notifications…" className="h-10 w-full rounded-lg border border-border-input bg-surface ps-9 pe-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50" />
            </label>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border-input px-3 py-2 text-body-sm font-semibold text-primary hover:bg-primary-50"><CheckCheck className="size-4" aria-hidden="true" />Mark all as read</button>
            <button type="button" aria-label="Filter" className="inline-flex size-10 items-center justify-center rounded-lg border border-border-input text-ink-muted hover:border-primary hover:text-primary"><SlidersHorizontal className="size-4" aria-hidden="true" /></button>
          </div>

          {groups.map((g) => (
            <div key={g} className="mt-4">
              <p className="px-1 pb-1 text-caption font-bold uppercase tracking-wide text-ink-subtle">{g}</p>
              <ul className="space-y-1">
                {NOTIFS.filter((n) => n.group === g).map((n) => {
                  const active = n.id === selectedId;
                  return (
                    <li key={n.id}>
                      <button type="button" onClick={() => setSelectedId(n.id)} className={cn("flex w-full items-start gap-3 rounded-lg border-s-2 px-3 py-3 text-start transition-colors", active ? "border-s-primary bg-primary-50/50" : "border-s-transparent hover:bg-surface-alt")}>
                        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", n.tint)}><n.icon className="size-5" aria-hidden="true" /></span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-ink">{n.title}</p>
                          <p className="mt-0.5 text-body-sm text-ink-muted">{n.body}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="whitespace-nowrap text-caption text-ink-subtle">{n.time}</span>
                          {n.unread && <span className="size-2 rounded-full bg-primary" aria-label="Unread" />}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
          <div className="flex items-start gap-3">
            <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", selected.tint)}><selected.icon className="size-6" aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <h2 className="text-h3 text-ink">{selected.title}</h2>
              <p className="mt-1 text-body text-ink-muted">{selected.body}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-caption text-ink-subtle"><Info className="size-3.5" aria-hidden="true" />{selected.group === "Today" ? "Today" : ""} {selected.time}</p>
            </div>
            <button type="button" aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-md text-ink-subtle hover:bg-surface-alt hover:text-ink"><X className="size-5" aria-hidden="true" /></button>
          </div>

          {selected.course && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border p-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-50 to-primary-100 text-primary"><BarChart3 className="size-6" aria-hidden="true" /></span>
              <div><p className="font-bold text-ink">{selected.course}</p><p className="text-caption text-ink-subtle">{selected.module}</p></div>
            </div>
          )}

          {selected.stats && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailStat icon={Users} tone="primary" value={selected.stats.submissions} label="Submissions" />
              <DetailStat icon={CircleCheck} tone="success" value={selected.stats.passed} label="Passed" />
              <DetailStat icon={CircleX} tone="danger" value={selected.stats.failed} label="Failed" />
              <DetailStat icon={BarChart3} tone="violet" value={`${selected.stats.avg}%`} label="Avg. Score" />
            </div>
          )}

          <div className="mt-5 rounded-xl bg-surface-alt/60 p-4">
            <p className="inline-flex items-center gap-2 text-body font-bold text-ink"><Info className="size-4 text-primary" aria-hidden="true" />What you can do next</p>
            <ul className="mt-3 space-y-1.5 text-body-sm text-ink-muted">
              {(selected.nextSteps ?? ["Open the notification to review details.", "Take any required follow-up action.", "Mark as read when done."]).map((s) => (
                <li key={s} className="flex items-start gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-subtle" aria-hidden="true" />{s}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button><BarChart3 className="size-4" aria-hidden="true" />View Results</Button>
            <Button variant="outline-primary"><Mail className="size-4" aria-hidden="true" />Send Feedback</Button>
            <Button variant="outline-primary">Go to Quiz<ExternalLink className="size-4" aria-hidden="true" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailStat({ icon: Icon, tone, value, label }: { icon: LucideIcon; tone: "primary" | "success" | "danger" | "violet"; value: React.ReactNode; label: string }) {
  const tones = { primary: "bg-primary-50 text-primary", success: "bg-success-50 text-success", danger: "bg-rose-50 text-danger", violet: "bg-violet-50 text-violet" };
  return (
    <div className="rounded-xl border border-border p-3 text-center">
      <span className={cn("mx-auto flex size-9 items-center justify-center rounded-lg", tones[tone])}><Icon className="size-4" aria-hidden="true" /></span>
      <p className="mt-2 text-h4 font-extrabold text-ink">{value}</p>
      <p className="text-caption text-ink-subtle">{label}</p>
    </div>
  );
}
