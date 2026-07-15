"use client";

import dynamic from "next/dynamic";

const TeacherStudentListClient = dynamic(
  () =>
    import("./TeacherStudentListClient").then(
      (module) => module.TeacherStudentListClient,
    ),
  { ssr: false },
);

export function TeacherStudentList() {
  return <TeacherStudentListClient />;
}
