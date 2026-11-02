import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Award, Monitor, TrendingUp, Users } from "lucide-react";
import { routes } from "@/config/routes";
import { getCategories, getFeaturedCourses } from "@/lib/dal/courses";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { HomeHero } from "@/components/shared/home-hero";
import { FeatureStrip } from "@/components/shared/feature-strip";
import { SectionHeading } from "@/components/shared/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryTile, CourseGrid, CourseGridSkeleton } from "@/features/courses";

const features = [
  { icon: <Users />, title: "Expert-Led Training", description: "Industry practitioners & leaders" },
  { icon: <Monitor />, title: "Live Interactive Sessions", description: "Real-time learning on Zoom" },
  { icon: <Award />, title: "Professional Certificates", description: "IMETS Academy Certificates" },
  {
    icon: <TrendingUp />,
    title: "Career Advancement",
    description: "Build leadership & management skills",
  },
];

function ViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-body-sm font-semibold text-primary"
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

async function CategoriesGrid() {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryTile key={category.id} category={category} />
      ))}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-lg" />
      ))}
    </div>
  );
}

async function FeaturedCourses() {
  const courses = await getFeaturedCourses(4);
  return <CourseGrid courses={courses} columns={4} />;
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Container className="relative z-10 -mt-10 md:-mt-12">
        <FeatureStrip items={features} />
      </Container>

      <Container as="section" className="py-12 md:py-16">
        <SectionHeading
          title="Explore by Category"
          action={<ViewAllLink href={routes.courses} label="View All Categories" />}
        />
        <div className="mt-8">
          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesGrid />
          </Suspense>
        </div>
      </Container>

      <Container as="section" className="pb-12 md:pb-16">
        <SectionHeading
          title="Featured Programs"
          description="Our most in-demand programs for working professionals."
          action={<ViewAllLink href={routes.courses} label="View All Programs" />}
        />
        <div className="mt-8">
          <Suspense fallback={<CourseGridSkeleton count={4} columns={4} />}>
            <FeaturedCourses />
          </Suspense>
        </div>
      </Container>

      <section className="bg-navy-900 text-on-dark">
        <Container className="flex flex-col items-center gap-4 py-12 text-center md:py-16">
          <h2 className="text-h2 text-on-dark">
            Ready to Advance Your <span className="text-accent">Career?</span>
          </h2>
          <p className="text-body-lg max-w-xl text-on-dark-muted">
            Join thousands of professionals building the skills that move careers forward.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href={routes.courses}>
                Explore Courses
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline-dark" size="lg">
              <Link href={routes.contact}>Talk to Admissions</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
