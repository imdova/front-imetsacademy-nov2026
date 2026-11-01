"use client";

import { useState } from "react";
import {
  Accessibility,
  Bell,
  ChevronRight,
  Database,
  Globe,
  GraduationCap,
  KeyRound,
  Laptop,
  Mail,
  Megaphone,
  Moon,
  Phone,
  Shield,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import { FieldFrame } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";
import type { StudentProfile } from "@/features/student/data";

type SectionKey =
  | "account"
  | "security"
  | "notifications"
  | "learning"
  | "language"
  | "accessibility"
  | "appearance"
  | "privacy";

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon }[] = [
  { key: "account", label: "Account Settings", icon: User },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "learning", label: "Learning Preferences", icon: GraduationCap },
  { key: "language", label: "Language & Region", icon: Globe },
  { key: "accessibility", label: "Accessibility", icon: Accessibility },
  { key: "appearance", label: "Appearance", icon: Moon },
  { key: "privacy", label: "Privacy & Data", icon: Database },
];

type PrefKey = "email" | "in-app" | "marketing" | "recommendations";

export function SettingsView({ profile }: { profile: StudentProfile }) {
  const [section, setSection] = useState<SectionKey>("account");
  const [about, setAbout] = useState(
    "Business professional and lifelong learner focused on strategy, leadership, and digital transformation.",
  );
  const [twoFactor, setTwoFactor] = useState(true);
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    email: true,
    "in-app": true,
    marketing: false,
    recommendations: true,
  });

  const [firstName = "", lastName = ""] = profile.name.split(" ");

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
      {/* Sub-nav */}
      <nav className="rounded-xl border border-border bg-surface p-2">
        <ul className="space-y-1">
          {SECTIONS.map((s) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => setSection(s.key)}
                aria-current={section === s.key ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors",
                  section === s.key
                    ? "bg-primary-50 text-primary"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink",
                )}
              >
                <s.icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-start">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section content */}
      <section className="rounded-xl border border-border bg-surface p-6">
        {section === "account" ? (
          <>
            <h2 className="text-h3 text-ink">Account Settings</h2>
            <p className="mt-1 text-body-sm text-ink-muted">
              Update your personal information and account details.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Avatar initials={profile.initials} size="lg" />
              <div>
                <p className="text-body font-bold text-ink">{profile.name}</p>
                <p className="text-body-sm text-ink-muted">{profile.email}</p>
                <p className="mt-1 text-caption text-ink-subtle">Recommended: JPG or PNG, max 2MB</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="First Name" required>
                <FieldFrame border="control">
                  <Input defaultValue={firstName} />
                </FieldFrame>
              </Field>
              <Field label="Last Name" required>
                <FieldFrame border="control">
                  <Input defaultValue={lastName} />
                </FieldFrame>
              </Field>
              <Field label="Email Address" required>
                <FieldFrame border="control">
                  <Mail className="size-5 text-ink-subtle" aria-hidden="true" />
                  <Input type="email" defaultValue={profile.email} />
                </FieldFrame>
              </Field>
              <Field label="Phone Number">
                <FieldFrame border="control">
                  <Phone className="size-5 text-ink-subtle" aria-hidden="true" />
                  <Input type="tel" defaultValue={profile.phone} />
                </FieldFrame>
              </Field>
              <Field label="Country">
                <FieldFrame border="control">
                  <Globe className="size-5 text-ink-subtle" aria-hidden="true" />
                  <NativeSelect defaultValue="Egypt">
                    <option>Egypt</option>
                    <option>Saudi Arabia</option>
                    <option>United Arab Emirates</option>
                    <option>Jordan</option>
                  </NativeSelect>
                </FieldFrame>
              </Field>
              <Field label="Time Zone">
                <FieldFrame border="control">
                  <NativeSelect defaultValue="(GMT+02:00) Cairo">
                    <option>(GMT+02:00) Cairo</option>
                    <option>(GMT+03:00) Riyadh</option>
                    <option>(GMT+04:00) Dubai</option>
                  </NativeSelect>
                </FieldFrame>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="About Me">
                <FieldFrame shape="area" border="control">
                  <Textarea
                    value={about}
                    maxLength={250}
                    onChange={(e) => setAbout(e.target.value)}
                    className="bg-transparent"
                  />
                </FieldFrame>
                <p className="mt-1 text-end text-caption text-ink-subtle">{about.length}/250</p>
              </Field>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
              {(() => {
                const Icon = SECTIONS.find((s) => s.key === section)!.icon;
                return <Icon className="size-6" aria-hidden="true" />;
              })()}
            </span>
            <p className="text-h4 text-ink">{SECTIONS.find((s) => s.key === section)!.label}</p>
            <p className="max-w-sm text-body-sm text-ink-subtle">
              These settings will be available soon. Use the panels on the right to manage the most
              common preferences for now.
            </p>
          </div>
        )}
      </section>

      {/* Rail */}
      <aside className="space-y-6 xl:col-start-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
            Security
          </h2>
          <ul className="mt-4 space-y-1">
            <RowButton icon={KeyRound} label="Change Password" />
            <li className="flex items-center justify-between gap-3 px-2 py-2.5">
              <span className="inline-flex items-center gap-3 text-body-sm text-ink">
                <Smartphone className="size-4 text-ink-subtle" aria-hidden="true" />
                Two-Factor Authentication (2FA)
              </span>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} aria-label="Two-factor authentication" />
            </li>
            <RowButton icon={Laptop} label="Active Sessions" />
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Bell className="size-5 text-primary" aria-hidden="true" />
            Preferences
          </h2>
          <ul className="mt-4 space-y-4">
            <PrefRow icon={Mail} label="Email Notifications" k="email" prefs={prefs} setPrefs={setPrefs} />
            <PrefRow icon={Bell} label="In-App Notifications" k="in-app" prefs={prefs} setPrefs={setPrefs} />
            <PrefRow icon={Megaphone} label="Marketing & Offers" k="marketing" prefs={prefs} setPrefs={setPrefs} />
            <PrefRow icon={GraduationCap} label="Course Recommendations" k="recommendations" prefs={prefs} setPrefs={setPrefs} />
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Globe className="size-5 text-primary" aria-hidden="true" />
            Language & Region
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-ink">Display Language</span>
              <select className="h-9 rounded-md border border-border-input bg-surface px-2 text-body-sm text-ink outline-none focus-visible:border-primary">
                <option>English</option>
                <option>العربية</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-ink">Region</span>
              <select className="h-9 rounded-md border border-border-input bg-surface px-2 text-body-sm text-ink outline-none focus-visible:border-primary">
                <option>Egypt</option>
                <option>Saudi Arabia</option>
                <option>UAE</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-danger/30 bg-danger-50/40 p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-danger">
            <Trash2 className="size-5" aria-hidden="true" />
            Danger Zone
          </h2>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-start hover:bg-danger-50"
          >
            <span>
              <span className="block text-body-sm font-semibold text-danger">Delete Account</span>
              <span className="block text-caption text-ink-subtle">
                Permanently delete your account and all data.
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-danger" aria-hidden="true" />
          </button>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      {children}
    </div>
  );
}

function RowButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-body-sm text-ink hover:bg-surface-alt"
      >
        <span className="inline-flex items-center gap-3">
          <Icon className="size-4 text-ink-subtle" aria-hidden="true" />
          {label}
        </span>
        <ChevronRight className="size-4 text-ink-subtle" aria-hidden="true" />
      </button>
    </li>
  );
}

function PrefRow({
  icon: Icon,
  label,
  k,
  prefs,
  setPrefs,
}: {
  icon: LucideIcon;
  label: string;
  k: PrefKey;
  prefs: Record<PrefKey, boolean>;
  setPrefs: React.Dispatch<React.SetStateAction<Record<PrefKey, boolean>>>;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-3 text-body-sm text-ink">
        <Icon className="size-4 text-ink-subtle" aria-hidden="true" />
        {label}
      </span>
      <Switch
        checked={prefs[k]}
        aria-label={label}
        onCheckedChange={(next) => setPrefs((p) => ({ ...p, [k]: next }))}
      />
    </li>
  );
}
