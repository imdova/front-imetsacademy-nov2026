"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/shared/error-state";

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Courses page error", error);
  }, [error]);

  return (
    <Container as="section" className="py-12 md:py-16">
      <ErrorState
        title="We couldn't load the courses"
        description="An unexpected error occurred while loading courses. Please try again."
        onRetry={reset}
      />
    </Container>
  );
}
