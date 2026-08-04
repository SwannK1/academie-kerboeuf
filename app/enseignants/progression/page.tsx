import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgression";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Progression de période",
  description:
    "Organisez l'ordre des séquences d'une période donnée par niveau et par matière.",
  path: "/enseignants/progression",
});

export default function TeacherPeriodProgressionPage() {
  return <TeacherPeriodProgression />;
}
