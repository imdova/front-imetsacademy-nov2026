"use client";

import { useId, useState } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldFrame } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  autoComplete,
}: {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  autoComplete?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [show, setShow] = useState(false);
  const { field, fieldState } = useController({ control, name });
  const hasError = Boolean(fieldState.error);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <FieldFrame border="control" state={hasError ? "error" : "default"}>
        <Lock className="size-5 shrink-0 text-ink-subtle" aria-hidden="true" />
        <Input
          {...field}
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="shrink-0 text-ink-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {show ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
        </button>
      </FieldFrame>
      {hasError && (
        <p id={errorId} className="text-xs text-danger">
          {fieldState.error?.message}
        </p>
      )}
    </div>
  );
}
