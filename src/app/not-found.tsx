import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { NotFoundState } from "@/components/shared/not-found-state";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="border-b border-border bg-surface">
        <Container className="flex h-16 items-center">
          <Link href={routes.home} aria-label="IMETS Academy — home">
            <Logo />
          </Link>
        </Container>
      </div>
      <Container className="flex flex-1 items-center justify-center py-20">
        <NotFoundState
          title="Page not found"
          description="The page you're looking for doesn't exist or has moved."
          action={
            <Button asChild>
              <Link href={routes.home}>
                Back to home
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
      </Container>
    </main>
  );
}
