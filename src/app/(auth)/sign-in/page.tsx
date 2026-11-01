import type { Metadata } from "next";
import { AuthAsideSignIn, SignInForm } from "@/features/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-surface shadow-lg lg:grid-cols-2">
      <SignInForm />
      <div className="hidden lg:block">
        <AuthAsideSignIn />
      </div>
    </div>
  );
}
