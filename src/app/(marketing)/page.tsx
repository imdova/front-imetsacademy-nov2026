import { PageHero } from "@/components/shared/page-hero";

export default function HomePage() {
  return (
    <PageHero
      size="xl"
      eyebrow={<p className="text-overline text-accent">Learn · Develop · Lead</p>}
      title={
        <>
          Build Business Skills for Real <span className="text-accent">Career Growth.</span>
        </>
      }
      description="Chrome smoke test — header, hero and footer."
    />
  );
}
