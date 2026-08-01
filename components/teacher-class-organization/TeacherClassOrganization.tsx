"use client";

import dynamic from "next/dynamic";

const TeacherClassOrganizationClient = dynamic(
  () =>
    import(
      "@/components/teacher-class-organization/TeacherClassOrganizationClient"
    ).then((module) => module.TeacherClassOrganizationClient),
  { ssr: false },
);

export function TeacherClassOrganization() {
  return <TeacherClassOrganizationClient />;
}
