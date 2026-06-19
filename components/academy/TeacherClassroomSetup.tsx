"use client";

import dynamic from "next/dynamic";

const TeacherClassroomSetupClient = dynamic(
  () =>
    import("@/components/academy/TeacherClassroomSetupClient").then(
      (module) => module.TeacherClassroomSetupClient,
    ),
  { ssr: false },
);

export function TeacherClassroomSetup() {
  return <TeacherClassroomSetupClient />;
}
