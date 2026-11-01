"use client";

import { type ReactNode, useId } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { FieldFrame } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type TextareaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  maxLength?: number;
  rows?: number;
  showLabel?: boolean;
};

/** RHF textarea field with optional character counter (e.g. 0 / 500). */
export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  maxLength,
  rows = 5,
  showLabel = false,
}: TextareaFieldProps<T>) {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });
  const hasError = Boolean(fieldState.error);
  const length = typeof field.value === "string" ? field.value.length : 0;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className={showLabel ? undefined : "sr-only"}>
        {label}
      </Label>
      <FieldFrame shape="area" border="control" state={hasError ? "error" : "default"}>
        <div className="flex w-full gap-3">
          {icon && <span className="mt-0.5 flex shrink-0 text-ink-subtle">{icon}</span>}
          <Textarea
            {...field}
            id={id}
            rows={rows}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
          />
        </div>
        {typeof maxLength === "number" && (
          <span className="absolute end-3 bottom-2 text-xs text-ink-subtle">
            {length} / {maxLength}
          </span>
        )}
      </FieldFrame>
      {hasError && (
        <p id={errorId} className="text-xs text-danger">
          {fieldState.error?.message}
        </p>
      )}
    </div>
  );
}
