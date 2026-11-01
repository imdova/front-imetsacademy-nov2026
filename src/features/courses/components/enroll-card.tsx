import Link from "next/link";
import {
  ArrowRight,
  Award,
  ClipboardCheck,
  Clock,
  Headphones,
  Infinity as InfinityIcon,
  Monitor,
  ShoppingCart,
  Video,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CourseWithRelations } from "@/features/courses/schemas";
import { PriceTag } from "@/features/courses/components/price-tag";

/** Enrollment card for the course page (offer, price, enroll, what's included, add to cart). */
export function EnrollCard({ course }: { course: CourseWithRelations }) {
  const includes = [
    { icon: Clock, label: `${course.durationMonths} Months Duration` },
    { icon: Video, label: `${course.sessions} Live Sessions` },
    { icon: Monitor, label: "Live Interactive Sessions on Zoom" },
    { icon: ClipboardCheck, label: "Practice Questions & Mock Exams" },
    { icon: Award, label: "Certificate of Completion" },
    { icon: InfinityIcon, label: "Lifetime Access to Materials" },
    { icon: Headphones, label: "Dedicated Support" },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-lg">
      {course.discountPercent != null && (
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent-50 px-3 py-1 text-caption font-semibold text-accent-text">
            <Clock className="size-3.5" aria-hidden="true" />
            Limited Time Offer
          </span>
          <Badge variant="discount">{course.discountPercent}% OFF</Badge>
        </div>
      )}

      <PriceTag price={course.price} oldPrice={course.oldPrice} size="lg" />

      <Button asChild size="lg" block>
        <Link href={routes.register}>
          Enroll Now
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>

      <ul className="space-y-2.5 border-t border-border pt-4">
        {includes.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-body-sm text-ink-muted">
            <item.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>

      <Button asChild variant="outline-primary" size="lg" block>
        <Link href={routes.contact}>
          <ShoppingCart className="size-4" aria-hidden="true" />
          Add to Cart
        </Link>
      </Button>
    </div>
  );
}
