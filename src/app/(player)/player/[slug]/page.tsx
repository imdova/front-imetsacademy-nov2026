import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { getCurrentLesson } from "@/features/player/data";
import { VideoPlayer } from "@/features/player/components/video-player";
import { LessonTabs } from "@/features/player/components/lesson-tabs";

export const metadata: Metadata = { title: "Lesson" };

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getCurrentLesson();

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
      <div>
        <p className="text-caption font-semibold uppercase tracking-wide text-primary">
          {lesson.moduleTitle}
        </p>
        <h1 className="mt-1 text-h2 text-ink">{lesson.title}</h1>
      </div>

      <VideoPlayer lesson={lesson} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline">
          <CircleCheck className="size-4" aria-hidden="true" />
          Mark as complete
        </Button>
        <Button asChild>
          <Link href={routes.player.quiz(slug)}>
            Take Module Quiz
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <LessonTabs lesson={lesson} />
    </div>
  );
}
