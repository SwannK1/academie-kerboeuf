"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherWeeklyTimetableClient = dynamic(
  () =>
    import("@/components/academy/TeacherWeeklyTimetableClient").then(
      (module) => module.TeacherWeeklyTimetableClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={900} /> },
);

export function TeacherWeeklyTimetable() {
  return <TeacherWeeklyTimetableClient />;
}
