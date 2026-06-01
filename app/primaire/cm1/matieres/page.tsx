import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { cm1Subjects } from "@/content/cm1-subjects";
import { CM1_ACCENT } from "@/lib/cm1-accent";

export const metadata: Metadata = {
  title: "Matières CM1 | Académie Kerboeuf",
  description:
    "Les 8 matières du programme CM1 à l'Académie Kerboeuf : Français, Mathématiques, Histoire-Géographie, Sciences, EMC, Anglais, Arts, EPS.",
};

export default function Cm1MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CM1"
      levelHref="/primaire/cm1"
      subjectsHref="/primaire/cm1/matieres"
      subjects={cm1Subjects}
      accent={CM1_ACCENT}
      description="Chaque matière est structurée en domaines, sous-domaines et séquences-compétences. Les supports s'y rattachent progressivement au fil de l'année."
    />
  );
}
