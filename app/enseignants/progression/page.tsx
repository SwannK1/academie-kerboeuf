import type { Metadata } from "next";
import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgression";

export const metadata: Metadata = {
  title: "Progression de période",
  description:
    "Organisez l'ordre des séquences d'une période donnée par niveau et par matière.",
};

export default function TeacherPeriodProgressionPage() {
  return <TeacherPeriodProgression />;
}
