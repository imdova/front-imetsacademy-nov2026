"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle, Mail, User } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { TextField } from "@/components/shared/form/text-field";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas";
import { registerAction } from "@/features/auth/actions";
import { PasswordField } from "@/features/auth/components/password-field";
import { PhoneField } from "@/features/auth/components/phone-field";
import { JoinAsToggle } from "@/features/auth/components/join-as-toggle";

export function RegisterForm() {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState<string | null>(null);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      joinAs: "individual",
      fullName: "",
      email: "",
      dialCode: "+20",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    mode: "onBlur",
  });

  const agreeError = form.formState.errors.agree?.message;

  function onSubmit(values: RegisterValues) {
    setNote(null);
    startTransition(async () => {
      const res = await registerAction(values);
      setNote(res.message);
    });
  }

  return (
    <div className="flex flex-col gap-4 p-8 md:p-10">
      <Logo priority />
      <div>
        <h1 className="text-h1 text-ink">Create Your Account</h1>
        <p className="text-body mt-2 text-ink-muted">
          Join IMETS Academy and start your learning journey today.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <JoinAsToggle control={form.control} name="joinAs" label="I'm joining as a" />

        <TextField
          control={form.control}
          name="fullName"
          label="Full Name"
          placeholder="Full Name *"
          autoComplete="name"
          icon={<User className="size-5" aria-hidden="true" />}
        />
        <TextField
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="Email Address *"
          type="email"
          autoComplete="email"
          icon={<Mail className="size-5" aria-hidden="true" />}
        />
        <PhoneField
          control={form.control}
          dialName="dialCode"
          phoneName="phone"
          label="Phone Number"
          placeholder="Phone Number *"
        />
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password *"
          autoComplete="new-password"
        />
        <PasswordField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password *"
          autoComplete="new-password"
        />

        <div>
          <label className="flex items-start gap-2 text-body-sm text-ink-muted">
            <input
              type="checkbox"
              {...form.register("agree")}
              className="mt-0.5 size-4 rounded border-border-input accent-[var(--color-primary)]"
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="font-semibold text-primary">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold text-primary">
                Privacy Policy
              </Link>
            </span>
          </label>
          {agreeError && <p className="mt-1 text-xs text-danger">{agreeError}</p>}
        </div>

        {note && (
          <p role="status" className="rounded-md bg-primary-50 px-4 py-2 text-body-sm text-primary">
            {note}
          </p>
        )}

        <Button type="submit" size="lg" block disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>

      <p className="text-body-sm text-center text-ink-muted">
        Already have an account?{" "}
        <Link href={routes.signIn} className="font-semibold text-primary hover:text-primary-hover">
          Sign In
        </Link>
      </p>
    </div>
  );
}
