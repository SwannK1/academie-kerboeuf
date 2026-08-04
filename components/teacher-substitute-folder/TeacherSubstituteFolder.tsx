"use client";

import dynamic from "next/dynamic";

const TeacherSubstituteFolderClient = dynamic(
  () =>
    import(
      "@/components/teacher-substitute-folder/TeacherSubstituteFolderClient"
    ).then((module) => module.TeacherSubstituteFolderClient),
  { ssr: false },
);

export function TeacherSubstituteFolder() {
  return <TeacherSubstituteFolderClient />;
}
