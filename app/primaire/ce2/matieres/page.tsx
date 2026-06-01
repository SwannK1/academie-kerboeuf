import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { ce2Subjects } from "@/content/levels/ce2-learning-tree";
import { CE1_ACCENT } from "@/lib/ce1-accent";

export const metadata: Metadata = {
  title: "Matières CE2 | Académie Kerboeuf",
  description:
    "Les matières du programme CE2 à l'Académie Kerboeuf : domaines, sous-domaines et séquences-compétences.",
};

export default function Ce2MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CE2"
      levelHref="/primaire/ce2"
      subjectsHref="/primaire/ce2/matieres"
      subjects={ce2Subjects}
      accent={CE1_ACCENT}
      description="Chaque matière CE2 expose ses domaines, sous-domaines et séquences-compétences. Les supports PDF ne sont pas simulés : ils seront reliés uniquement lorsqu'ils existeront."
      primaryAction={{
        href: "/primaire/ce2",
        label: "Portail CE2",
      }}
    />
  );
}
