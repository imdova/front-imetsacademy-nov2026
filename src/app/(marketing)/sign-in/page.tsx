import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <PlaceholderPage
      title={
        <>
          Sign <span className="text-accent">In</span>
        </>
      }
      description="Access your courses, progress and certificates. Student sign-in is coming soon."
      note="Accounts aren't available yet. Explore our courses or contact us to enroll."
    />
  );
}
