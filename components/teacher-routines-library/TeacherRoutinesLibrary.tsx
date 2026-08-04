"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherRoutinesLibraryClient = dynamic(
  () =>
    import("@/components/teacher-routines-library/TeacherRoutinesLibraryClient").then(
      (module) => module.TeacherRoutinesLibraryClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={650} /> },
);

export function TeacherRoutinesLibrary() {
  return <TeacherRoutinesLibraryClient />;
}
