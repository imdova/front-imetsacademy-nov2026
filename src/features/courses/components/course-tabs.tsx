"use client";

import type { ReactNode } from "react";
import { BookOpen, CircleHelp, Layers, Star, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCount } from "@/lib/format";

/** Course detail tabs. Server-rendered content is passed in as props. */
export function CourseTabs({
  overview,
  curriculum,
  instructor,
  reviews,
  faqs,
  reviewsCount,
}: {
  overview: ReactNode;
  curriculum: ReactNode;
  instructor: ReactNode;
  reviews: ReactNode;
  faqs: ReactNode;
  reviewsCount: number;
}) {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          <BookOpen className="size-5" aria-hidden="true" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="curriculum">
          <Layers className="size-5" aria-hidden="true" />
          Curriculum
        </TabsTrigger>
        <TabsTrigger value="instructor">
          <User className="size-5" aria-hidden="true" />
          Instructor
        </TabsTrigger>
        <TabsTrigger value="reviews">
          <Star className="size-5" aria-hidden="true" />
          Reviews ({formatCount(reviewsCount)})
        </TabsTrigger>
        <TabsTrigger value="faqs">
          <CircleHelp className="size-5" aria-hidden="true" />
          FAQs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-8">
        {overview}
      </TabsContent>
      <TabsContent value="curriculum" className="pt-8">
        {curriculum}
      </TabsContent>
      <TabsContent value="instructor" className="pt-8">
        {instructor}
      </TabsContent>
      <TabsContent value="reviews" className="pt-8">
        {reviews}
      </TabsContent>
      <TabsContent value="faqs" className="pt-8">
        {faqs}
      </TabsContent>
    </Tabs>
  );
}
