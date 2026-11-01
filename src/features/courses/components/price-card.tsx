import Link from "next/link";
import { ArrowRight, Headphones, Pencil } from "lucide-react";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Badge, Dot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import type { CourseWithRelations } from "@/features/courses/schemas";
import { PriceTag } from "@/features/courses/components/price-tag";

/** Enrollment card for the course page (floats over the hero, sticky on scroll). */
export function PriceCard({ course }: { course: CourseWithRelations }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 shadow-lg">
      {course.registrationOpen && (
        <Badge variant="success" className="self-start">
          <Dot />
          Registration Open
        </Badge>
      )}

      <p className="text-body-sm text-ink-muted">Course Fee</p>

      <div className="flex items-center justify-between gap-2">
        <PriceTag price={course.price} oldPrice={course.oldPrice} size="lg" />
        {course.discountPercent != null && (
          <Badge variant="discount">{course.discountPercent}% OFF</Badge>
        )}
      </div>

      <Button asChild size="lg" block className="mt-1">
        <Link href={routes.register}>
          <Pencil className="size-4" aria-hidden="true" />
          Register Now
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>

      <Button asChild variant="outline-primary" size="lg" block>
        <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noreferrer noopener">
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Chat on WhatsApp
        </a>
      </Button>

      <p className="mt-1 flex gap-3 text-[13px] leading-[18px] text-ink-muted">
        <Headphones className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
        Our admissions team will contact you to confirm your registration and payment.
      </p>
    </div>
  );
}
