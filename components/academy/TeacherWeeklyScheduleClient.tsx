"use client";

import dynamic from "next/dynamic";

export const TeacherWeeklySchedule = dynamic(
  () =>
    import("@/components/academy/TeacherWeeklySchedule").then(
      (mod) => mod.TeacherWeeklySchedule,
    ),
  { ssr: false },
);
