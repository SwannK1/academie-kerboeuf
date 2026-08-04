import { TeacherWorkshopsPlanner } from "@/components/teacher-workshops-planner/TeacherWorkshopsPlanner";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Planifier mes ateliers",
  description:
    "Préparez vos ateliers de classe : objectif, matériel, durée et tâches de préparation, sans stocker de liste d'élèves.",
  path: "/enseignants/ateliers",
});

export default function TeacherWorkshopsPlannerPage() {
  return <TeacherWorkshopsPlanner />;
}
