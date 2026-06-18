"use client";

import dynamic from "next/dynamic";

const TeacherWeeklyTimetableClient = dynamic(
  () =>
    import("@/components/academy/TeacherWeeklyTimetableClient").then(
      (module) => module.TeacherWeeklyTimetableClient,
    ),
  { ssr: false },
);

export function TeacherWeeklyTimetable() {
  return <TeacherWeeklyTimetableClient />;
}
