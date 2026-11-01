import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Camera,
  Clock,
  Flame,
  Globe,
  GraduationCap,
  Headphones,
  Languages,
  Mail,
  MapPin,
  Moon,
  Pencil,
  Phone,
  Play,
  ShoppingCart,
  Star,
  Trophy,
  ChevronRight,
} from "lucide-react";
import {
  getAchievements,
  getLearningStats,
  getStudentProfile,
  type Achievement,
  type AchievementTone,
} from "@/features/student/data";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Profile" };

function Card({
  title,
  icon,
  action,
  children,
  className,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-border bg-surface p-6 ${className ?? ""}`}>
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
          <span className="text-primary">{icon}</span>
          {title}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

const achievementTone: Record<AchievementTone, string> = {
  primary: "bg-primary-50 text-primary",
  teal: "bg-teal-50 text-teal",
  accent: "bg-accent-50 text-accent-strong",
};
const achievementIcon: Record<Achievement["key"], typeof Star> = {
  "first-course": Star,
  "certificate-hunter": Award,
  "active-learner": Flame,
};

export default async function StudentProfilePage() {
  const [profile, stats, achievements] = await Promise.all([
    getStudentProfile(),
    getLearningStats(),
    getAchievements(),
  ]);

  const infoRows = [
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: GraduationCap, label: "Education", value: profile.education },
    { icon: Languages, label: "Languages", value: profile.languages },
  ];

  const statTiles = [
    { icon: BookOpen, value: stats.enrolled, label: "Enrolled Courses" },
    { icon: Play, value: stats.completed, label: "Completed Courses" },
    { icon: Trophy, value: stats.certificates, label: "Certificates" },
    { icon: Clock, value: `${stats.learningHours}h`, label: "Learning Time" },
  ];

  const prefs = [
    { icon: Bell, label: "Notification Preferences", value: undefined },
    { icon: Globe, label: "Language", value: "English" },
    { icon: Moon, label: "Theme", value: "Light" },
  ];

  const quickActions = [
    { icon: Play, title: "Continue Learning", sub: "Strategic Management", href: routes.student.courses },
    { icon: Calendar, title: "Browse Upcoming Webinars", sub: undefined, href: routes.student.courses },
    { icon: ShoppingCart, title: "Explore New Courses", sub: undefined, href: routes.courses },
    { icon: Headphones, title: "Contact Support", sub: undefined, href: routes.contact },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-50 to-violet-50 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="relative shrink-0">
            <span className="flex size-28 items-center justify-center rounded-full bg-primary-100 font-display text-h1 font-bold text-primary ring-4 ring-surface">
              {profile.initials}
            </span>
            <button
              type="button"
              aria-label="Change photo"
              className="absolute end-1 bottom-1 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-ink-muted shadow-sm hover:text-primary"
            >
              <Camera className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-h2 text-ink">{profile.name}</h1>
              {profile.verified && (
                <BadgeCheck className="size-6 fill-primary text-on-dark" aria-label="Verified" />
              )}
            </div>
            <p className="text-body font-medium text-ink-muted">{profile.title}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="size-4" aria-hidden="true" />
                {profile.email}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.tags.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="outline" className="self-start">
            <Pencil className="size-4" aria-hidden="true" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* About + stats/achievements */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card title="About Me" icon={<BookOpen className="size-5" aria-hidden="true" />}>
          <p className="text-body-sm text-ink-muted">{profile.about}</p>
          <dl className="mt-5 space-y-3">
            {infoRows.map((row) => (
              <div key={row.label} className="flex gap-3 text-body-sm">
                <row.icon className="mt-0.5 size-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                <dt className="w-20 shrink-0 text-ink-subtle">{row.label}</dt>
                <dd className="font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="space-y-6">
          <Card
            title="My Learning Stats"
            icon={<BarChart3 className="size-5" aria-hidden="true" />}
            action={
              <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary">
                View Details
                <ChevronRight className="size-4" aria-hidden="true" />
              </span>
            }
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statTiles.map((tile) => (
                <div key={tile.label} className="text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-pill bg-primary-50 text-primary">
                    <tile.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-stat mt-2 text-ink">{tile.value}</p>
                  <p className="text-caption text-ink-muted">{tile.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="My Achievements"
            icon={<Trophy className="size-5" aria-hidden="true" />}
            action={
              <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary">
                View All
                <ChevronRight className="size-4" aria-hidden="true" />
              </span>
            }
          >
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((a) => {
                const Icon = achievementIcon[a.key];
                return (
                  <div key={a.key} className="flex flex-col items-center text-center">
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl ${achievementTone[a.tone]}`}
                    >
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-body-sm font-bold text-ink">{a.title}</p>
                    <p className="text-caption text-ink-subtle">{a.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Preferences + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Account Preferences" icon={<Bell className="size-5" aria-hidden="true" />}>
          <ul className="divide-y divide-border">
            {prefs.map((p) => (
              <li key={p.label}>
                <Link
                  href="#"
                  className="flex items-center gap-3 py-3 text-body-sm text-ink hover:text-primary"
                >
                  <p.icon className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
                  <span className="flex-1">{p.label}</span>
                  {p.value && <span className="text-ink-muted">{p.value}</span>}
                  <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Quick Actions" icon={<Flame className="size-5" aria-hidden="true" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickActions.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface-alt/50 p-4 transition-colors hover:border-primary"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <a.icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-body-sm font-semibold text-ink">{a.title}</span>
                  {a.sub && <span className="block text-caption text-ink-subtle">{a.sub}</span>}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
