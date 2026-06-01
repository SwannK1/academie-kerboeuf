import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects } from "@/content/levels/cp-learning-tree";
import { CP_ACCENT } from "@/lib/cp-accent";

export const metadata: Metadata = {
  title: "Matières CP | Académie Kerboeuf",
  description:
    "Les matières du programme CP à l'Académie Kerboeuf : domaines, sous-domaines, séquences-compétences, séances et slots PDF.",
};

export default function CpMatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subjects={cpSubjects}
      accent={CP_ACCENT}
      description="Chaque matière CP expose ses domaines, sous-domaines, séquences-compétences, séances simples et slots PDF prévus. Aucun lien PDF n'est affiché tant qu'une ressource réelle n'existe pas."
    />
  );
}
