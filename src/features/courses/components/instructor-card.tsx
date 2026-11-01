import { Avatar } from "@/components/shared/avatar";
import { StarRating } from "@/components/shared/star-rating";
import type { Instructor } from "@/features/courses/schemas";
import { cn } from "@/lib/utils";

/** Instructor summary. `detailed` adds the bio (used in the Instructor tab). */
export function InstructorCard({
  instructor,
  detailed = false,
  className,
}: {
  instructor: Instructor;
  detailed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4", className)}>
      <Avatar initials={instructor.initials} size="lg" />
      <div className="space-y-1">
        <p className="text-h4 text-ink">{instructor.name}</p>
        <p className="text-body-sm text-ink-muted">{instructor.title}</p>
        <StarRating rating={instructor.rating} reviews={instructor.reviews} className="text-sm" />
        {detailed && <p className="text-body-sm pt-2 text-ink-muted">{instructor.bio}</p>}
      </div>
    </div>
  );
}
