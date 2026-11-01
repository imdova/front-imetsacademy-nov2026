import type { Metadata } from "next";
import { Award, BarChart3, Calendar, GraduationCap, Star } from "lucide-react";
import { getCertificates } from "@/features/student/certificates";
import { getStudentProfile } from "@/features/student/data";
import { StatCard } from "@/components/shared/stat-card";
import { PortalHero } from "@/features/student/components/portal-hero";
import { CertificatesView } from "@/features/student/components/certificates-view";

export const metadata: Metadata = { title: "Certificates" };

export default async function CertificatesPage() {
  const [{ items, stats }, profile] = await Promise.all([getCertificates(), getStudentProfile()]);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <PortalHero
        title="My Certificates"
        subtitle="Your achievements and completed course certificates."
        icon={<GraduationCap className="size-28" aria-hidden="true" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Award className="size-5" />} label="Certificates Earned" value={stats.earned} tone="primary" />
        <StatCard icon={<BarChart3 className="size-5" />} label="Courses Completed" value={stats.completed} tone="teal" />
        <StatCard icon={<Star className="size-5" />} label="Certificates (with Distinction)" value={stats.distinction} tone="warm" />
        <StatCard icon={<Calendar className="size-5" />} label="Latest Certificate" value={stats.latest} tone="violet" />
      </div>

      <CertificatesView items={items} studentName={profile.name} />
    </div>
  );
}
