import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { NotFoundState } from "@/components/shared/not-found-state";

export default function CourseNotFound() {
  return (
    <Container as="section" className="py-20">
      <NotFoundState
        title="Course not found"
        description="We couldn't find that course. It may have been moved or is no longer available."
        action={
          <Button asChild>
            <Link href={routes.courses}>
              Explore all courses
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
    </Container>
  );
}
