import { cache, type ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock,
  FileText,
  MessageCircleQuestion,
  MonitorSmartphone,
  Star,
  Users,
  Video,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/dal/courses";
import { isNotFoundError } from "@/lib/errors";
import { routes } from "@/config/routes";
import { formatCount } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Avatar } from "@/components/shared/avatar";
import Image from "next/image";
import {
  CourseFaqs,
  CourseMeta,
  CoursePreviewVideo,
  CourseReviews,
  CourseTabs,
  CurriculumAccordion,
  EnrollCard,
  InstructorCard,
  PROGRAM_TYPE_LABEL,
  type CourseWithRelations,
} from "@/features/courses";

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

const OVERVIEW_FEATURES = [
  { icon: BookOpen, label: "Expert-Led Live Sessions" },
  { icon: ClipboardCheck, label: "Practice & Mock Exams" },
  { icon: Star, label: "Real-World Case Studies" },
  { icon: Award, label: "Certificate of Completion" },
];

const AUDIENCE = [
  "Managers and team leaders",
  "Professionals advancing their careers",
  "Anyone building practical business skills",
  "Teams investing in upskilling",
];

function HeroStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={i <= Math.round(value) ? "size-4 fill-accent stroke-accent" : "size-4 fill-none stroke-on-dark-muted"}
        />
      ))}
    </span>
  );
}

function SidebarCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-4 inline-flex items-center gap-2 text-h4 text-ink">
        {icon}
        {title}
      </h2>
      {children}
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

  const includes = [
    { icon: Clock, label: `${course.sessions} live sessions on Zoom` },
    { icon: FileText, label: "Comprehensive study materials" },
    { icon: ClipboardCheck, label: "Practice exams & question bank" },
    { icon: MonitorSmartphone, label: "Access on desktop, tablet and mobile" },
    { icon: Award, label: "Certificate of completion" },
    { icon: MessageCircleQuestion, label: "Q&A with the instructor" },
    { icon: Video, label: "Access to class recordings" },
  ];

  const overview = (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-h3 text-ink">About This Course</h2>
        <p className="text-body text-ink-muted">{course.description}</p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OVERVIEW_FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface p-3"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <f.icon className="size-5" aria-hidden="true" />
            </span>
            <span className="text-body-sm font-medium text-ink">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <section className="space-y-3">
          <h3 className="text-h4 text-ink">Key Benefits</h3>
          <ul className="space-y-2.5">
            {course.keyBenefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-primary-50 text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-body-sm text-ink-muted">{b}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-3">
          <h3 className="text-h4 text-ink">{"What You'll Learn"}</h3>
          <ul className="space-y-2.5">
            {course.whatYouLearn.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-primary-50 text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-body-sm text-ink-muted">{item}</span>
              </li>
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
          {course.curriculum.length} modules · {course.sessions} sessions · {course.durationMonths} months
        </span>
      </div>
      <CurriculumAccordion modules={course.curriculum} live={course.learningMode.includes("Live")} />
    </div>
  );

  return (
    <>
      <section className="bg-navy-900 text-on-dark">
        <Container className="pt-8 pb-10 lg:pb-36">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)]">
            <div className="max-w-2xl">
              <Breadcrumbs
                tone="on-dark"
                items={[
                  { label: "Home", href: routes.home },
                  { label: "Explore Courses", href: routes.courses },
                  { label: course.category.name, href: `${routes.courses}?category=${course.categorySlug}` },
                  { label: course.title },
                ]}
              />
              <Badge variant="program" className="mt-4">
                {PROGRAM_TYPE_LABEL[course.programType]}
              </Badge>
              <h1 className="text-h1 mt-3 text-on-dark">{course.title}</h1>
              <p className="text-body-lg mt-3 text-on-dark-muted">{course.summary}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm">
                <span className="inline-flex items-center gap-2 font-bold">
                  <HeroStars value={course.rating} />
                  {course.rating.toFixed(1)}
                  <span className="font-normal text-on-dark-muted">
                    ({formatCount(course.reviews)} reviews)
                  </span>
                </span>
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

              <div className="mt-6 flex items-center gap-3">
                <Avatar initials={course.instructor.initials} size="md" />
                <div>
                  <p className="text-body-sm font-semibold text-on-dark">{course.instructor.name}</p>
                  <p className="text-caption text-on-dark-muted">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <CoursePreviewVideo />
            </div>
          </div>
        </Container>
      </section>

      <Container as="section" className="relative pb-16 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <aside className="z-10 space-y-6 lg:col-start-2 lg:row-start-1 lg:-mt-28">
            <div className="space-y-6 lg:sticky lg:top-20">
              <EnrollCard course={course} />

              <SidebarCard
                title="This course includes"
                icon={<BadgeCheck className="size-5 text-primary" aria-hidden="true" />}
              >
                <ul className="space-y-3">
                  {includes.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-body-sm text-ink-muted">
                      <item.icon className="size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </SidebarCard>

              <SidebarCard
                title="Who is this course for?"
                icon={<Users className="size-5 text-primary" aria-hidden="true" />}
              >
                <ul className="space-y-3">
                  {AUDIENCE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-body-sm text-ink-muted">
                      <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SidebarCard>

              <SidebarCard
                title="Certification"
                icon={<Award className="size-5 text-accent-strong" aria-hidden="true" />}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-border bg-surface-alt">
                    <Image src="/brand/imets-mark.png" alt="" width={32} height={26} className="h-6 w-auto" />
                    <span className="text-[9px] font-bold tracking-wider text-ink-subtle uppercase">
                      Certificate
                    </span>
                  </div>
                  <p className="text-body-sm text-ink-muted">
                    Receive a verified IMETS Academy certificate upon successful completion.
                  </p>
                </div>
              </SidebarCard>
            </div>
          </aside>

          <div className="lg:col-start-1 lg:row-start-1 lg:pt-10">
            <CourseTabs
              overview={overview}
              curriculum={curriculum}
              instructor={<InstructorCard instructor={course.instructor} detailed />}
              reviews={<CourseReviews rating={course.rating} reviews={course.reviews} />}
              faqs={<CourseFaqs />}
              reviewsCount={course.reviews}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
