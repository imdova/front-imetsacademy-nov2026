/* Admin → CRM mock data (UI preview; replaced by the backend). Client-safe. */

export type LeadStatus = "new" | "contacted" | "qualified" | "followup" | "enrolled" | "archived";
export type LeadSource = "meta" | "website" | "whatsapp" | "referral" | "email" | "google";

export type Lead = {
  id: string;
  name: string;
  role: string;
  initials: string;
  phone: string;
  email: string;
  interestedIn: string;
  source: LeadSource;
  score: number;
  status: LeadStatus;
  owner: string;
  updated: string;
  location: string;
};

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  followup: "Follow-up",
  enrolled: "Enrolled",
  archived: "Archived",
};

function initials(n: string) {
  return n.split(" ").slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

type Seed = [name: string, role: string, phone: string, email: string, course: string, source: LeadSource, score: number, status: LeadStatus, owner: string, updated: string];
const SEED: Seed[] = [
  ["Sara Ahmed", "Marketing Manager", "+20 100 123 4567", "sara.ahmed@mail.com", "Strategic Management Dip.", "meta", 92, "qualified", "Ahmed Saleh", "10 min ago"],
  ["Mohamed Ali", "Operations Lead", "+20 106 789 0123", "m.ali@mail.com", "Business Analytics", "website", 88, "contacted", "Mona Nabil", "25 min ago"],
  ["Nourhan Adel", "Product Manager", "+966 55 987 6543", "nourhan@mail.com", "Leadership Dip.", "whatsapp", 85, "followup", "Ahmed Saleh", "40 min ago"],
  ["Khaled Omar", "Finance Analyst", "+20 109 321 4567", "khaled@mail.com", "Project Management", "referral", 78, "new", "Sara Fouad", "1 hour ago"],
  ["Hany Mostafa", "Sales Director", "+966 50 123 9876", "hany@mail.com", "Strategic Management Dip.", "email", 76, "qualified", "Mona Nabil", "2 hours ago"],
  ["Rania Salem", "HR Specialist", "+20 101 456 7890", "rania@mail.com", "HR Management Dip.", "meta", 73, "contacted", "Ahmed Saleh", "2 hours ago"],
  ["Mona Hussein", "Business Consultant", "+20 101 457 6543", "mona@mail.com", "Business Analytics", "google", 71, "followup", "Sara Fouad", "3 hours ago"],
  ["Yasmine Ali", "Operations Manager", "+966 56 654 3210", "yasmine@mail.com", "Leadership Dip.", "whatsapp", 69, "new", "Mona Nabil", "4 hours ago"],
  ["Amr Gamal", "Project Lead", "+20 102 111 2233", "amr@mail.com", "Project Management", "website", 66, "contacted", "Ahmed Saleh", "5 hours ago"],
  ["Dina Adel", "Finance Manager", "+20 103 444 5566", "dina@mail.com", "Business Analytics", "referral", 64, "qualified", "Sara Fouad", "6 hours ago"],
];

export const LEADS: Lead[] = SEED.map(([name, role, phone, email, course, source, score, status, owner, updated], i) => ({
  id: `LEAD-${4001 + i}`,
  name,
  role,
  initials: initials(name),
  phone,
  email,
  interestedIn: course,
  source,
  score,
  status,
  owner,
  updated,
  location: "Cairo, Egypt",
}));

export const CRM_KPIS = {
  totalLeads: "2,842",
  totalLeadsTrend: "+18%",
  qualifiedLeads: "1,126",
  qualifiedTrend: "+22%",
  enrollments: "486",
  enrollmentsTrend: "+27%",
  totalRevenue: "$78,420",
  revenueTrend: "+32%",
  activeInstallments: "212",
  outstanding: "$24,360",
};

export const LEAD_KPIS = {
  total: "2,842",
  totalTrend: "+18%",
  new: "1,040",
  newTrend: "+24%",
  contacted: "628",
  contactedTrend: "+17%",
  qualified: "312",
  qualifiedTrend: "+22%",
  enrolled: "486",
  enrolledTrend: "+27%",
  conversion: "17.1%",
  conversionTrend: "+4.3 pp",
};

export type PipelineColumn = { key: string; title: string; count: number; tint: string; extra: number; leads: { name: string; course: string; meta: string; won?: boolean }[] };
export const PIPELINE: PipelineColumn[] = [
  { key: "new", title: "New Leads", count: 1040, tint: "bg-surface-alt", extra: 1038, leads: [{ name: "Sara Ahmed", course: "Strategic Management", meta: "2h ago" }, { name: "Mohamed Ali", course: "Business Analytics", meta: "3h ago" }] },
  { key: "contacted", title: "Contacted", count: 628, tint: "bg-primary-50", extra: 626, leads: [{ name: "Nourhan Adel", course: "Leadership Dip.", meta: "1d ago" }, { name: "Ahmed Farid", course: "Strategic Management", meta: "1d ago" }] },
  { key: "qualified", title: "Qualified", count: 312, tint: "bg-orange-50", extra: 310, leads: [{ name: "Hany Mostafa", course: "Operations Mgmt.", meta: "2d ago" }, { name: "Rania Salem", course: "Business Analytics", meta: "2d ago" }] },
  { key: "proposal", title: "Proposal / Follow-up", count: 196, tint: "bg-violet-50", extra: 194, leads: [{ name: "Khaled Omar", course: "Operations Mgmt.", meta: "3d ago" }, { name: "Mona Hussein", course: "Strategic Management", meta: "3d ago" }] },
  { key: "won", title: "Won (Enrolled)", count: 486, tint: "bg-success-50", extra: 484, leads: [{ name: "Amr Hassan", course: "Strategic Management", meta: "", won: true }, { name: "Yasmine Ali", course: "Leadership Dip.", meta: "", won: true }] },
];

export const REVENUE_TREND = [
  { label: "May", revenue: 12000, enrollments: 150 },
  { label: "Jun", revenue: 16000, enrollments: 210 },
  { label: "Jul", revenue: 19000, enrollments: 235 },
  { label: "Aug", revenue: 25000, enrollments: 320 },
  { label: "Sep", revenue: 33000, enrollments: 385 },
  { label: "Oct", revenue: 42000, enrollments: 460 },
];

export const MARKETING = [
  { label: "Meta", leads: "3,850", trend: "+24%" },
  { label: "Google", leads: "1,420", trend: "+18%" },
  { label: "WhatsApp", leads: "618", trend: "+32%" },
  { label: "Email", leads: "296", trend: "+15%" },
];

export const PAYMENTS_SUMMARY = { total: "$78,420", paid: "$54,060", outstanding: "$24,360", paidPct: 69, outstandingPct: 31 };
