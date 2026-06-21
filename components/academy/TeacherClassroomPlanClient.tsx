"use client";

import dynamic from "next/dynamic";

export const TeacherClassroomPlan = dynamic(
  () =>
    import("@/components/academy/TeacherClassroomPlan").then(
      (mod) => mod.TeacherClassroomPlan,
    ),
  { ssr: false },
);
