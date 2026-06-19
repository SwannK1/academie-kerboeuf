"use client";

import dynamic from "next/dynamic";

const TeacherFirstWeeksPlannerClient = dynamic(
  () =>
    import("@/components/academy/TeacherFirstWeeksPlannerClient").then(
      (module) => module.TeacherFirstWeeksPlannerClient,
    ),
  { ssr: false },
);

export function TeacherFirstWeeksPlanner() {
  return <TeacherFirstWeeksPlannerClient />;
}
