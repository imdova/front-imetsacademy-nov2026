import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <>
      <section className="bg-navy-900">
        <Container className="max-w-2xl space-y-4 pt-8 pb-10 lg:pb-36">
          <Skeleton className="h-4 w-48 bg-white/10" />
          <Skeleton className="h-7 w-24 rounded-pill bg-white/10" />
          <Skeleton className="h-10 w-full bg-white/10" />
          <Skeleton className="h-5 w-3/4 bg-white/10" />
          <Skeleton className="h-4 w-2/3 bg-white/10" />
        </Container>
      </section>
      <Container as="section" className="pb-16 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="z-10 space-y-6 lg:col-start-2 lg:row-start-1 lg:-mt-28">
            <Skeleton className="h-96 rounded-xl" />
          </div>
          <div className="space-y-4 lg:col-start-1 lg:row-start-1 lg:pt-10">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </Container>
    </>
  );
}
