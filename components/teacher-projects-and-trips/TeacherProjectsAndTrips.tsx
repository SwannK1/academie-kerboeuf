"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherProjectsAndTripsClient = dynamic(
  () =>
    import("@/components/teacher-projects-and-trips/TeacherProjectsAndTripsClient").then(
      (module) => module.TeacherProjectsAndTripsClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={500} /> },
);

export function TeacherProjectsAndTrips() {
  return <TeacherProjectsAndTripsClient />;
}
