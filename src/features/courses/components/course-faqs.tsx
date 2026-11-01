"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// Common questions — shared across courses until per-course FAQs come from the backend.
const FAQS = [
  {
    q: "Who is this course for?",
    a: "Professionals, managers and team leaders who want practical, applicable skills — no prior academic background is required.",
  },
  {
    q: "How are the sessions delivered?",
    a: "All sessions are live and interactive on Zoom. Recordings are available afterwards so you can catch up any time.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. You'll receive an official IMETS Academy certificate of completion once you finish the program.",
  },
  {
    q: "What if I miss a live session?",
    a: "Every session is recorded and shared with enrolled learners, so you can watch it at your convenience.",
  },
  {
    q: "Is there any support during the course?",
    a: "Yes — you'll have direct Q&A with the instructor and dedicated support from our team throughout the program.",
  },
];

export function CourseFaqs() {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-3">
      {FAQS.map((faq, i) => (
        <AccordionPrimitive.Item
          key={faq.q}
          value={`faq-${i}`}
          className="overflow-hidden rounded-lg border border-border bg-surface"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-3 px-4 py-4 text-start text-body font-semibold text-ink hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {faq.q}
              <ChevronDown
                className="size-5 shrink-0 text-ink-subtle transition-transform group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="text-body-sm px-4 pb-4 text-ink-muted">{faq.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
