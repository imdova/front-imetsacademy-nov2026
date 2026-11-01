"use client";

import { useState } from "react";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type Control,
} from "react-hook-form";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FileText,
  GripVertical,
  Link2,
  Play,
  Plus,
  Trash2,
  Video,
  CircleHelp,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type CreateCourseForm,
  type MaterialType,
} from "@/features/courses/wizard-schema";
import { cn } from "@/lib/utils";

type FormControl = Control<CreateCourseForm>;

const MATERIAL_BUTTONS: { type: MaterialType; label: string; icon: typeof Video }[] = [
  { type: "video", label: "Video", icon: Video },
  { type: "pdf", label: "PDF", icon: FileText },
  { type: "file", label: "File", icon: Paperclip },
  { type: "link", label: "Link", icon: Link2 },
  { type: "quiz", label: "Quiz", icon: CircleHelp },
];
const materialIcon: Record<MaterialType, typeof Video> = {
  video: Video,
  pdf: FileText,
  file: Paperclip,
  link: Link2,
  quiz: CircleHelp,
};

const inputClass =
  "h-11 w-full rounded-md border border-border-input bg-surface px-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";

/* ----------------------------------------------------------- module row --- */

function ModuleRow({
  id,
  index,
  control,
  active,
  onSelect,
  onRemove,
  canRemove,
}: {
  id: string;
  index: number;
  control: FormControl;
  active: boolean;
  onSelect: () => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const title = useWatch({ control, name: `curriculum.${index}.title` });
  const lessons = useWatch({ control, name: `curriculum.${index}.lessons` });
  const count = Array.isArray(lessons) ? lessons.length : 0;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-md border bg-surface p-2",
        active ? "border-primary bg-primary-50" : "border-border",
        isDragging && "opacity-60 shadow-md",
      )}
    >
      <button
        type="button"
        aria-label="Reorder module"
        className="cursor-grab text-ink-subtle hover:text-ink"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={onSelect} className="flex min-w-0 flex-1 items-center gap-2 text-start">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-pill text-caption font-bold",
            active ? "bg-primary text-on-dark" : "bg-primary-50 text-primary",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-body-sm font-semibold text-ink">
            {title || "Untitled module"}
          </span>
          <span className="block text-caption text-ink-subtle">{count} Lessons</span>
        </span>
      </button>
      {canRemove && (
        <button
          type="button"
          aria-label="Delete module"
          onClick={onRemove}
          className="text-ink-subtle hover:text-danger"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- lesson row --- */

function LessonRow({
  id,
  moduleIndex,
  lessonIndex,
  onRemove,
}: {
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  onRemove: () => void;
}) {
  const { register } = useFormContext<CreateCourseForm>();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-surface p-2",
        isDragging && "opacity-60 shadow-md",
      )}
    >
      <button
        type="button"
        aria-label="Reorder lesson"
        className="cursor-grab text-ink-subtle hover:text-ink"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
      <Play className="size-4 shrink-0 fill-primary text-primary" aria-hidden="true" />
      <span className="shrink-0 text-caption text-ink-subtle">
        {moduleIndex + 1}.{lessonIndex + 1}
      </span>
      <input
        {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.title`)}
        placeholder="Lesson title"
        aria-label="Lesson title"
        className={cn(inputClass, "h-9 flex-1")}
      />
      <input
        type="number"
        min={1}
        {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.durationMin`, {
          valueAsNumber: true,
        })}
        aria-label="Duration in minutes"
        className={cn(inputClass, "h-9 w-20")}
      />
      <span className="shrink-0 text-caption text-ink-subtle">min</span>
      <button
        type="button"
        aria-label="Delete lesson"
        onClick={onRemove}
        className="text-ink-subtle hover:text-danger"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

/* --------------------------------------------------------- module editor --- */

