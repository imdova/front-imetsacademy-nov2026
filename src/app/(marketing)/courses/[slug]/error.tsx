"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/shared/error-state";

export default function CourseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Course detail error", error);
  }, [error]);

  return (
    <Container as="section" className="py-12 md:py-16">
      <ErrorState
        title="We couldn't load this course"
        description="An unexpected error occurred. Please try again."
        onRetry={reset}
      />
    </Container>
  );
}
