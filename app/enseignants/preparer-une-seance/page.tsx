import type { Metadata } from "next";
import { TeacherLessonPlanner } from "@/components/academy/TeacherLessonPlanner";

export const metadata: Metadata = {
  title: "Préparer une séance | Académie Kerboeuf",
  description:
    "Construisez une séance reliée au niveau, à la matière, à la période et à une compétence, avec son déroulé, sa différenciation et son bilan.",
};

export default function PreparerUneSeancePage() {
  return <TeacherLessonPlanner />;
}
