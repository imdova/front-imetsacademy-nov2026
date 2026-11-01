"use client";

import { useState } from "react";
import { ListTree } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CurriculumSidebarContent } from "@/features/player/components/curriculum-sidebar";

/** Mobile trigger that opens the curriculum in a drawer (hidden on desktop). */
export function CurriculumMobile({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open curriculum"
          className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt hover:text-ink lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ListTree className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent side="start" className="w-[320px] p-0">
        <SheetTitle className="sr-only">Course curriculum</SheetTitle>
        <CurriculumSidebarContent slug={slug} />
      </SheetContent>
    </Sheet>
  );
}
