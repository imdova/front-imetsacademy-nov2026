"use client";

import { type ReactNode, useId } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { FieldFrame } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import { Label } from "@/components/ui/label";

export type SelectOption = { label: string; value: string };

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: ReactNode;
  showLabel?: boolean;
};

/** RHF native-select field with leading icon and trailing chevron. */
export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  icon,
  showLabel = false,
}: SelectFieldProps<T>) {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });
  const hasError = Boolean(fieldState.error);
  const isPlaceholder = !field.value;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className={showLabel ? undefined : "sr-only"}>
        {label}
      </Label>
      <FieldFrame border="control" state={hasError ? "error" : "default"}>
        {icon && <span className="flex shrink-0 text-ink-subtle">{icon}</span>}
        <NativeSelect
          {...field}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={isPlaceholder ? "text-ink-subtle" : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect>
        <ChevronDown className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
      </FieldFrame>
      {hasError && (
        <p id={errorId} className="text-xs text-danger">
          {fieldState.error?.message}
        </p>
      )}
    </div>
  );
}
