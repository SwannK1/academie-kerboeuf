"use client";

import dynamic from "next/dynamic";

export const TeacherCurriculumPlanner = dynamic(
  () =>
    import("@/components/academy/TeacherCurriculumPlanner").then(
      (mod) => mod.TeacherCurriculumPlanner,
    ),
  { ssr: false },
);
