"use client";

import dynamic from "next/dynamic";

const TeacherPrintQueueClient = dynamic(
  () =>
    import("./TeacherPrintQueueClient").then(
      (module) => module.TeacherPrintQueueClient,
    ),
  { ssr: false },
);

export function TeacherPrintQueue() {
  return <TeacherPrintQueueClient />;
}
