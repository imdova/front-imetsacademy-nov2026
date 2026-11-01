import { Maximize, Pause, Play, Settings, Volume2 } from "lucide-react";
import type { LessonDetail } from "@/features/player/data";

/** Video surface placeholder (a real player wires up a streaming source later). */
export function VideoPlayer({ lesson }: { lesson: LessonDetail }) {
  return (
    <div className="overflow-hidden rounded-xl bg-navy-900 text-on-dark shadow-md">
      <div className="relative aspect-video">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-800 to-navy-900">
          <button
            type="button"
            aria-label="Play video"
            className="flex size-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20"
          >
            <Play className="size-9 translate-x-0.5 fill-current" aria-hidden="true" />
          </button>
          <p className="max-w-md px-6 text-center text-body-sm text-white/70">{lesson.title}</p>
        </div>
      </div>

      {/* Control bar (decorative preview) */}
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="h-1.5 overflow-hidden rounded-pill bg-white/15">
          <div className="h-full rounded-pill bg-primary" style={{ width: "40%" }} />
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Pause className="size-5" aria-hidden="true" />
          <Volume2 className="size-5" aria-hidden="true" />
          <span className="text-caption tabular-nums">
            {lesson.position} / {lesson.duration}
          </span>
          <div className="ms-auto flex items-center gap-4">
            <Settings className="size-5" aria-hidden="true" />
            <Maximize className="size-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
