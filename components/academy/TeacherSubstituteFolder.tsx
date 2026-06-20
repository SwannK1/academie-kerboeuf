"use client";

import dynamic from "next/dynamic";

const TeacherSubstituteFolderClient = dynamic(
  () =>
    import("@/components/academy/TeacherSubstituteFolderClient").then(
      (module) => module.TeacherSubstituteFolderClient,
    ),
  { ssr: false },
);

export function TeacherSubstituteFolder() {
  return <TeacherSubstituteFolderClient />;
}
