import type { ReactNode } from "react";
import { getPlayerCourse } from "@/features/player/data";
import { PlayerHeader } from "@/features/player/components/player-header";
import { CurriculumSidebar } from "@/features/player/components/curriculum-sidebar";

// The curriculum sidebar reads the current path; render at request time.
export const instant = false;

export default async function PlayerLayout({ children }: { children: ReactNode }) {
  const course = await getPlayerCourse();
  return (
    <div className="flex min-h-dvh flex-col bg-surface-alt">
      <PlayerHeader course={course} />
      <div className="flex flex-1">
        <CurriculumSidebar slug={course.slug} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
