"use client";

import {
  CircleCheck,
  Download,
  FileSpreadsheet,
  FileText,
  MessageCircle,
  Presentation,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { LessonDetail, Resource } from "@/features/player/data";

const RESOURCE_ICON = {
  pdf: FileText,
  ppt: Presentation,
  xls: FileSpreadsheet,
} as const;

const RESOURCE_TINT: Record<Resource["type"], string> = {
  pdf: "bg-danger-50 text-danger",
  ppt: "bg-accent-50 text-accent-strong",
  xls: "bg-success-50 text-success",
};

export function LessonTabs({ lesson }: { lesson: LessonDetail }) {
  return (
    <Tabs defaultValue="overview" className="gap-5">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="resources">Resources ({lesson.resources.length})</TabsTrigger>
        <TabsTrigger value="notes">Notes ({lesson.notes.length})</TabsTrigger>
        <TabsTrigger value="qa">Q&amp;A ({lesson.qaCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <h2 className="text-h4 text-ink">What you&rsquo;ll learn</h2>
        <ul className="space-y-3">
          {lesson.whatYouLearn.map((item) => (
            <li key={item} className="flex items-start gap-3 text-body text-ink-muted">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="resources" className="space-y-3">
        {lesson.resources.map((r) => {
          const Icon = RESOURCE_ICON[r.type];
          return (
            <div
              key={r.name}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${RESOURCE_TINT[r.type]}`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-sm font-semibold text-ink">{r.name}</p>
                <p className="text-caption text-ink-subtle">{r.size}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Download className="size-4" aria-hidden="true" />
                Download
              </Button>
            </div>
          );
        })}
      </TabsContent>

      <TabsContent value="notes" className="space-y-3">
        {lesson.notes.map((n) => (
          <div key={n.time} className="flex gap-3 rounded-lg border border-border bg-surface p-3">
            <span className="shrink-0 rounded-md bg-primary-50 px-2 py-1 text-caption font-bold tabular-nums text-primary">
              {n.time}
            </span>
            <p className="text-body-sm text-ink-muted">{n.text}</p>
          </div>
        ))}
        <label className="block space-y-1.5">
          <span className="text-body-sm font-semibold text-ink">Add a note at the current time</span>
          <textarea
            rows={3}
            placeholder="Type your note…"
            className="w-full rounded-lg border border-border bg-surface-alt p-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>
      </TabsContent>

      <TabsContent value="qa">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-surface-alt px-6 py-12 text-center">
          <MessageCircle className="size-8 text-ink-subtle" aria-hidden="true" />
          <p className="text-body-sm font-semibold text-ink">{lesson.qaCount} questions in this lesson</p>
          <p className="max-w-sm text-caption text-ink-subtle">
            Ask instructors and fellow learners about this lesson. Discussions open once you enroll.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
