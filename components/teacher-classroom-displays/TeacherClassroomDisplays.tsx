"use client";

import dynamic from "next/dynamic";

const TeacherClassroomDisplaysClient = dynamic(
  () =>
    import("@/components/teacher-classroom-displays/TeacherClassroomDisplaysClient").then(
      (module) => module.TeacherClassroomDisplaysClient,
    ),
  { ssr: false },
);

export function TeacherClassroomDisplays() {
  return <TeacherClassroomDisplaysClient />;
}
