"use client";

import dynamic from "next/dynamic";

const TeacherOrganizerDashboardClient = dynamic(
  () =>
    import("@/components/academy/TeacherOrganizerDashboardClient").then(
      (module) => module.TeacherOrganizerDashboardClient,
    ),
  { ssr: false },
);

export function TeacherOrganizerDashboard() {
  return <TeacherOrganizerDashboardClient />;
}
