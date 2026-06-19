"use client";

import dynamic from "next/dynamic";

const TeacherBackToSchoolLabelsClient = dynamic(
  () =>
    import("@/components/academy/TeacherBackToSchoolLabelsClient").then(
      (module) => module.TeacherBackToSchoolLabelsClient,
    ),
  { ssr: false },
);

export function TeacherBackToSchoolLabels() {
  return <TeacherBackToSchoolLabelsClient />;
}
