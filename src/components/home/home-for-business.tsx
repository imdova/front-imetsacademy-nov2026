import Link from "next/link";
import { ArrowRight, BarChart3, Handshake, Target, Users, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const points: { icon: LucideIcon; label: string }[] = [
  { icon: Users, label: "Customized Programs" },
  { icon: BarChart3, label: "Team Upskilling" },
  { icon: Target, label: "Measurable Impact" },
  { icon: Handshake, label: "Long-Term Partnership" },
];

/** For Businesses & Organizations — corporate training band. */
export function HomeForBusiness() {
  return (
    <section className="bg-navy-900 text-on-dark">
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <h2 className="text-h2 text-on-dark">For Businesses &amp; Organizations</h2>
          <p className="text-body mt-3 max-w-xl text-on-dark-muted">
            Upskill your team, strengthen capabilities, and drive measurable business results with
            our tailored programs.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline-dark" size="lg">
              <Link href={routes.forBusinesses}>
                Corporate Training
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
          {points.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-start">
              <span className="flex size-12 items-center justify-center rounded-lg bg-white/10 text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-label text-on-dark">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
