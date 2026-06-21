"use client";

import dynamic from "next/dynamic";

const TeacherLogbookClient = dynamic(
  () =>
    import("@/components/teacher-logbook/TeacherLogbookClient").then(
      (module) => module.TeacherLogbookClient,
    ),
  { ssr: false },
);

export function TeacherLogbook() {
  return <TeacherLogbookClient />;
}
