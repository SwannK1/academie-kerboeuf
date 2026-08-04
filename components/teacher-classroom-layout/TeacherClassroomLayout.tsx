"use client";

import dynamic from "next/dynamic";

const TeacherClassroomLayoutClient = dynamic(
  () =>
    import(
      "@/components/teacher-classroom-layout/TeacherClassroomLayoutClient"
    ).then((module) => module.TeacherClassroomLayoutClient),
  { ssr: false },
);

export function TeacherClassroomLayout() {
  return <TeacherClassroomLayoutClient />;
}
