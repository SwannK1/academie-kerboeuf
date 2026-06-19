"use client";

import dynamic from "next/dynamic";

const TeacherOrdersClient = dynamic(
  () =>
    import("@/components/academy/TeacherOrdersClient").then(
      (module) => module.TeacherOrdersClient,
    ),
  { ssr: false },
);

export function TeacherOrders() {
  return <TeacherOrdersClient />;
}
