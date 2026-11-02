"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { TextField } from "@/components/shared/form/text-field";
import { GoogleIcon } from "@/components/icons/google-icon";
import { LinkedInIcon } from "@/components/icons/social-icons";
import { signInSchema, type SignInValues } from "@/features/auth/schemas";
import { signInAction } from "@/features/auth/actions";
import { PasswordField } from "@/features/auth/components/password-field";

export function SignInForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState<string | null>(null);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onBlur",
  });

  function onSubmit(values: SignInValues) {
    setNote(null);
    startTransition(async () => {
      const res = await signInAction(values);
      setNote(res.message);
      if (res.ok && res.redirect) {
        router.push(res.redirect);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-5 p-8 md:p-10">
      <Logo priority />
      <div>
        <h1 className="text-h1 text-ink">Sign In to Your Account</h1>
        <p className="text-body mt-2 text-ink-muted">
          Access your courses, certificates, and more.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <TextField
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="Email Address"
          type="email"
          autoComplete="email"
          icon={<Mail className="size-5" aria-hidden="true" />}
        />
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-body-sm text-ink-muted">
            <input
              type="checkbox"
              {...form.register("remember")}
              className="size-4 rounded border-border-input accent-[var(--color-primary)]"
            />
            Remember me
          </label>
          <Link href="#" className="text-body-sm font-semibold text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
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
              Signing in…
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-caption text-ink-subtle">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        Or continue with
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" onClick={() => setNote("Social sign-in is coming soon.")}>
          <GoogleIcon className="size-5" />
          Google
        </Button>
        <Button type="button" variant="outline" onClick={() => setNote("Social sign-in is coming soon.")}>
          <LinkedInIcon className="size-5 text-[#0A66C2]" />
          LinkedIn
        </Button>
      </div>

      <p className="text-body-sm text-center text-ink-muted">
        Don&apos;t have an account?{" "}
        <Link href={routes.register} className="font-semibold text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </div>
  );
}
