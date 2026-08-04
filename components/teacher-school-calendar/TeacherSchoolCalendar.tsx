"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherSchoolCalendarClient = dynamic(
  () =>
    import("@/components/teacher-school-calendar/TeacherSchoolCalendarClient").then(
      (module) => module.TeacherSchoolCalendarClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={500} /> },
);

export function TeacherSchoolCalendar() {
  return <TeacherSchoolCalendarClient />;
}
