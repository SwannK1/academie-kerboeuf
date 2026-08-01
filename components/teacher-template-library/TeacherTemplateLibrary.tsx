"use client";

import dynamic from "next/dynamic";

const TeacherTemplateLibraryClient = dynamic(
  () =>
    import(
      "@/components/teacher-template-library/TeacherTemplateLibraryClient"
    ).then((module) => module.TeacherTemplateLibraryClient),
  { ssr: false },
);

export function TeacherTemplateLibrary() {
  return <TeacherTemplateLibraryClient />;
}
