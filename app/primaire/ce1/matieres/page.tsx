import type { Metadata } from "next";
import { SubjectIndexPage } from "@/components/academy/SubjectMatterCatalog";
import { ce1Subjects } from "@/content/ce1-subjects";
import { CE1_ACCENT } from "@/lib/ce1-accent";

export const metadata: Metadata = {
  title: "Matières CE1 | Académie Kerboeuf",
  description:
    "Les matières du programme CE1 à l'Académie Kerboeuf : Français et Mathématiques — domaines, sous-domaines et séquences-compétences du Cycle 2.",
};

export default function Ce1MatieresPage() {
  return (
    <SubjectIndexPage
      levelLabel="CE1"
      levelHref="/primaire/ce1"
      subjectsHref="/primaire/ce1/matieres"
      subjects={ce1Subjects}
      accent={CE1_ACCENT}
      description="Chaque matière est structurée en domaines, sous-domaines et séquences-compétences. Les supports pédagogiques s'y rattachent progressivement au fil de l'année scolaire."
    />
  );
}
