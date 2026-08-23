import { buildPageMetadata } from "@/content/seo";
import { TeacherWorkshopsPlanner } from "@/components/teacher-workshops-planner/TeacherWorkshopsPlanner";

export const metadata = buildPageMetadata({
  title: "Planifier mes ateliers",
  description:
    "Préparez vos ateliers de classe : objectif, matériel, durée et tâches de préparation, sans stocker de liste d'élèves.",
  path: "/enseignants/ateliers",
  noIndex: true,
});

export default function TeacherWorkshopsPlannerPage() {
  return <TeacherWorkshopsPlanner />;
}
