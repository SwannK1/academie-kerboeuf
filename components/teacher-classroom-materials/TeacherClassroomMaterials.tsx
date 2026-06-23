"use client";

import dynamic from "next/dynamic";

const TeacherClassroomMaterialsClient = dynamic(
  () =>
    import("./TeacherClassroomMaterialsClient").then(
      (module) => module.TeacherClassroomMaterialsClient,
    ),
  { ssr: false },
);

export function TeacherClassroomMaterials() {
  return <TeacherClassroomMaterialsClient />;
}
