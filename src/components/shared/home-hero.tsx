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
 * HomeHero — the marketing home hero: navy band with copy + stats on the
 * start side and the campus photo (gold accent + logo overlay) on the end side.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-on-dark">
      <Container className="relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <p className="text-overline text-on-dark-muted">
                  Business &amp; Management Education
                </p>
                <span aria-hidden="true" className="h-px w-10 bg-accent" />
              </div>

              <h1 className="text-display-xl text-balance text-on-dark">
                Build Business Skills for Real{" "}
                <span className="text-accent">Career Growth.</span>
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

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 sm:border-s sm:border-white/15 sm:ps-5 sm:first:border-s-0 sm:first:ps-0"
                >
                  <stat.icon className="size-7 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dd className="font-display text-xl font-extrabold text-on-dark">
                      {stat.value}
                    </dd>
                    <dt className="text-caption text-on-dark-muted">{stat.label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Campus photo */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
              <Image
                src="/home/hero-building.webp"
                alt="IMETS Academy campus"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              {/* Gold corner accent */}
              <div
                aria-hidden="true"
                className="absolute start-0 top-0 size-20 bg-accent"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />
              {/* Logo overlay */}
              <div className="absolute end-4 top-4">
                <Logo variant="dark" className="h-8 w-auto drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
