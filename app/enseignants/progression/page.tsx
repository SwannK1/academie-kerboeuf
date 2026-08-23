import { buildPageMetadata } from "@/content/seo";
import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgression";

export const metadata = buildPageMetadata({
  title: "Progression de période",
  description:
    "Organisez l'ordre des séquences d'une période donnée par niveau et par matière.",
  path: "/enseignants/progression",
  noIndex: true,
});

export default function TeacherPeriodProgressionPage() {
  return <TeacherPeriodProgression />;
}
