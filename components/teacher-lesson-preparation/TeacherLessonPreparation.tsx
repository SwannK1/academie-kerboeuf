"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherLessonPreparationClient = dynamic(
  () =>
    import("./TeacherLessonPreparationClient").then(
      (module) => module.TeacherLessonPreparationClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={900} /> },
);

export function TeacherLessonPreparation() {
  return <TeacherLessonPreparationClient />;
}
