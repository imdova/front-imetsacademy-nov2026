import { Award, BarChart3, Monitor, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: "accent" | "primary";
};

const features: Feature[] = [
  {
    icon: Award,
    title: "Expert Faculty",
    description: "Learn from experienced industry practitioners.",
    tone: "accent",
  },
  {
    icon: BarChart3,
    title: "Practical & Applied",
    description: "Real business cases, tools, and frameworks.",
    tone: "primary",
  },
  {
    icon: Monitor,
    title: "Flexible Learning",
    description: "Live online programs designed for working professionals.",
    tone: "primary",
  },
  {
    icon: Users,
    title: "For Individuals & Businesses",
    description: "Programs for career growth and team development.",
    tone: "primary",
  },
];

/** Why Choose IMETS — supporting visual + four value points. */
export function HomeWhyChoose() {
  return (
    <section className="bg-surface-alt">
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        {/* Visual */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-900 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
          <Users className="absolute end-6 bottom-6 size-40 text-white/5" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute start-0 top-0 size-20 bg-accent"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
          <p className="absolute start-6 bottom-6 max-w-[16rem] text-body-sm text-on-dark-muted">
            Practical, industry-relevant learning for working professionals.
          </p>
        </div>

        {/* Copy + features */}
        <div>
          <p className="text-overline text-accent-text">Why Choose IMETS</p>
          <h2 className="text-h2 mt-2 text-ink">Your Partner in Professional Growth</h2>
          <p className="text-body mt-3 max-w-xl text-ink-muted">
            We deliver practical, industry-relevant business education that builds real skills,
            advances careers, and drives organizational success.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description, tone }) => (
              <div key={title} className="flex gap-3">
                <span
                  className={
                    tone === "accent"
                      ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-text"
                      : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary"
                  }
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-display text-[15px] font-bold text-ink">{title}</dt>
                  <dd className="text-body-sm mt-0.5 text-ink-muted">{description}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
