import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "About IMETS" };

export default function AboutPage() {
  return (
    <PlaceholderPage
      title={
        <>
          About <span className="text-accent">IMETS</span>
        </>
      }
      description="A confident, professional learning brand for working adults in Egypt and the Gulf."
    />
  );
}
