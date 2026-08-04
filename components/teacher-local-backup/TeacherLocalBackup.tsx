"use client";

import dynamic from "next/dynamic";

const TeacherLocalBackupClient = dynamic(
  () =>
    import("@/components/teacher-local-backup/TeacherLocalBackupClient").then(
      (module) => module.TeacherLocalBackupClient,
    ),
  { ssr: false },
);

export function TeacherLocalBackup() {
  return <TeacherLocalBackupClient />;
}
