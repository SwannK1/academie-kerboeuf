import type { Metadata } from "next";
import { TeacherWorkshopsPlanner } from "@/components/teacher-workshops-planner/TeacherWorkshopsPlanner";

export const metadata: Metadata = {
  title: "Planifier mes ateliers | Académie Kerboeuf",
  description:
    "Préparez vos ateliers de classe : objectif, matériel, durée et tâches de préparation, sans stocker de liste d'élèves.",
};

export default function TeacherWorkshopsPlannerPage() {
  return <TeacherWorkshopsPlanner />;
}
