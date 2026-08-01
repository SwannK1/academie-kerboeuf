"use client";

import dynamic from "next/dynamic";

const TeacherApcPlannerClient = dynamic(
  () =>
    import("@/components/teacher-apc-planner/TeacherApcPlannerClient").then(
      (module) => module.TeacherApcPlannerClient,
    ),
  { ssr: false },
);

export function TeacherApcPlanner() {
  return <TeacherApcPlannerClient />;
}