function ModuleEditor({ moduleIndex, control }: { moduleIndex: number; control: FormControl }) {
  const { register, formState } = useFormContext<CreateCourseForm>();
  const lessons = useFieldArray({ control, name: `curriculum.${moduleIndex}.lessons` });
  const materials = useFieldArray({ control, name: `curriculum.${moduleIndex}.materials` });
  const description = useWatch({ control, name: `curriculum.${moduleIndex}.description` }) ?? "";

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = lessons.fields.findIndex((f) => f.id === active.id);
    const to = lessons.fields.findIndex((f) => f.id === over.id);
    if (from !== -1 && to !== -1) lessons.move(from, to);
  }

  const titleError = formState.errors.curriculum?.[moduleIndex]?.title?.message;

  return (
    <div className="space-y-5 rounded-xl border border-border bg-surface p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-body-sm font-medium text-ink" htmlFor={`mod-title-${moduleIndex}`}>
            Module Title <span className="text-danger">*</span>
          </label>
          <input
            id={`mod-title-${moduleIndex}`}
            {...register(`curriculum.${moduleIndex}.title`)}
            placeholder="e.g. Introduction to Strategic Management"
            className={inputClass}
          />
          {titleError && <p className="text-xs text-danger">{titleError}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-body-sm font-medium text-ink"
            htmlFor={`mod-desc-${moduleIndex}`}
          >
            Module Description <span className="text-ink-subtle">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              id={`mod-desc-${moduleIndex}`}
              {...register(`curriculum.${moduleIndex}.description`)}
              maxLength={300}
              rows={2}
              placeholder="A short overview of this module."
              className={cn(inputClass, "h-auto resize-y py-2")}
            />
            <span className="absolute end-2 bottom-1 text-caption text-ink-subtle">
              {description.length} / 300
            </span>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Play className="size-4 text-primary" aria-hidden="true" />
            Lessons ({lessons.fields.length})
          </h3>
          <Button
            type="button"
            size="sm"
            onClick={() => lessons.append({ title: "", durationMin: 10 })}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add Lesson
          </Button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={lessons.fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {lessons.fields.map((f, li) => (
                <LessonRow
                  key={f.id}
                  id={f.id}
                  moduleIndex={moduleIndex}
                  lessonIndex={li}
                  onRemove={() => lessons.fields.length > 1 && lessons.remove(li)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Learning materials */}
      <div className="rounded-lg border border-dashed border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink">
              <Plus className="size-4 text-primary" aria-hidden="true" />
              Add Learning Material <span className="font-normal text-ink-subtle">(Optional)</span>
            </p>
            <p className="text-caption text-ink-subtle">
              Attach videos, PDFs, resources or external links.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {MATERIAL_BUTTONS.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => materials.append({ type, label: `New ${label}` })}
                className="inline-flex items-center gap-1.5 rounded-md border border-border-input px-3 py-2 text-caption font-semibold text-ink-muted hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
        {materials.fields.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {materials.fields.map((m, mi) => {
              const Icon = materialIcon[m.type];
              return (
                <li
                  key={m.id}
                  className="inline-flex items-center gap-2 rounded-pill bg-primary-50 px-3 py-1 text-caption text-primary"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {m.label}
                  <button
                    type="button"
                    aria-label="Remove material"
                    onClick={() => materials.remove(mi)}
                    className="hover:text-danger"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- builder --- */

export function CurriculumBuilder() {
  const { control, formState } = useFormContext<CreateCourseForm>();
  const { fields, append, remove, move } = useFieldArray({ control, name: "curriculum" });
  const [activeIndex, setActiveIndex] = useState(0);
  const clampedActive = Math.min(Math.max(activeIndex, 0), Math.max(fields.length - 1, 0));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = fields.findIndex((f) => f.id === active.id);
    const to = fields.findIndex((f) => f.id === over.id);
    if (from !== -1 && to !== -1) move(from, to);
  }

  function addModule() {
    append({ title: "", description: "", lessons: [{ title: "", durationMin: 10 }], materials: [] });
    setActiveIndex(fields.length); // the new module is appended at the end
  }

  const rootError =
    typeof formState.errors.curriculum?.message === "string"
      ? formState.errors.curriculum.message
      : undefined;

  return (
    <div className="space-y-4">
      {rootError && (
        <p role="alert" className="rounded-md bg-danger-50 px-4 py-2 text-body-sm text-danger">
          {rootError}
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-ink">Curriculum</h2>
            <span className="text-caption text-ink-subtle">{fields.length} Modules</span>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {fields.map((f, i) => (
                  <ModuleRow
                    key={f.id}
                    id={f.id}
                    index={i}
                    control={control}
                    active={i === clampedActive}
                    canRemove={fields.length > 1}
                    onSelect={() => setActiveIndex(i)}
                    onRemove={() => {
                      remove(i);
                      setActiveIndex((a) => Math.max(0, Math.min(a, fields.length - 2)));
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <Button type="button" variant="outline" block onClick={addModule}>
            <Plus className="size-4" aria-hidden="true" />
            Add Module
          </Button>
        </div>

        {fields[clampedActive] && <ModuleEditor moduleIndex={clampedActive} control={control} />}
      </div>
    </div>
  );
}
