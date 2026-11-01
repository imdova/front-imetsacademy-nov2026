"use client";

import { type ReactNode, useId } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { FieldFrame } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  autoComplete?: string;
  /** Show the label visibly above the field instead of only to screen readers. */
  showLabel?: boolean;
};

/** RHF text field: labelled, icon-leading, with an inline error message. */
export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  autoComplete,
  showLabel = false,
}: TextFieldProps<T>) {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });
  const hasError = Boolean(fieldState.error);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className={showLabel ? undefined : "sr-only"}>
        {label}
      </Label>
      <FieldFrame border="control" state={hasError ? "error" : "default"}>
        {icon && <span className="flex shrink-0 text-ink-subtle">{icon}</span>}
        <Input
          {...field}
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
      </FieldFrame>
      {hasError && (
        <p id={errorId} className="text-xs text-danger">
          {fieldState.error?.message}
        </p>
      )}
    </div>
  );
}
