"use client";

import { useRef } from "react";
import { type Control, type FieldValues, type Path, useController } from "react-hook-form";
import { ImageUp, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

/** Course thumbnail uploader (reads the file to a data URL for preview; dev-only). */
export function ThumbnailField<T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
}) {
  const { field } = useController({ control, name });
  const inputRef = useRef<HTMLInputElement>(null);
  const value = typeof field.value === "string" ? field.value : "";

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => field.onChange(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        {label}
        <span className="text-danger"> *</span>
      </Label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={label}
        onChange={handleFile}
      />
      {value ? (
        <div className="relative h-44 overflow-hidden rounded-md border border-border-input">
          {/* eslint-disable-next-line @next/next/no-img-element -- local data-URL preview */}
          <img src={value} alt="Course thumbnail preview" className="h-full w-full object-cover" />
          <div className="absolute end-2 bottom-2 flex gap-2">
            <button
              type="button"
              aria-label="Change image"
              onClick={() => inputRef.current?.click()}
              className="inline-flex size-9 items-center justify-center rounded-md bg-surface text-ink shadow-sm hover:text-primary"
            >
              <Pencil className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => field.onChange("")}
              className="inline-flex size-9 items-center justify-center rounded-md bg-surface text-danger shadow-sm hover:bg-danger-50"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-44 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border-input text-ink-subtle transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ImageUp className="size-7" aria-hidden="true" />
          <span className="text-body-sm font-medium">Drag an image here or choose a file</span>
          <span className="text-caption">JPG, PNG · Recommended 1200 × 675</span>
        </button>
      )}
    </div>
  );
}
