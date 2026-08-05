"use client";

import dynamic from "next/dynamic";

const TeacherCycleMeetingsClient = dynamic(
  () =>
    import(
      "@/components/teacher-cycle-meetings/TeacherCycleMeetingsClient"
    ).then((module) => module.TeacherCycleMeetingsClient),
  { ssr: false },
);

export function TeacherCycleMeetings() {
  return <TeacherCycleMeetingsClient />;
}
