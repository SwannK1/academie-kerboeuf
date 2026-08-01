"use client";

import dynamic from "next/dynamic";

const TeacherProfessionalMeetingsClient = dynamic(
  () =>
    import(
      "@/components/teacher-professional-meetings/TeacherProfessionalMeetingsClient"
    ).then((module) => module.TeacherProfessionalMeetingsClient),
  { ssr: false },
);

export function TeacherProfessionalMeetings() {
  return <TeacherProfessionalMeetingsClient />;
}
