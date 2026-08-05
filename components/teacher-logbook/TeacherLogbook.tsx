"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherLogbookClient = dynamic(
  () =>
    import("@/components/teacher-logbook/TeacherLogbookClient").then(
      (module) => module.TeacherLogbookClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={900} /> },
);

export function TeacherLogbook() {
  return <TeacherLogbookClient />;
}
