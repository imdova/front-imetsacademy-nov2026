import type { Metadata } from "next";
import { AuthAsideRegister, RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-surface shadow-lg lg:grid-cols-2">
      <RegisterForm />
      <div className="hidden lg:block">
        <AuthAsideRegister />
      </div>
    </div>
  );
}
