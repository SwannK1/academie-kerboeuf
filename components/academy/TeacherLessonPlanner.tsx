"use client";

import dynamic from "next/dynamic";
import type { TeacherLessonPrefill } from "@/content/teacher-lesson-planner";

const TeacherLessonPlannerClient = dynamic(
  () =>
    import("@/components/academy/TeacherLessonPlannerClient").then(
      (module) => module.TeacherLessonPlannerClient,
    ),
  { ssr: false },
);

export function TeacherLessonPlanner({
  prefill,
}: {
  prefill: TeacherLessonPrefill;
}) {
  return <TeacherLessonPlannerClient prefill={prefill} />;
}
