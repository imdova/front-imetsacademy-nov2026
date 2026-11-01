import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  CreditCard,
  GraduationCap,
  Headphones,
  Laptop,
  Mail,
  MessageCircle,
  MessagesSquare,
  Search,
  Ticket,
  User,
  Award,
  type LucideIcon,
} from "lucide-react";
import { getHelpCenter, type HelpCategoryKey } from "@/features/student/help";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PortalHero } from "@/features/student/components/portal-hero";

export const metadata: Metadata = { title: "Help & Support" };

const CATEGORY_ICON: Record<HelpCategoryKey, LucideIcon> = {
  courses: GraduationCap,
  payments: CreditCard,
  certificates: Award,
  account: User,
  technical: Laptop,
};

export default async function HelpPage() {
  const { categories, faqs } = await getHelpCenter();

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <PortalHero
        title="Help & Support"
        subtitle="Find answers, get help, and contact our support team."
        icon={<Headphones className="size-28" aria-hidden="true" />}
      />

      {/* Search */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
        <label className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute start-4 size-5 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">Search help articles</span>
          <input
            type="search"
            placeholder="Search help articles, guides, or common questions…"
            className="h-12 w-full rounded-lg border border-border-input bg-surface-alt ps-12 pe-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50"
          />
        </label>
        <Button size="lg" className="shrink-0">
          Search
        </Button>
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => {
          const Icon = CATEGORY_ICON[c.key];
          return (
            <button
              key={c.key}
              type="button"
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-5 text-center transition-colors hover:border-primary hover:shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-on-dark">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-body-sm font-bold text-ink">{c.title}</span>
              <span className="text-caption text-ink-subtle">{c.description}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ + contact */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-h3 text-ink">Frequently Asked Questions (FAQ)</h2>
            <button type="button" className="inline-flex shrink-0 items-center gap-1 text-body-sm font-semibold text-primary hover:underline">
              View All FAQs
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          <Accordion type="single" collapsible defaultValue={faqs[0]?.id} className="space-y-2">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="rounded-lg border border-border px-4">
                <AccordionTrigger className="text-body font-semibold text-ink">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-body-sm text-ink-muted">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl bg-linear-to-br from-primary to-primary-hover p-6 text-on-dark">
            <Ticket className="size-7" aria-hidden="true" />
            <h2 className="mt-3 text-h4 text-on-dark">Submit a Support Ticket</h2>
            <p className="mt-1 text-body-sm text-on-dark/80">
              Can’t find the answer? Create a ticket and our team will get back to you.
            </p>
            <Button variant="accent" className="mt-4">
              Create Ticket
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-h3 text-ink">Contact Us</h2>
            <ul className="mt-4 space-y-4">
              <ContactRow
                icon={Mail}
                title="Email Support"
                meta="support@imets.academy"
                action="Send Email"
              />
              <ContactRow
                icon={MessageCircle}
                title="WhatsApp Support"
                meta="+20 100 123 4567"
                action="Chat on WhatsApp"
              />
              <ContactRow
                icon={MessagesSquare}
                title="Live Chat"
                meta="Chat with our support team now."
                action="Start Chat"
              />
            </ul>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-surface-alt p-4">
              <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-body-sm font-bold text-ink">Support Hours</p>
                <p className="text-caption text-ink-subtle">Sat – Thu, 9:00 AM – 8:00 PM (Cairo Time)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  title,
  meta,
  action,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  action: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-body-sm font-bold text-ink">{title}</p>
        <p className="truncate text-caption text-ink-subtle">{meta}</p>
      </div>
      <button type="button" className="inline-flex shrink-0 items-center gap-1 text-body-sm font-semibold text-primary hover:underline">
        {action}
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </button>
    </li>
  );
}
