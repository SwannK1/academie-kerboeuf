"use client";

import dynamic from "next/dynamic";

export const TeacherWorkshopsPlannerLazy = dynamic(
  () =>
    import(
      "@/components/teacher-workshops-planner/TeacherWorkshopsPlannerClient"
    ).then((module) => module.TeacherWorkshopsPlannerClient),
  { ssr: false },
);
