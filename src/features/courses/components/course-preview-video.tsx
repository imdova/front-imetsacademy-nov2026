import { GraduationCap, Play } from "lucide-react";

/** Decorative "course overview" video preview for the course hero (no real media yet). */
export function CoursePreviewVideo() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy-800 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
      <GraduationCap
        className="absolute end-6 bottom-2 size-28 text-white/10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex size-16 items-center justify-center rounded-full bg-surface/90 shadow-lg">
          <Play className="ms-1 size-7 fill-primary text-primary" />
        </span>
      </div>
      <span className="absolute start-3 bottom-3 inline-flex items-center gap-2 rounded-pill bg-black/40 px-3 py-1 text-caption text-on-dark">
        <Play className="size-3.5 fill-current" aria-hidden="true" />
        Watch course overview (2:30)
      </span>
    </div>
  );
}
