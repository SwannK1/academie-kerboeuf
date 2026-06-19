"use client";

import dynamic from "next/dynamic";

export const TeacherYearlyProgrammation = dynamic(
  () =>
    import("@/components/academy/TeacherYearlyProgrammation").then(
      (mod) => mod.TeacherYearlyProgrammation,
    ),
  { ssr: false },
);
