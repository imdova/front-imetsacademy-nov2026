import { Suspense } from "react";
import { getFeaturedCourses } from "@/lib/dal/courses";
import { Container } from "@/components/layout/container";
import { HomeHero } from "@/components/shared/home-hero";
import { HomeCategories } from "@/components/home/home-categories";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { HomeFeaturedCourses } from "@/components/home/home-featured-courses";
import { HomeForBusiness } from "@/components/home/home-for-business";
import { HomeTestimonials } from "@/components/home/home-testimonials";
import { CourseGridSkeleton } from "@/features/courses";

async function FeaturedCourses() {
  const courses = await getFeaturedCourses(6);
  return <HomeFeaturedCourses courses={courses} />;
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeWhyChoose />
      <Suspense
        fallback={
          <Container className="py-12 md:py-16">
            <CourseGridSkeleton count={3} columns={3} />
          </Container>
        }
      >
        <FeaturedCourses />
      </Suspense>
      <HomeForBusiness />
      <HomeTestimonials />
    </>
  );
}
