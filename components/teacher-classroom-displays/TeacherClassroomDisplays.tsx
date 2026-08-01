"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherClassroomDisplaysClient = dynamic(
  () =>
    import("@/components/teacher-classroom-displays/TeacherClassroomDisplaysClient").then(
      (module) => module.TeacherClassroomDisplaysClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={500} /> },
);

export function TeacherClassroomDisplays() {
  return <TeacherClassroomDisplaysClient />;
}
