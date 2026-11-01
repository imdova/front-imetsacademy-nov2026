import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Award, Clock, Headphones, Layers, Mail, MapPin, Phone, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { FeatureStrip } from "@/components/shared/feature-strip";
import { ContactForm, ContactTile } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question about our courses, enrollment, or partnerships? Contact the IMETS Academy admissions team.",
};

const features = [
  { icon: <Headphones />, title: "Quick Response", description: "We reply within 24 hours" },
  { icon: <Award />, title: "Expert Support", description: "Guidance from our admissions team" },
  { icon: <Users />, title: "Course Guidance", description: "Help you choose the right program" },
  { icon: <Layers />, title: "Business Solutions", description: "Custom training for organizations" },
];

function ReachRow({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
        {icon}
      </span>
      <div>
        <p className="font-display text-[17px] leading-[22px] font-bold text-ink">{title}</p>
        <p className="text-body-sm text-ink-muted">{children}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        size="lg"
        eyebrow={
          <span className="inline-flex items-center gap-2 text-body-lg text-on-dark">
            <span aria-hidden="true" className="h-5 w-0.5 bg-accent" />
            Get in Touch
          </span>
        }
        title={
          <>
            Contact <span className="text-accent">Us</span>
          </>
        }
        description="Have a question about our courses, enrollment, or partnerships? We're here to help you succeed."
      />

      <Container as="section" className="py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Reach Us */}
          <div className="space-y-6 lg:col-span-3">
            <div className="space-y-2">
              <h2 className="text-h3 text-ink">Reach Us</h2>
              <p className="text-body-sm text-ink-muted">
                Get in touch through any of the following channels.
              </p>
            </div>
            <div className="space-y-5">
              <ReachRow icon={<MapPin className="size-5" aria-hidden="true" />} title="Our Address">
                {contact.address}
              </ReachRow>
              <ReachRow icon={<Phone className="size-5" aria-hidden="true" />} title="Phone">
                <a href={contact.phoneHref} className="hover:text-primary">
                  {contact.phone}
                </a>
              </ReachRow>
              <ReachRow icon={<Mail className="size-5" aria-hidden="true" />} title="Email">
                <a href={contact.emailHref} className="hover:text-primary">
                  {contact.email}
                </a>
              </ReachRow>
              <ReachRow icon={<Clock className="size-5" aria-hidden="true" />} title="Working Hours">
                {contact.workingHours}
              </ReachRow>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
              <h2 className="text-h3 text-ink">Send Us a Message</h2>
              <p className="text-body-sm mt-1 mb-6 text-ink-muted">
                Fill out the form below and our team will get back to you soon.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-4 lg:col-span-3">
            <div className="space-y-2">
              <h2 className="text-h3 text-ink">Quick Contact</h2>
              <p className="text-body-sm text-ink-muted">
                Prefer a faster way? Contact us directly.
              </p>
            </div>
            <ContactTile
              variant="whatsapp"
              href={contact.whatsappHref}
              title="Chat on WhatsApp"
              description="Get instant assistance from our admissions team."
              external
            />
            <ContactTile
              variant="email"
              href={contact.emailHref}
              title="Email Us"
              description={contact.email}
            />
            <ContactTile
              variant="call"
              href={contact.phoneHref}
              title="Call Us"
              description={contact.phone}
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="pb-12 md:pb-16">
        <FeatureStrip items={features} />
      </Container>
    </>
  );
}
