"use client";

import type { ReactNode } from "react";
import { BookOpen, Layers, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** Course detail tabs. Server-rendered content is passed in as props. */
export function CourseTabs({
  overview,
  curriculum,
  instructor,
}: {
  overview: ReactNode;
  curriculum: ReactNode;
  instructor: ReactNode;
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
    </Tabs>
  );
}
