import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, GraduationCap, Layers, Play, ShieldCheck } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

const heroStats = [
  { icon: GraduationCap, value: "10,000+", label: "Learners" },
  { icon: Layers, value: "20+", label: "Professional Programs" },
  { icon: ShieldCheck, value: "95%", label: "Learner Satisfaction" },
  { icon: Globe, value: "Global", label: "Business Standards" },
];

/**
 * HomeHero — navy hero band with the campus photo embedded into the
 * background on the end side (diagonal cut + gold accent), copy, CTAs and a
 * four-stat band on the start side.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-on-dark">
      {/* Campus photo embedded in the background (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] lg:block"
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Image
            src="/home/hero-building.webp"
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover"
          />
          {/* Soften only the diagonal seam into the navy (keep the photo visible) */}
          <div className="absolute inset-y-0 start-0 w-[32%] bg-gradient-to-r from-navy-900 to-transparent" />
        </div>
        {/* Thin gold diagonal accent along the cut */}
        <div
          className="absolute inset-0 bg-accent"
          style={{ clipPath: "polygon(18% 0, 19.3% 0, 1.3% 100%, 0 100%)" }}
        />
      </div>

      {/* Logo overlay on the photo (desktop) */}
      <div className="pointer-events-none absolute end-6 top-6 z-10 hidden lg:block">
        <Logo variant="dark" className="h-9 w-auto drop-shadow-md" />
      </div>

      <Container className="relative z-10 py-12 md:py-16 lg:py-24">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-3">
            <p className="text-overline text-on-dark-muted">Business &amp; Management Education</p>
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
          </div>

          <h1 className="text-display-xl text-balance text-on-dark">
            Build Business Skills for Real <span className="text-accent">Career Growth.</span>
          </h1>

          <p className="text-body-lg mt-4 max-w-lg text-on-dark-muted">
            Professional courses, diplomas, and certifications in management, leadership, and
            digital transformation.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href={routes.courses}>
                Explore Courses
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline-dark" size="lg">
              <Link href={routes.about}>
                <span className="flex size-6 items-center justify-center rounded-full border border-on-dark">
                  <Play className="size-3 fill-current" aria-hidden="true" />
                </span>
                Watch Intro (2 min)
              </Link>
            </Button>
          </div>
        </div>

        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 sm:border-s sm:border-white/15 sm:ps-5 sm:first:border-s-0 sm:first:ps-0"
            >
              <stat.icon className="size-7 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dd className="font-display text-xl font-extrabold text-on-dark">{stat.value}</dd>
                <dt className="text-caption text-on-dark-muted">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>

        {/* Campus photo (mobile / tablet) */}
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/10 lg:hidden">
          <Image
            src="/home/hero-building.webp"
            alt="IMETS Academy campus"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute start-0 top-0 size-16 bg-accent"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>
      </Container>
    </section>
  );
}
