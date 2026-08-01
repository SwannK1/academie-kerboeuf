"use client";

import dynamic from "next/dynamic";
import { ToolLoadingSkeleton } from "@/components/ui/ToolLoadingSkeleton";

const TeacherClassroomMaterialsClient = dynamic(
  () =>
    import("./TeacherClassroomMaterialsClient").then(
      (module) => module.TeacherClassroomMaterialsClient,
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton minHeight={650} /> },
);

export function TeacherClassroomMaterials() {
  return <TeacherClassroomMaterialsClient />;
}
