import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "For Businesses" };

export default function ForBusinessesPage() {
  return (
    <PlaceholderPage
      title={
        <>
          For <span className="text-accent">Businesses</span>
        </>
      }
      description="Custom training and group enrollment to build the skills your teams need across the Gulf and Egypt."
    />
  );
}
