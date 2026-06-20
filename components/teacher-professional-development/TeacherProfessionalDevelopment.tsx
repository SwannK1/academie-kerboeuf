"use client";

import dynamic from "next/dynamic";

const TeacherProfessionalDevelopmentClient = dynamic(
  () =>
    import(
      "@/components/teacher-professional-development/TeacherProfessionalDevelopmentClient"
    ).then((module) => module.TeacherProfessionalDevelopmentClient),
  { ssr: false },
);

export function TeacherProfessionalDevelopment() {
  return <TeacherProfessionalDevelopmentClient />;
}
