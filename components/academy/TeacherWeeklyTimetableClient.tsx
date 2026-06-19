"use client";

import dynamic from "next/dynamic";

export const TeacherWeeklyTimetable = dynamic(
  () =>
    import("@/components/academy/TeacherWeeklyTimetable").then(
      (mod) => mod.TeacherWeeklyTimetable,
    ),
  { ssr: false },
);
