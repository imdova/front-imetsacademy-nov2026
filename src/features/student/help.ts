import "server-only";
import { delay } from "@/lib/delay";

/* Help center mock data (UI preview; replaced by the backend later). */

export type HelpCategoryKey =
  | "courses"
  | "payments"
  | "certificates"
  | "account"
  | "technical";

export type HelpCategory = {
  key: HelpCategoryKey;
  title: string;
  description: string;
};

export type FaqItem = { id: string; question: string; answer: string };

const categories: HelpCategory[] = [
  {
    key: "courses",
    title: "Courses & Learning",
    description: "Access courses, progress, and completion",
  },
  {
    key: "payments",
    title: "Payments & Billing",
    description: "Payments, invoices, refunds, and pricing",
  },
  {
    key: "certificates",
    title: "Certificates",
    description: "Download, verify, and share your certificates",
  },
  {
    key: "account",
    title: "Account & Profile",
    description: "Login, profile settings, and security",
  },
  {
    key: "technical",
    title: "Technical Issues",
    description: "Player, access, and platform problems",
  },
];

const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "How do I access my course after enrollment?",
    answer:
      "After a successful payment, go to My Courses from the left menu. You’ll find your enrolled course there. Click “Continue Learning” to start.",
  },
  {
    id: "f2",
    question: "How can I download my certificate?",
    answer:
      "Open the Certificates page, select the certificate you want, and click “Download Certificate (PDF)”. You can also share it directly to LinkedIn.",
  },
  {
    id: "f3",
    question: "Which payment methods are accepted?",
    answer:
      "We accept Visa, Mastercard, and PayPal. You can manage your saved payment methods from the Payments page.",
  },
  {
    id: "f4",
    question: "Can I get a refund?",
    answer:
      "You can request a refund within 14 days of purchase if you haven’t completed more than 25% of the course. Contact support to start a request.",
  },
  {
    id: "f5",
    question: "How do I update my profile information?",
    answer:
      "Go to Settings → Account Settings to update your name, contact details, and bio. Remember to click “Save Changes”.",
  },
  {
    id: "f6",
    question: "I’m facing an issue with the video player. What should I do?",
    answer:
      "Try refreshing the page and checking your connection. If the problem continues, clear your browser cache or open a support ticket and our team will help.",
  },
];

export async function getHelpCenter(): Promise<{
  categories: HelpCategory[];
  faqs: FaqItem[];
}> {
  await delay();
  return structuredClone({ categories, faqs });
}
