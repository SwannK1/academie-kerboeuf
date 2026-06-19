import type { Metadata } from "next";
import { HierarchyCard, HierarchyPage } from "@/app/personnages/_components/hierarchy";

export const metadata: Metadata = {
  title: "Programmation | Espace enseignants | Académie Kerboeuf",
  description:
    "Organisez la programmation annuelle de votre classe et la progression de chaque période.",
};

export default function TeacherProgrammingPortalPage() {
  return (
    <HierarchyPage
      eyebrow="Espace enseignants"
      title="Programmation"
      description="Deux outils complémentaires pour organiser l'année : la programmation annuelle répartit les compétences sur l'année, la progression de période les ordonne semaine après semaine."
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Enseignants", href: "/enseignants" },
        { label: "Programmation" },
      ]}
    >
      <HierarchyCard
        title="Programmation annuelle"
        description="Répartissez les compétences du programme sur les périodes de l'année scolaire, matière par matière."
        href="/enseignants/programmation/annuelle"
        accent="jade"
      />

      <HierarchyCard
        title="Progression de période"
        description="Ordonnez les séquences d'une période en respectant la logique : une séquence pour une compétence."
        href="/enseignants/programmation/periode"
        accent="sky"
      />
    </HierarchyPage>
  );
}
