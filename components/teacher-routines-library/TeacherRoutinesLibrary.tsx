"use client";

import dynamic from "next/dynamic";

const TeacherRoutinesLibraryClient = dynamic(
  () =>
    import("@/components/teacher-routines-library/TeacherRoutinesLibraryClient").then(
      (module) => module.TeacherRoutinesLibraryClient,
    ),
  { ssr: false },
);

export function TeacherRoutinesLibrary() {
  return <TeacherRoutinesLibraryClient />;
}
