"use client";

import dynamic from "next/dynamic";

const AssessmentPlannerClient = dynamic(
  () =>
    import("@/components/teacher-assessment-planner/AssessmentPlannerClient").then(
      (module) => module.AssessmentPlannerClient,
    ),
  { ssr: false },
);

export function AssessmentPlanner() {
  return <AssessmentPlannerClient />;
}
