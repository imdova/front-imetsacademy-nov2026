import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <PlaceholderPage
      title={
        <>
          Create Your <span className="text-accent">Account</span>
        </>
      }
      description="Register to enroll in diplomas and certification prep programs. Sign-up is coming soon."
      note="Registration isn't open yet. Browse our programs or contact admissions to get started."
    />
  );
}
