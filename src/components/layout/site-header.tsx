import { Suspense } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { MainNav } from "@/components/layout/main-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";

/** Public site header: logo, primary nav, search, Sign in, Register. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container className="flex h-16 items-center gap-6 md:gap-8">
        <Link href={routes.home} aria-label={`${siteConfig.name} — home`} className="shrink-0">
          <Logo priority />
        </Link>

        <Suspense fallback={<NavLinks items={siteConfig.nav} pathname={null} />}>
          <MainNav items={siteConfig.nav} />
        </Suspense>

        <div className="ms-auto flex items-center gap-3">
          <IconButton shape="square" asChild aria-label="Search courses">
            <Link href={routes.courses}>
              <Search className="size-5" aria-hidden="true" />
            </Link>
          </IconButton>
          <Button asChild variant="outline" className="hidden lg:inline-flex">
            <Link href={routes.signIn}>Sign in</Link>
          </Button>
          <Button asChild variant="accent" className="hidden lg:inline-flex">
            <Link href={routes.register}>Register</Link>
          </Button>
          <MobileMenu items={siteConfig.nav} />
        </div>
      </Container>
    </header>
  );
}
