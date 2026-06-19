"use client";

import dynamic from "next/dynamic";

const TeacherParentMeetingPrepClient = dynamic(
  () =>
    import("@/components/academy/TeacherParentMeetingPrepClient").then(
      (module) => module.TeacherParentMeetingPrepClient,
    ),
  { ssr: false },
);

export function TeacherParentMeetingPrep() {
  return <TeacherParentMeetingPrepClient />;
}
