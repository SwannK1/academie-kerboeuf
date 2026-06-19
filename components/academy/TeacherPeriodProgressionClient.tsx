"use client";

import dynamic from "next/dynamic";

export const TeacherPeriodProgression = dynamic(
  () =>
    import("@/components/academy/TeacherPeriodProgression").then(
      (mod) => mod.TeacherPeriodProgression,
    ),
  { ssr: false },
);
