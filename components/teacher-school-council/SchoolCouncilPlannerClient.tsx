"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

export const SchoolCouncilPlanner = dynamic(
  () =>
    import("@/components/teacher-school-council/SchoolCouncilPlanner").then(
      (mod) => mod.SchoolCouncilPlanner,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={650} /> },
);
