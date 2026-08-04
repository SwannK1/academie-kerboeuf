"use client";

import dynamic from "next/dynamic";

const TeacherCommunicationsLibraryClient = dynamic(
  () =>
    import(
      "@/components/teacher-communications-library/TeacherCommunicationsLibraryClient"
    ).then((module) => module.TeacherCommunicationsLibraryClient),
  { ssr: false },
);

export function TeacherCommunicationsLibrary() {
  return <TeacherCommunicationsLibraryClient />;
}
