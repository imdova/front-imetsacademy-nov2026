import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Award,
  BarChart3,
  Building2,
  Check,
  Eye,
  Gem,
  Globe,
  GraduationCap,
  Layers,
  Monitor,
  Mountain,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "About IMETS",
  description:
    "IMETS Academy is a professional education platform specializing in business, management, leadership and digital transformation.",
};

const VALUES = [
  "Excellence in Learning",
  "Practical Real-World Impact",
  "Professional Integrity",
  "Innovation & Continuous Growth",
  "Learner Success",
];

const STATS = [
  { icon: Users, value: "10,000+", label: "Learners" },
  { icon: Layers, value: "20+", label: "Professional Programs" },
  { icon: ShieldCheck, value: "95%", label: "Learner Satisfaction" },
  { icon: Globe, value: "Global", label: "Business Standards" },
];

const WHY = [
  {
    icon: GraduationCap,
    title: "Industry-Relevant Programs",
    desc: "Curricula aligned with real business needs and global best practices.",
  },
  {
    icon: BarChart3,
    title: "Practical & Applied Learning",
    desc: "Case studies, tools, and real-world applications.",
  },
  {
    icon: Monitor,
    title: "Flexible Learning",
    desc: "Live online programs designed for working professionals.",
  },
  {
    icon: Award,
    title: "Professional Certificates",
    desc: "IMETS Academy certificates to advance your career.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from experienced industry practitioners and business leaders.",
  },
  {
    icon: Building2,
    title: "For Individuals & Organizations",
    desc: "Programs for career growth and customized training for businesses.",
  },
];

function Eyebrow() {
  return <span className="mb-4 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />;
}

function InfoCard({
  icon,
  iconClass,
  bg,
  title,
  children,
}: {
  icon: ReactNode;
  iconClass: string;
  bg: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-xl p-6 ${bg}`}>
      <span className={`mb-3 inline-flex ${iconClass}`}>{icon}</span>
      <h3 className="text-h4 text-ink">{title}</h3>
      <div className="text-body-sm mt-2 text-ink-muted">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        size="lg"
        breadcrumbs={<Breadcrumbs tone="on-dark" items={[{ label: "About IMETS" }]} />}
        title={
          <span className="inline-flex items-center gap-4">
            <span className="h-10 w-1 shrink-0 rounded bg-accent" aria-hidden="true" />
            <span>
              About IMETS <span className="text-accent">Academy</span>
            </span>
          </span>
        }
        description="A leading provider of business and management education, empowering professionals and organizations to lead, innovate, and grow."
      />

      {/* Who We Are */}
      <Container as="section" className="py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-4">
          <div>
            <Eyebrow />
            <h2 className="text-h2 text-ink">Who We Are</h2>
            <p className="text-body mt-4 text-ink-muted">
              IMETS Academy is a professional education platform specializing in business,
              management, leadership, and digital transformation. We deliver practical,
              industry-relevant programs that build real-world skills, advance careers, and help
              organizations achieve sustainable growth.
            </p>
          </div>

          <InfoCard
            bg="bg-primary-50"
            icon={<Target className="size-7" aria-hidden="true" />}
            iconClass="text-primary"
            title="Our Mission"
          >
            To develop business leaders and professionals through high-quality, practical, and
            globally aligned education.
          </InfoCard>

          <InfoCard
            bg="bg-accent-50"
            icon={<Eye className="size-7" aria-hidden="true" />}
            iconClass="text-accent-strong"
            title="Our Vision"
          >
            To be a trusted regional leader in business and management education and a preferred
            partner for professional development.
          </InfoCard>

          <InfoCard
            bg="bg-violet-50"
            icon={<Gem className="size-7" aria-hidden="true" />}
            iconClass="text-violet"
            title="Our Values"
          >
            <ul className="space-y-2">
              {VALUES.map((v) => (
                <li key={v} className="flex items-center gap-2 text-ink">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-pill bg-accent-50 text-accent-text">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </Container>

      {/* Stats */}
      <Container as="section" className="pb-12 md:pb-16">
        <div className="grid grid-cols-1 gap-y-6 rounded-xl bg-surface-alt p-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 px-2 lg:px-6 ${i > 0 ? "lg:border-s lg:border-border" : ""}`}
            >
              <stat.icon className="size-8 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-stat text-ink">{stat.value}</p>
                <p className="text-body-sm text-ink-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Why Choose IMETS */}
      <Container as="section" className="pb-12 md:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute start-0 top-0 size-16 bg-accent [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
              <Users className="size-20 text-white/15" aria-hidden="true" />
            </div>
          </div>

          <div>
            <Eyebrow />
            <h2 className="text-h2 text-ink">Why Choose IMETS?</h2>
            <p className="text-body mt-2 text-ink-muted">
              A learning experience designed for real career and business impact.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {WHY.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-body-sm font-bold text-ink">{item.title}</p>
                    <p className="text-body-sm text-ink-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Our Commitment */}
      <Container as="section" className="pb-12 md:pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 text-on-dark">
          <div
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-2/5 bg-gradient-to-l from-navy-800 to-transparent lg:flex lg:items-end lg:justify-center"
            aria-hidden="true"
          >
            <Mountain className="mb-6 size-24 text-white/15" />
          </div>
          <div className="relative flex flex-col gap-4 p-8 md:flex-row md:items-center md:p-10 lg:max-w-3xl">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Target className="size-8" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-h2 text-on-dark">Our Commitment</h2>
              <p className="text-body-lg mt-2 text-on-dark-muted">
                To empower professionals and organizations with the knowledge, skills, and
                confidence to lead change, drive performance, and create lasting value.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
