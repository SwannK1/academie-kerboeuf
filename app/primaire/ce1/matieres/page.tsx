import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { ce1Subjects } from "@/content/levels/ce1-learning-tree";
import { CE1_ACCENT } from "@/lib/ce1-accent";

export const metadata: Metadata = {
  title: "Matières CE1 | Académie Kerboeuf",
  description:
    "Les matières du programme CE1 à l'Académie Kerboeuf : domaines, sous-domaines et séquences-compétences.",
};

export default function Ce1MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CE1"
      levelHref="/primaire/ce1"
      subjectsHref="/primaire/ce1/matieres"
      subjects={ce1Subjects}
      accent={CE1_ACCENT}
      description="Chaque matière CE1 expose ses domaines, sous-domaines et séquences-compétences. Les supports PDF ne sont pas simulés : ils seront reliés uniquement lorsqu'ils existeront."
      primaryAction={{
        href: "/primaire/ce1/programme",
        label: "Programme CE1",
      }}
    />
  );
}
