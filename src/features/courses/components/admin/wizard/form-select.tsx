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

type Option = { value: string | number; label: string };

/** Labelled select for the wizard. `numeric` stores the value as a number. */
export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  numeric = false,
  icon,
  required = false,
}: {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  numeric?: boolean;
  icon?: ReactNode;
  required?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });
  const hasError = Boolean(fieldState.error);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <FieldFrame state={hasError ? "error" : "default"}>
        {icon && <span className="flex shrink-0 text-ink-subtle">{icon}</span>}
        <NativeSelect
          {...field}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          value={field.value === undefined || field.value === null ? "" : String(field.value)}
          onChange={(e) => field.onChange(numeric ? Number(e.target.value) : e.target.value)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
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
