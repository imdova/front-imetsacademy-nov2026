import { env } from "@/lib/env";
import { routes } from "@/config/routes";

export type NavItem = {
  label: string;
  href: string;
  /** Marks a link that opens a category menu in the design (rendered as a caret). */
  hasMenu?: boolean;
};

/** Site-wide identity, navigation and contact details (from the approved screens). */
export const siteConfig = {
  name: "IMETS Academy",
  shortName: "IMETS",
  tagline: "Learn · Develop · Lead",
  description:
    "Professional courses and diplomas in management, leadership and strategy. Learn from experts, apply in real life — IMETS Academy, built for working professionals across Egypt and the Gulf.",
  url: env.NEXT_PUBLIC_SITE_URL,

  // Fixed order (design-system README). Wording is fixed: "About IMETS", "Contact".
  nav: [
    { label: "Home", href: routes.home },
    { label: "Explore Courses", href: routes.courses, hasMenu: true },
    { label: "Learning Paths", href: routes.learningPaths },
    { label: "For Businesses", href: routes.forBusinesses },
    { label: "Faculty", href: routes.faculty },
    { label: "About IMETS", href: routes.about },
    { label: "Contact", href: routes.contact },
  ] satisfies NavItem[],

  contact: {
    address: "New Cairo, Cairo, Egypt (Business District)",
    phone: "+20 10 1234 5678",
    phoneHref: "tel:+201012345678",
    email: "info@imetsacademy.com",
    emailHref: "mailto:info@imetsacademy.com",
    whatsappHref: "https://wa.me/201012345678",
    workingHours: "Sunday – Thursday, 9:00 AM – 6:00 PM (GMT+2)",
  },

  social: {
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
