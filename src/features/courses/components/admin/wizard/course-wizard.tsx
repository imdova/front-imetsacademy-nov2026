"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, FilePlus2, FileText, Layers, Rocket } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/shared/admin-page-header";
import {
  createCourseFormSchema,
  STEP_FIELDS,
  type CreateCourseForm,
} from "@/features/courses/wizard-schema";
import { createCourseAction } from "@/features/courses/admin-actions";
import { WizardStepper } from "@/features/courses/components/admin/wizard/wizard-stepper";
import { StepInformation } from "@/features/courses/components/admin/wizard/step-information";
import { CurriculumBuilder } from "@/features/courses/components/admin/wizard/curriculum-builder";
import { StepReview } from "@/features/courses/components/admin/wizard/step-review";

const DEFAULTS: CreateCourseForm = {
  title: "",
  courseType: "diploma",
  categorySlug: "",
  subcategory: "",
  summary: "",
  thumbnail: "",
  durationMonths: 4,
  learningMode: "Live on Zoom",
  sessions: 24,
  language: "English",
  curriculum: [
    {
      title: "Introduction",
      description: "",
      lessons: [{ title: "Welcome & Course Overview", durationMin: 10 }],
      materials: [],
    },
  ],
  publishOption: "publish-now",
};

export function CourseWizard({ categories }: { categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateCourseForm>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: DEFAULTS,
    mode: "onBlur",
  });

  async function goNext() {
    setError(null);
    const fields = STEP_FIELDS[step as 0 | 1] as readonly FieldPath<CreateCourseForm>[] | undefined;
    const valid = fields ? await form.trigger(fields as FieldPath<CreateCourseForm>[]) : true;
    if (valid) setStep((s) => Math.min(s + 1, 2));
  }

  function submit(asDraft: boolean) {
    setError(null);
    form.handleSubmit(
      (values) => {
        const payload: CreateCourseForm = asDraft
          ? { ...values, publishOption: "draft" }
          : values;
        startTransition(async () => {
          const res = await createCourseAction(payload);
          if (res.ok) router.push(routes.admin.courses);
          else setError(res.error);
        });
      },
      () => setError("Please complete the required fields in each step before continuing."),
    )();
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <AdminPageHeader
          title="Add New Course"
          description="Create a professional course in just 3 simple steps."
          breadcrumbs={[
            { label: "Dashboard", href: routes.admin.dashboard },
            { label: "Courses", href: routes.admin.courses },
            { label: "Add New Course" },
          ]}
          icon={
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent-50 text-accent-strong">
              <FilePlus2 className="size-6" aria-hidden="true" />
            </span>
          }
        />

        <div className="rounded-xl border border-border bg-surface p-6">
          <WizardStepper step={step} onStepClick={setStep} />
        </div>

        {step === 0 && <StepInformation categories={categories} />}

        {step === 1 && (
          <div className="space-y-5 rounded-xl border border-border bg-surface p-6">
            <header className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <Layers className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-h3 text-ink">Course Content</h2>
                <p className="text-body-sm text-ink-muted">
                  Build your curriculum by adding modules, lessons, and learning materials.
                </p>
              </div>
            </header>
            <CurriculumBuilder />
          </div>
        )}

        {step === 2 && <StepReview categories={categories} onEdit={setStep} />}

        {error && (
          <p role="alert" className="rounded-md bg-danger-50 px-4 py-2 text-body-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
          <div>
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={pending}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => submit(true)} disabled={pending}>
              <FileText className="size-4" aria-hidden="true" />
              Save as Draft
            </Button>
            {step < 2 ? (
              <Button onClick={goNext} disabled={pending}>
                {step === 0 ? "Next: Course Content" : "Next: Review & Publish"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={() => submit(false)} disabled={pending}>
                <Rocket className="size-4" aria-hidden="true" />
                {pending ? "Publishing…" : "Publish Course"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
