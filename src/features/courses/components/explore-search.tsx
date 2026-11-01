"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildCoursesQuery } from "@/features/courses/url";

/** Big hero search. Submitting navigates to /courses?q=… */
export function ExploreSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push(buildCoursesQuery({ q: value.trim() || undefined }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1.5 ps-5 shadow-md"
    >
      <Search className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What do you want to learn today?"
        aria-label="Search courses"
        className="min-w-0 flex-1 border-0 bg-transparent text-body text-ink outline-none placeholder:text-ink-subtle"
      />
      <Button type="submit" className="shrink-0">
        <Search className="size-4 sm:hidden" aria-hidden="true" />
        <span className="max-sm:sr-only">Search</span>
      </Button>
    </form>
  );
}
