import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { cm1Subjects } from "@/content/cm1-subjects";
import { CM1_ACCENT } from "@/lib/cm1-accent";

export const metadata: Metadata = {
  title: "Matières CM1 | Académie Kerboeuf",
  description:
    "Les matières du programme CM1 : domaines, sous-domaines, séquences-compétences, séances et slots PDF prévus.",
};

export default function Cm1MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CM1"
      levelHref="/primaire/cm1"
      subjectsHref="/primaire/cm1/matieres"
      subjects={cm1Subjects}
      accent={CM1_ACCENT}
      description="Chaque matière CM1 expose sa structure Cycle 3 : domaines, sous-domaines, séquences-compétences, séances prévues et slots PDF planned. Aucun PDF ni lien de téléchargement n'est simulé."
      primaryAction={{
        href: "/primaire/cm1/programme",
        label: "Programme CM1",
      }}
    />
  );
}
