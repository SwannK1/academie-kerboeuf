import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { cm2Subjects } from "@/content/cm2-subjects";
import { CM2_ACCENT } from "@/lib/cm2-accent";

export const metadata: Metadata = {
  title: "Matières CM2 | Académie Kerboeuf",
  description:
    "Les 8 matières du programme CM2 à l'Académie Kerboeuf : Français, Mathématiques, Histoire-Géographie, Sciences, EMC, Anglais, Arts, EPS.",
};

export default function Cm2MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CM2"
      levelHref="/primaire/cm2"
      subjectsHref="/primaire/cm2/matieres"
      subjects={cm2Subjects}
      accent={CM2_ACCENT}
      description="Chaque matière est structurée en domaines, sous-domaines et séquences-compétences. Les ressources s'y rattachent progressivement au fil de l'année."
      primaryAction={{
        href: "/primaire/cm2/missions",
        label: "Toutes les missions CM2",
      }}
    />
  );
}
