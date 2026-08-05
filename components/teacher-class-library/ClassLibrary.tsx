"use client";

import dynamic from "next/dynamic";

const ClassLibraryClient = dynamic(
  () =>
    import("@/components/teacher-class-library/ClassLibraryClient").then(
      (module) => module.ClassLibraryClient,
    ),
  { ssr: false },
);

export function ClassLibrary() {
  return <ClassLibraryClient />;
}
