import { cache, type ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Award,
  CalendarDays,
  Check,
  GraduationCap,
  Globe,
  Monitor,
  Users,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/dal/courses";
import { isNotFoundError } from "@/lib/errors";
import { routes } from "@/config/routes";
import { formatCount } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { StarRating } from "@/components/shared/star-rating";
import {
  CourseMeta,
  CourseTabs,
  CurriculumAccordion,
  InstructorCard,
  PriceCard,
  PROGRAM_TYPE_LABEL,
  type CourseWithRelations,
} from "@/features/courses";

/** Memoize per request so generateMetadata and the page share one DB read. */
const getCourse = cache((slug: string) => getCourseBySlug(slug));

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course = await getCourse(slug);
    return { title: course.title, description: course.summary };
  } catch {
    return { title: "Course" };
  }
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-accent-50 text-accent-text">
        <Check className="size-3.5" aria-hidden="true" />
      </span>
      <span className="text-body-sm text-ink-muted">{children}</span>
    </li>
  );
}

function GlanceRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="inline-flex items-center gap-2 text-body-sm text-ink-muted">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <span className="text-body-sm font-semibold text-ink">{children}</span>
    </div>
  );
}

function GlanceCard({ course }: { course: CourseWithRelations }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-4 inline-flex items-center gap-2 text-h4 text-ink">
        <CalendarDays className="size-5 text-primary" aria-hidden="true" />
        Course at a Glance
      </h2>
      <dl className="divide-y divide-border">
        <GlanceRow icon={<GraduationCap className="size-5" />} label="Program Type">
          <Badge variant="program">{PROGRAM_TYPE_LABEL[course.programType]}</Badge>
        </GlanceRow>
        <GlanceRow icon={<CalendarDays className="size-5" />} label="Duration">
          {course.durationMonths} Months
        </GlanceRow>
        <GlanceRow icon={<Monitor className="size-5" />} label="Learning Mode">
          {course.learningMode}
        </GlanceRow>
        <GlanceRow icon={<Users className="size-5" />} label="Sessions">
          {course.sessions} Sessions
        </GlanceRow>
        <GlanceRow icon={<Globe className="size-5" />} label="Language">
          {course.language}
        </GlanceRow>
        <GlanceRow icon={<Award className="size-5" />} label="Certificate">
          {course.certificate}
        </GlanceRow>
      </dl>
    </div>
  );
}

function CertificateCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
        <Award className="size-5 text-accent-strong" aria-hidden="true" />
        Earn a Professional Certificate
      </h2>
      <p className="text-body-sm mt-2 text-ink-muted">
        Receive an official IMETS Academy certificate upon successful completion.
      </p>
    </div>
  );
}

export default async function CourseDetailPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  let course: CourseWithRelations;
  try {
    course = await getCourse(slug);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }

  const overview = (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-h3 text-ink">About This Course</h2>
        <p className="text-body text-ink-muted">{course.description}</p>
      </section>
      <div className="grid gap-8 sm:grid-cols-2">
        <section className="space-y-3">
          <h3 className="text-h4 text-ink">Key Benefits</h3>
          <ul className="space-y-2.5">
            {course.keyBenefits.map((benefit) => (
              <CheckItem key={benefit}>{benefit}</CheckItem>
            ))}
          </ul>
        </section>
        <section className="space-y-3">
          <h3 className="text-h4 text-ink">{"What You'll Learn"}</h3>
          <ul className="space-y-2.5">
            {course.whatYouLearn.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );

  const curriculum = (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-h3 text-ink">Course Curriculum</h2>
        <span className="text-body-sm text-ink-muted">
          {course.sessions} Sessions · {course.durationMonths} Months
        </span>
      </div>
      <CurriculumAccordion modules={course.curriculum} />
    </div>
  );

  const instructor = <InstructorCard instructor={course.instructor} detailed />;

  return (
    <>
      <section className="bg-navy-900 text-on-dark">
        <Container className="pt-8 pb-10 lg:pb-36">
          <div className="max-w-2xl">
            <Breadcrumbs
              tone="on-dark"
              items={[
                { label: "Explore Courses", href: routes.courses },
                { label: course.title },
              ]}
            />
            <Badge variant="program" className="mt-4">
              {PROGRAM_TYPE_LABEL[course.programType]}
            </Badge>
            <h1 className="text-h1 mt-3 text-on-dark">{course.title}</h1>
            <p className="text-body-lg mt-3 text-on-dark-muted">{course.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm">
              <StarRating
                rating={course.rating}
                reviews={course.reviews}
                className="text-on-dark [&_span]:text-on-dark"
              />
              <span className="inline-flex items-center gap-1.5 text-on-dark-muted">
                <Users className="size-4" aria-hidden="true" />
                {formatCount(course.enrolled)}+ Enrolled
              </span>
            </div>
            <CourseMeta
              durationMonths={course.durationMonths}
              learningMode={course.learningMode}
              sessions={course.sessions}
              tone="on-dark"
              className="mt-4"
            />
          </div>
        </Container>
      </section>

      <Container as="section" className="relative pb-16 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <aside className="z-10 space-y-6 lg:col-start-2 lg:row-start-1 lg:-mt-28">
            <div className="space-y-6 lg:sticky lg:top-20">
              <PriceCard course={course} />
              <GlanceCard course={course} />
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="mb-4 text-h4 text-ink">Instructor</h2>
                <InstructorCard instructor={course.instructor} />
              </div>
              <CertificateCard />
            </div>
          </aside>

          <div className="lg:col-start-1 lg:row-start-1 lg:pt-10">
            <CourseTabs overview={overview} curriculum={curriculum} instructor={instructor} />
          </div>
        </div>
      </Container>
    </>
  );
}
