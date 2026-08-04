"use client";

import dynamic from "next/dynamic";

const TeacherCm26eTransitionClient = dynamic(
  () =>
    import(
      "@/components/teacher-cm2-6e-transition/TeacherCm26eTransitionClient"
    ).then((module) => module.TeacherCm26eTransitionClient),
  { ssr: false },
);

export function TeacherCm26eTransition() {
  return <TeacherCm26eTransitionClient />;
}
