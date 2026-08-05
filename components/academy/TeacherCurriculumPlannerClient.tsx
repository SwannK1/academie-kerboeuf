"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

export const TeacherCurriculumPlanner = dynamic(
  () =>
    import("@/components/academy/TeacherCurriculumPlanner").then(
      (mod) => mod.TeacherCurriculumPlanner,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={900} /> },
);
