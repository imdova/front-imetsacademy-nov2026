"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Circle,
  CircleCheck,
  CirclePlay,
  ClipboardList,
  Lock,
  Trophy,
} from "lucide-react";
import { routes } from "@/config/routes";
import {
  CURRICULUM,
  nodeState,
  type CurriculumModule,
  type NodeState,
} from "@/features/player/curriculum";
import { cn } from "@/lib/utils";

function StateIcon({ state, kind }: { state: NodeState; kind: "lesson" | "quiz" }) {
  if (state === "done")
    return <CircleCheck className="size-5 shrink-0 fill-success text-on-dark" aria-hidden="true" />;
  if (state === "current")
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-on-dark">
        {kind === "quiz" ? (
          <ClipboardList className="size-3" aria-hidden="true" />
        ) : (
          <CirclePlay className="size-4" aria-hidden="true" />
        )}
      </span>
    );
  return <Circle className="size-5 shrink-0 text-border-input" aria-hidden="true" />;
}

function ModuleBlock({
  module,
  currentId,
  slug,
}: {
  module: CurriculumModule;
  currentId: string;
  slug: string;
}) {
  const hasCurrent = module.nodes.some((n) => n.id === currentId);
  const [open, setOpen] = useState(hasCurrent);
  const completed = module.nodes.filter(
    (n) => n.kind === "lesson" && nodeState(n.id, currentId) === "done",
  ).length;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start transition-colors",
          hasCurrent ? "bg-primary-50" : "hover:bg-surface-alt",
        )}
      >
        <StateIcon state={hasCurrent ? "current" : completed === module.total ? "done" : "todo"} kind="lesson" />
        <span className="flex-1 text-body-sm font-bold text-ink">{module.title}</span>
        <span className="shrink-0 text-caption text-ink-subtle">
          {completed}/{module.total}
        </span>
        <ChevronDown className={cn("size-4 text-ink-subtle transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <ul className="mt-1 space-y-0.5 ps-2">
          {module.nodes.map((node) => {
            const state = nodeState(node.id, currentId);
            const href = node.kind === "quiz" ? routes.player.quiz(slug) : routes.player.lesson(slug);
            return (
              <li key={node.id}>
                <Link
                  href={href}
                  aria-current={state === "current" ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-body-sm transition-colors",
                    state === "current"
                      ? "bg-primary-50 font-semibold text-primary"
                      : "text-ink-muted hover:bg-surface-alt hover:text-ink",
                  )}
                >
                  <StateIcon state={state} kind={node.kind} />
                  <span className="flex-1">{node.title}</span>
                  {node.duration && <span className="shrink-0 text-caption text-ink-subtle">{node.duration}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function CurriculumSidebarContent({ slug }: { slug: string }) {
  const pathname = usePathname();
  const currentId = pathname.endsWith("/quiz") ? "quiz-m2" : "2.2";

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto border-e border-border bg-surface p-4">
      <div className="flex items-center gap-2 px-2 pb-2">
        <ClipboardList className="size-5 text-primary" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-body-sm font-bold text-ink">Course Curriculum</p>
          <p className="text-caption text-ink-subtle">6 Modules · 24 Lessons</p>
        </div>
      </div>

      <div className="space-y-1">
        {CURRICULUM.map((m) => (
          <ModuleBlock key={m.id} module={m} currentId={currentId} slug={slug} />
        ))}
      </div>

      <div className="mt-2 flex items-center gap-3 rounded-lg bg-surface-alt p-4 text-ink-subtle">
        <Trophy className="size-6 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-body-sm font-bold text-ink">Final Assessment</p>
          <p className="text-caption">Complete all modules to unlock</p>
        </div>
        <Lock className="size-4 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}

export function CurriculumSidebar({ slug }: { slug: string }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[320px] shrink-0 lg:block">
      <CurriculumSidebarContent slug={slug} />
    </aside>
  );
}
