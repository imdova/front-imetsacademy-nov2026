import { Clock, Monitor, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CourseModule } from "@/features/courses/schemas";

/** Module → lesson curriculum. Module rows on primary-50; first module open. */
export function CurriculumAccordion({ modules }: { modules: CourseModule[] }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["module-0"]}
      className="flex flex-col gap-2"
    >
      {modules.map((module, mi) => (
        <AccordionItem key={module.title} value={`module-${mi}`}>
          <AccordionTrigger>
            <span className="flex-1">{module.title}</span>
            <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-muted">
              <Monitor className="size-4" aria-hidden="true" />
              {module.lessons.length} Sessions
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {module.lessons.map((lesson) => (
                <li
                  key={lesson.code}
                  className="flex items-center gap-3 border-b border-border py-2.5 pe-4 ps-[52px] text-body-sm text-ink"
                >
                  <Play className="size-4 shrink-0 fill-primary text-primary" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="text-ink-subtle">{lesson.code}</span> {lesson.title}
                  </span>
                  <small className="inline-flex shrink-0 items-center gap-1 text-caption text-ink-subtle">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {lesson.durationMin} min
                  </small>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
