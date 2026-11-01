"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, CircleCheck, LoaderCircle, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/shared/form/text-field";
import { SelectField } from "@/components/shared/form/select-field";
import { TextareaField } from "@/components/shared/form/textarea-field";
import {
  contactFormSchema,
  INTEREST_OPTIONS,
  type ContactFormResult,
  type ContactFormValues,
} from "@/features/contact/schemas";
import { submitContactMessage } from "@/features/contact/actions";

const DEFAULTS: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactFormResult | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULTS,
    mode: "onBlur",
  });

  function onSubmit(values: ContactFormValues) {
    setResult(null);
    startTransition(async () => {
      const res = await submitContactMessage(values);
      if (!res.ok && res.fieldErrors) {
        for (const [key, message] of Object.entries(res.fieldErrors)) {
          form.setError(key as keyof ContactFormValues, { message });
        }
      }
      setResult(res);
      if (res.ok) form.reset(DEFAULTS);
    });
  }

  if (result?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-success-50 bg-success-50/60 px-6 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-pill bg-success text-on-dark">
          <CircleCheck className="size-7" aria-hidden="true" />
        </div>
        <h3 className="text-h3 text-ink">Message sent</h3>
        <p className="text-body-sm max-w-md text-ink-muted">
          Thank you. Our admissions team will get back to you soon.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setResult(null)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
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
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="Phone Number *"
          type="tel"
          autoComplete="tel"
          icon={<Phone className="size-5" aria-hidden="true" />}
        />
        <SelectField
          control={form.control}
          name="interest"
          label="I'm Interested In"
          placeholder="I'm Interested In *"
          options={INTEREST_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          icon={<Briefcase className="size-5" aria-hidden="true" />}
        />
      </div>
      <TextareaField
        control={form.control}
        name="message"
        label="Your Message"
        placeholder="Your Message *"
        maxLength={500}
        rows={5}
        icon={<MessageSquare className="size-5" aria-hidden="true" />}
      />

      {result && !result.ok && (
        <p role="alert" className="rounded-md bg-danger-50 px-4 py-2 text-body-sm text-danger">
          {result.error}
        </p>
      )}

      <Button type="submit" size="lg" block disabled={isPending} aria-busy={isPending}>
        {isPending ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
