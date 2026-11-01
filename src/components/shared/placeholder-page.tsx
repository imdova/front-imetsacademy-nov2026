import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";

/** Lightweight stand-in for marketing/auth pages not yet built in Phase 1. */
export function PlaceholderPage({
  title,
  description,
  note = "This page is on the way. In the meantime, explore our courses or get in touch.",
}: {
  title: ReactNode;
  description: string;
  note?: string;
}) {
  return (
    <>
      <PageHero size="lg" title={title} description={description} />
      <Container as="section" className="py-16 md:py-24">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="info">Coming soon</Badge>
          <p className="text-body text-ink-muted">{note}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={routes.courses}>
                Explore Courses
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={routes.contact}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
