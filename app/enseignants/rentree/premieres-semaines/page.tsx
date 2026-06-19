import type { Metadata } from "next";
import { TeacherFirstWeeksPlanner } from "@/components/academy/TeacherFirstWeeksPlanner";

export const metadata: Metadata = {
  title: "Préparer les premières semaines | Académie Kerboeuf",
  description:
    "Organisez les priorités du premier jour, de la première semaine et de la période 1 : checklist, priorités et liens vers vos outils de préparation.",
};

export default function TeacherFirstWeeksPlannerPage() {
  return <TeacherFirstWeeksPlanner />;
}
