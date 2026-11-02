import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Avatar } from "@/components/shared/avatar";

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Omar Hassan",
    role: "Operations Manager",
    initials: "OH",
    quote:
      "A highly practical program with real business applications. It helped me move to a leadership role in my company.",
  },
  {
    name: "Nour Ahmed",
    role: "Business Analyst",
    initials: "NA",
    quote:
      "Excellent content, expert instructors, and a very organized learning experience. Highly recommended!",
  },
  {
    name: "Kareem Mostafa",
    role: "Project Leader",
    initials: "KM",
    quote:
      "The PMP® prep course was comprehensive and well-structured. I passed my exam on the first attempt!",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
      ))}
    </div>
  );
}

/** What Our Learners Say — testimonials. */
export function HomeTestimonials() {
  return (
    <section className="bg-surface-alt">
      <Container className="py-12 md:py-16">
        <SectionHeading title="What Our Learners Say" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} />
                <figcaption>
                  <p className="text-[15px] font-bold text-ink">{t.name}</p>
                  <p className="text-caption text-ink-muted">{t.role}</p>
                </figcaption>
              </div>
              <Stars />
              <blockquote className="text-body-sm text-ink-muted">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
