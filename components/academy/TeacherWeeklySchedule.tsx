"use client";

import dynamic from "next/dynamic";

const TeacherWeeklyScheduleClient = dynamic(
  () =>
    import("@/components/academy/TeacherWeeklyScheduleClient").then(
      (module) => module.TeacherWeeklyScheduleClient,
    ),
  { ssr: false },
);

export function TeacherWeeklySchedule() {
  return <TeacherWeeklyScheduleClient />;
}
