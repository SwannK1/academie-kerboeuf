"use client";

import dynamic from "next/dynamic";

const TeacherEndOfPeriodClient = dynamic(
  () =>
    import("@/components/teacher-end-of-period/TeacherEndOfPeriodClient").then(
      (module) => module.TeacherEndOfPeriodClient,
    ),
  { ssr: false },
);

export function TeacherEndOfPeriod() {
  return <TeacherEndOfPeriodClient />;
}
