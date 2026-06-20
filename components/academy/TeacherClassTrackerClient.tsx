"use client";

import dynamic from "next/dynamic";

export const TeacherClassTracker = dynamic(
  () =>
    import("@/components/academy/TeacherClassTracker").then(
      (mod) => mod.TeacherClassTracker,
    ),
  { ssr: false },
);
