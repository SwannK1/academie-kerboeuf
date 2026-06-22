"use client";

import dynamic from "next/dynamic";

const TeacherSchoolCalendarClient = dynamic(
  () =>
    import("@/components/teacher-school-calendar/TeacherSchoolCalendarClient").then(
      (module) => module.TeacherSchoolCalendarClient,
    ),
  { ssr: false },
);

export function TeacherSchoolCalendar() {
  return <TeacherSchoolCalendarClient />;
}
