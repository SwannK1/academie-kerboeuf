import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { ce2Subjects } from "@/content/ce2-subjects";
import { CE2_ACCENT } from "@/lib/ce2-accent";

export const metadata: Metadata = {
  title: "Matières CE2 | Académie Kerboeuf",
  description:
    "Les matières du programme CE2 à l'Académie Kerboeuf — domaines, sous-domaines et séquences-compétences du Cycle 2.",
};

export default function Ce2MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CE2"
      levelHref="/primaire/ce2"
      subjectsHref="/primaire/ce2/matieres"
      subjects={ce2Subjects}
      accent={CE2_ACCENT}
      description="Chaque matière est structurée en domaines, sous-domaines et séquences-compétences. Une séquence correspond à une compétence."
    />
  );
}
