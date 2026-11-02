import Link from "next/link";
import { Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social-icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Courses", href: routes.courses },
  { label: "Learning Paths", href: routes.learningPaths },
  { label: "For Businesses", href: routes.forBusinesses },
];

const aboutLinks = [
  { label: "About Us", href: routes.about },
  { label: "Our Faculty", href: routes.faculty },
  { label: "Accreditation", href: routes.about },
  { label: "Contact Us", href: routes.contact },
];

const supportLinks = [
  { label: "FAQs", href: routes.contact },
  { label: "Help Center", href: routes.contact },
  { label: "Terms & Conditions", href: routes.about },
  { label: "Privacy Policy", href: routes.about },
];

const socials = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
];

// Evaluated once at build time (render-time Date() is disallowed under Cache Components).
const YEAR = new Date().getFullYear();

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="text-caption font-bold tracking-wider text-on-dark uppercase">{children}</h3>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title} className="space-y-4">
      <FooterHeading>{title}</FooterHeading>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-body-sm transition-colors hover:text-on-dark">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Site footer on navy-950, per the brand design. */
export function Footer() {
  return (
    <footer className="bg-navy-950 text-on-dark-muted">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_2fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="dark" />
            <p className="text-body-sm max-w-xs text-on-dark-muted">
              Professional business and management education for individuals and organizations.
            </p>
            <ul className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-pill border border-white/15 text-on-dark-muted transition-colors hover:border-on-dark hover:text-on-dark"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="About IMETS" links={aboutLinks} />
          <LinkColumn title="Support" links={supportLinks} />

          {/* Subscribe */}
          <div className="space-y-4">
            <FooterHeading>Subscribe to Our Updates</FooterHeading>
            <p className="text-body-sm text-on-dark-muted">
              Get the latest courses, offers, and insights.
            </p>
            <div className="flex overflow-hidden rounded-md border border-white/15 bg-white/5 focus-within:border-accent">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-body-sm text-on-dark placeholder:text-on-dark-muted focus:outline-none"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="flex shrink-0 items-center justify-center bg-accent px-4 text-ink transition-colors hover:bg-accent-hover"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-caption">
          <p className="text-center sm:text-start">
            © {YEAR} IMETS Academy. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
