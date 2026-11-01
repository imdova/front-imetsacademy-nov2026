"use client";

import { useId } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { ChevronDown, Phone } from "lucide-react";
import { FieldFrame } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DIAL_CODES } from "@/features/auth/schemas";

export function PhoneField<T extends FieldValues>({
  control,
  dialName,
  phoneName,
  label,
  placeholder,
}: {
  control: Control<T>;
  dialName: FieldPath<T>;
  phoneName: FieldPath<T>;
  label: string;
  placeholder: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const dial = useController({ control, name: dialName });
  const phone = useController({ control, name: phoneName });
  const hasError = Boolean(phone.fieldState.error);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <FieldFrame border="control" state={hasError ? "error" : "default"}>
        <Phone className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
        <span className="relative inline-flex shrink-0 items-center">
          <select
            {...dial.field}
            value={String(dial.field.value ?? "")}
            onChange={(e) => dial.field.onChange(e.target.value)}
            aria-label="Country code"
            className="cursor-pointer appearance-none bg-transparent pe-5 text-body-sm text-ink outline-none"
          >
            {DIAL_CODES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute end-0 size-4 text-ink-subtle" aria-hidden="true" />
        </span>
        <span className="h-5 w-px shrink-0 bg-border" aria-hidden="true" />
        <Input
          {...phone.field}
          id={id}
          type="tel"
          placeholder={placeholder}
          autoComplete="tel"
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
      </FieldFrame>
      {hasError && (
        <p id={errorId} className="text-xs text-danger">
          {phone.fieldState.error?.message}
        </p>
      )}
    </div>
  );
}
