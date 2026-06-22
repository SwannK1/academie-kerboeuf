"use client";

import dynamic from "next/dynamic";

const TeacherLessonPreparationClient = dynamic(
  () =>
    import("./TeacherLessonPreparationClient").then(
      (module) => module.TeacherLessonPreparationClient,
    ),
  { ssr: false },
);

export function TeacherLessonPreparation() {
  return <TeacherLessonPreparationClient />;
}
