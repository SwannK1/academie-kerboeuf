"use client";

import dynamic from "next/dynamic";

export const SchoolCouncilPlanner = dynamic(
  () =>
    import("@/components/teacher-school-council/SchoolCouncilPlanner").then(
      (mod) => mod.SchoolCouncilPlanner,
    ),
  { ssr: false },
);
