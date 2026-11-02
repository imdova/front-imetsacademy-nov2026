import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, GraduationCap, Layers, Play, ShieldCheck } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const heroStats = [
  { icon: GraduationCap, value: "10,000+", label: "Learners" },
  { icon: Layers, value: "20+", label: "Professional Programs" },
  { icon: ShieldCheck, value: "95%", label: "Learner Satisfaction" },
  { icon: Globe, value: "Global", label: "Business Standards" },
];

/**
 * HomeHero — compact navy hero with the campus photo as a full-width
 * background, copy + CTAs + a four-stat band overlaid on the start side.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-on-dark">
      {/* Full-width background photo */}
      <Image
        src="/home/hero-building.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Readability overlay (darker on the start side where the copy sits) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-900/35"
      />

      <Container className="relative z-10 py-8 md:py-10 lg:py-12">
        <div className="max-w-xl">
          <div className="mb-3 flex items-center gap-3">
            <p className="text-overline text-on-dark-muted">Business &amp; Management Education</p>
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
          </div>

          <h1 className="text-display-lg text-balance text-on-dark lg:text-display-xl">
            Build Business Skills for Real <span className="text-accent">Career Growth.</span>
          </h1>

          <p className="text-body mt-3 max-w-lg text-on-dark-muted">
            Professional courses, diplomas, and certifications in management, leadership, and
            digital transformation.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
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

        <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 sm:border-s sm:border-white/20 sm:ps-5 sm:first:border-s-0 sm:first:ps-0"
            >
              <stat.icon className="size-7 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dd className="font-display text-xl font-extrabold text-on-dark">{stat.value}</dd>
                <dt className="text-caption text-on-dark-muted">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
