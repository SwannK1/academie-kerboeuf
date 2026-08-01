import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects } from "@/content/cp-subjects";
import { CP_ACCENT } from "@/lib/cp-accent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Matières CP",
  description:
    "Les matières du programme CP à l'Académie Kerboeuf : Français et Mathématiques. Structure en domaines, sous-domaines et séquences-compétences.",
  path: "/primaire/cp/matieres",
});

export default function CpMatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subjects={cpSubjects}
      accent={CP_ACCENT}
      description="Chaque matière est structurée en domaines, sous-domaines et séquences-compétences. Une séquence correspond à une compétence."
    />
  );
}
