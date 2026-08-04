"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherProfessionalDevelopmentClient = dynamic(
  () =>
    import(
      "@/components/teacher-professional-development/TeacherProfessionalDevelopmentClient"
    ).then((module) => module.TeacherProfessionalDevelopmentClient),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={650} /> },
);

export function TeacherProfessionalDevelopment() {
  return <TeacherProfessionalDevelopmentClient />;
}
