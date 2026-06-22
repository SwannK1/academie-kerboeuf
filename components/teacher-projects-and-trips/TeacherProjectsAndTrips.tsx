"use client";

import dynamic from "next/dynamic";

const TeacherProjectsAndTripsClient = dynamic(
  () =>
    import("@/components/teacher-projects-and-trips/TeacherProjectsAndTripsClient").then(
      (module) => module.TeacherProjectsAndTripsClient,
    ),
  { ssr: false },
);

export function TeacherProjectsAndTrips() {
  return <TeacherProjectsAndTripsClient />;
}
