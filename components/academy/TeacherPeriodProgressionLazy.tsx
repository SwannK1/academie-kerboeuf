"use client";

import dynamic from "next/dynamic";

export const TeacherPeriodProgressionLazy = dynamic(
  () =>
    import("@/components/academy/TeacherPeriodProgressionClient").then(
      (module) => module.TeacherPeriodProgressionClient,
    ),
  { ssr: false },
);
