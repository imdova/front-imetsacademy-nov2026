import "server-only";
import { delay } from "@/lib/delay";

/* Student certificates mock data (UI preview; replaced by the backend later). */

export type Certificate = {
  id: string;
  title: string;
  kind: "course" | "program";
  type: string;
  completed: string;
  distinction: boolean;
  certId: string;
  grade: string;
};

export type CertificateStats = {
  earned: number;
  completed: number;
  distinction: number;
  latest: string;
};

const certificates: Certificate[] = [
  {
    id: "c1",
    title: "Strategic Management",
    kind: "course",
    type: "Business Course",
    completed: "Oct 28, 2026",
    distinction: true,
    certId: "IMETS-SM-2026-10432",
    grade: "With Distinction",
  },
  {
    id: "c2",
    title: "Business Analytics",
    kind: "course",
    type: "Business Course",
    completed: "Oct 20, 2026",
    distinction: false,
    certId: "IMETS-BA-2026-10418",
    grade: "Pass",
  },
  {
    id: "c3",
    title: "Digital Transformation for Business",
    kind: "course",
    type: "Business Course",
    completed: "Oct 10, 2026",
    distinction: true,
    certId: "IMETS-DT-2026-10395",
    grade: "With Distinction",
  },
  {
    id: "c4",
    title: "Leadership & Team Management",
    kind: "course",
    type: "Business Course",
    completed: "Sep 28, 2026",
    distinction: false,
    certId: "IMETS-LM-2026-10376",
    grade: "Pass",
  },
  {
    id: "c5",
    title: "Project Management Fundamentals",
    kind: "program",
    type: "Professional Program",
    completed: "Sep 18, 2026",
    distinction: false,
    certId: "IMETS-PM-2026-10354",
    grade: "Pass",
  },
  {
    id: "c6",
    title: "Executive Business Leadership",
    kind: "program",
    type: "Professional Program",
    completed: "Aug 30, 2026",
    distinction: false,
    certId: "IMETS-EL-2026-10321",
    grade: "Pass",
  },
];

const stats: CertificateStats = {
  earned: 6,
  completed: 4,
  distinction: 2,
  latest: "Oct 28, 2026",
};

export async function getCertificates(): Promise<{
  items: Certificate[];
  stats: CertificateStats;
}> {
  await delay();
  return structuredClone({ items: certificates, stats });
}
