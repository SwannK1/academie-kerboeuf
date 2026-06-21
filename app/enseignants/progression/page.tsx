import type { Metadata } from "next";
import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgression";

export const metadata: Metadata = {
  title: "Progression de période | Espace enseignants | Académie Kerboeuf",
  description:
    "Organisez par semaine les compétences déjà placées dans la programmation annuelle, pour un niveau, une matière et une période donnés.",
};

export default function TeacherPeriodProgressionPage() {
  return <TeacherPeriodProgression />;
}
