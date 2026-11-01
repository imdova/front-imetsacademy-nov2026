import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social-icons";

const exploreLinks = [
  { label: "Explore Courses", href: routes.courses },
  { label: "Learning Paths", href: routes.learningPaths },
  { label: "For Businesses", href: routes.forBusinesses },
  { label: "Faculty", href: routes.faculty },
];

const companyLinks = [
  { label: "About IMETS", href: routes.about },
  { label: "Contact", href: routes.contact },
  { label: "Sign in", href: routes.signIn },
  { label: "Register", href: routes.register },
];

const socials = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
];

// Evaluated once at build time (render-time Date() is disallowed under Cache Components).
const YEAR = new Date().getFullYear();

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="text-caption font-bold tracking-wider text-on-dark uppercase">{children}</h3>
  );
}

/** Site footer on navy-950, per the design system. */
export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-navy-950 text-on-dark-muted">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="dark" />
            <p className="text-body-sm max-w-xs text-on-dark-muted">
              Professional courses and diplomas in management, leadership and strategy — built
              for working professionals across Egypt and the Gulf.
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

          {/* Explore */}
          <nav aria-label="Explore" className="space-y-4">
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors hover:text-on-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="space-y-4">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors hover:text-on-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-3 text-body-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-on-dark-muted" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-on-dark-muted" aria-hidden="true" />
                <a href={contact.phoneHref} className="transition-colors hover:text-on-dark">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-on-dark-muted" aria-hidden="true" />
                <a href={contact.emailHref} className="transition-colors hover:text-on-dark">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-on-dark"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} IMETS Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href={routes.about} className="transition-colors hover:text-on-dark">
              Privacy Policy
            </Link>
            <Link href={routes.about} className="transition-colors hover:text-on-dark">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
